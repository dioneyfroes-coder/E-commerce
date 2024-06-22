// src/context/OrderHistoryContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface Order {
  id: string;
  items: Product[];
  date: string;
}

interface OrderHistoryContextProps {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextProps | undefined>(undefined);

export const useOrderHistory = (): OrderHistoryContextProps => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error("useOrderHistory must be used within an OrderHistoryProvider");
  }
  return context;
};

export const OrderHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('orderHistory');
      return storedOrders ? JSON.parse(storedOrders) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
