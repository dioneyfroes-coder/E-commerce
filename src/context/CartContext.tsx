"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Interfaces e Tipos
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { _id: string } }
  | { type: 'INCREASE_QUANTITY'; payload: { _id: string } }
  | { type: 'DECREASE_QUANTITY'; payload: { _id: string } };

// Estado inicial
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  console.log('Cart Reducer - Action:', action);
  console.log('Cart Reducer - State before:', state);

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
        );
        const updatedState = {
          ...state,
          items: updatedItems,
          totalQuantity: state.totalQuantity + 1,
        };
        console.log('Cart Reducer - State after ADD_ITEM (existing item):', updatedState);
        return updatedState;
      } else {
        const updatedState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalQuantity: state.totalQuantity + 1,
        };
        console.log('Cart Reducer - State after ADD_ITEM (new item):', updatedState);
        return updatedState;
      }
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item._id === action.payload._id);
      if (!itemToRemove) return state;

      const updatedState = {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id),
        totalQuantity: state.totalQuantity - itemToRemove.quantity,
      };
      console.log('Cart Reducer - State after REMOVE_ITEM:', updatedState);
      return updatedState;
    }
    case 'INCREASE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const updatedState = {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1,
      };
      console.log('Cart Reducer - State after INCREASE_QUANTITY:', updatedState);
      return updatedState;
    }
    case 'DECREASE_QUANTITY': {
      const updatedItems = state.items
        .map(item =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0);
      const updatedState = {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity - 1,
      };
      console.log('Cart Reducer - State after DECREASE_QUANTITY:', updatedState);
      return updatedState;
    }
    default: {
      console.log('Cart Reducer - State after default:', state);
      return state;
    }
  }
};

// Contextos
const CartContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | undefined>(undefined);

// Tipos de propriedades do CartProvider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCartDispatch = (): React.Dispatch<CartAction> => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
};
