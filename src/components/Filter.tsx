// src/components/Filter.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Filter = () => {
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const router = useRouter();

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    let query = `/search?category=${category}`;
    if (priceFilter) {
      query += `&priceFilter=${priceFilter}`;
    }
    router.push(query);
  };

  return (
    <form onSubmit={handleFilter}>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category..."
      />
      <select
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      >
        <option value="">Select Price Filter</option>
        <option value="highest">Maior Valor</option>
        <option value="lowest">Menor Valor</option>
      </select>
      <button type="submit">Filter</button>
    </form>
  );
};

export default Filter;
