// src/context/CartContext.tsx
"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: Product[];
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'INCREASE_QUANTITY' | 'DECREASE_QUANTITY';
  payload: Product;
}

const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload.id) };
    case 'INCREASE_QUANTITY':
      return {
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

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
