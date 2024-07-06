// src/actions.ts

import { CartState, Product } from "./types";

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { _id: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'LOAD_CART'; payload: CartState };  // New action type for loading cart

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const exists = state.cart.find(cartItem => cartItem._id === action.payload._id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(cartItem =>
            cartItem._id === action.payload._id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
              : cartItem
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
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: (item.quantity || 1) > 1 ? (item.quantity || 1) - 1 : 1 }
            : item
        ),
      };

    case 'LOAD_CART':
      return { ...state, cart: action.payload.cart };

    default:
      return state;
  }
};
