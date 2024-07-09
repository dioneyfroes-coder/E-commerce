// src/actions.ts

import { CartState, Product } from "./types";

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { _id: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'CLEAR_CART' };  // New action type for clearing the cart

export const addToCart = (product: Product): CartAction => ({
  type: 'ADD_ITEM',
  payload: product,
});

export const removeFromCart = (_id: string): CartAction => ({
  type: 'REMOVE_ITEM',
  payload: { _id },
});

export const incrementItem = (_id: string): CartAction => ({
  type: 'INCREASE_QUANTITY',
  payload: { _id },
});

export const decrementItem = (_id: string): CartAction => ({
  type: 'DECREASE_QUANTITY',
  payload: { _id },
});

export const clearCart = (): CartAction => ({
  type: 'CLEAR_CART',
});
