// src/actions.ts

import { CartState, Product } from "./types";

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { _id: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'LOAD_CART'; payload: CartState };  // New action type for loading cart
