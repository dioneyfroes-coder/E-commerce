// src/context/ReviewsContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import { Review } from '../types';

interface ReviewsState {
  reviews: Review[];
  fetchReviews: (productId: string) => Promise<void>;
  addReview: (productId: string, review: Omit<Review, 'date' | 'id'>) => Promise<void>;
}

const initialState: ReviewsState = {
  reviews: [],
  fetchReviews: async () => {},
  addReview: async () => {}
};

const ReviewsContext = createContext<ReviewsState | undefined>(undefined);

const reviewsReducer = (state: ReviewsState, action: any) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return {
        ...state,
        reviews: action.payload,
      };
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    default:
      return state;
  }
};

export const ReviewsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  const fetchReviews = useCallback(async (productId: string) => {
    try {
      const response = await axios.get(`/api/reviews/${productId}`);
      dispatch({ type: 'SET_REVIEWS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  }, []);

  const addReview = useCallback(async (productId: string, review: Omit<Review, 'date' | 'id'>) => {
    try {
      const response = await axios.post('/api/reviews/add', review);
      dispatch({ type: 'ADD_REVIEW', payload: response.data });
    } catch (error) {
      console.error('Failed to add review', error);
    }
  }, []);

  return (
    <ReviewsContext.Provider value={{ ...state, fetchReviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};
