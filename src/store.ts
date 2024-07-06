import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState } from './types';
import { cartReducer, CartAction } from './actions';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      dispatch: (action: CartAction) => set((state) => cartReducer(state, action)),
    }),
    {
      name: 'cart-storage',
    }
  )
);
