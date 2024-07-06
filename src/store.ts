// src/store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, Product } from './types';
import { CartAction, addToCart, removeFromCart, incrementItem, decrementItem } from './actions';

const initialState: CartState = {
  cart: [],
  addToCart: function (product: Product): void {
    throw new Error('Function not implemented.');
  },
  removeFromCart: function (productId: string): void {
    throw new Error('Function not implemented.');
  },
  incrementItem: function (productId: string): void {
    throw new Error('Function not implemented.');
  },
  decrementItem: function (productId: string): void {
    throw new Error('Function not implemented.');
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter(item => item._id !== action.payload._id) };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        ),
      };
    case 'LOAD_CART':
      return { ...state, cart: action.payload.cart };
    default:
      return state;
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action: CartAction) => set(state => cartReducer(state, action)),
      addToCart: (product: Product) => set(state => cartReducer(state, addToCart(product))),
      removeFromCart: (_id: string) => set(state => cartReducer(state, removeFromCart(_id))),
      incrementItem: (_id: string) => set(state => cartReducer(state, incrementItem(_id))),
      decrementItem: (_id: string) => set(state => cartReducer(state, decrementItem(_id))),
    }),
    { name: 'cart-storage' }
  )
);
