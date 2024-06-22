"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { CartState, CartItem } from '../types';
import { CartAction } from '../actions';

const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const loadCartFromCookies = (): CartState => {
  try {
    const storedCart = Cookies.get('cart');
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error("Failed to load cart from cookies", error);
    return initialState;
  }
};

const saveCartToCookies = (state: CartState) => {
  try {
    Cookies.set('cart', JSON.stringify(state), { expires: 7 }); // Expira em 7 dias
  } catch (error) {
    console.error("Failed to save cart to cookies", error);
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      let newItems = [...state.items];

      if (existingItemIndex !== -1) {
        const existingItem = newItems[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        newItems[existingItemIndex] = updatedItem;
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 };
        newItems.push(newItem);
      }

      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item._id !== action.payload._id);
      const removedItem = state.items.find(item => item._id === action.payload._id);
      const removedQuantity = removedItem ? removedItem.quantity : 0;

      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity - removedQuantity,
      };
    }
    case 'INCREASE_QUANTITY': {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      const newItems = [...state.items];
      const existingItem = newItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      newItems[existingItemIndex] = updatedItem;

      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case 'DECREASE_QUANTITY': {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      const newItems = [...state.items];
      const existingItem = newItems[existingItemIndex];

      if (existingItem.quantity === 1) {
        return state;
      }

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      newItems[existingItemIndex] = updatedItem;

      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity - 1,
      };
    }
    case 'LOAD_CART': {
      return action.payload;
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadedCart = loadCartFromCookies();
      dispatch({ type: 'LOAD_CART', payload: loadedCart });
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      saveCartToCookies(state);
    }
  }, [state, isMounted]);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};
