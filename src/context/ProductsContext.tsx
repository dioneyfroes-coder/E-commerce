"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface ProductsContextProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  filterByCategory: (category: string) => void;
  clearFilter: () => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
          setAllProducts(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterByCategory = (category: string) => {
    if (allProducts.length > 0) {
      const filteredProducts = allProducts.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  };

  const clearFilter = () => {
    setProducts(allProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, filterByCategory, clearFilter }}>
      {children}
    </ProductsContext.Provider>
  );
};
