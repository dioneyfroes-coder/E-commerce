// src/components/Filter.tsx
"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProducts } from '../context/ProductsContext';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, setProducts } = useProducts();

  const handlePriceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priceFilter = e.target.value;
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set('priceFilter', priceFilter);

    // Update the URL with the new search parameters
    router.push(`/search?${currentParams.toString()}`);

    // Apply filter to the products in the current context
    let filtered = [...products];
    if (priceFilter === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  };

  return (
    <div>
      <select onChange={handlePriceFilter}>
        <option value="">Select Price</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
