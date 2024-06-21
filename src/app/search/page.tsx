// src/app/search/page.tsx
"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

const fetchSearchResults = async (term: string | null, category: string | null, priceFilter: string | null) => {
  const query = new URLSearchParams();
  if (term) query.append('term', term);
  if (category) query.append('category', category);
  if (priceFilter) query.append('priceFilter', priceFilter);

  const res = await fetch(`/api/search?${query.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch search results');
  }
  return res.json();
};

const SearchResults = async () => {
  const searchParams = useSearchParams();
  const term = searchParams ? searchParams.get('term') : null;
  const category = searchParams ? searchParams.get('category') : null;
  const priceFilter = searchParams ? searchParams.get('priceFilter') : null;

  const products = await fetchSearchResults(term, category, priceFilter);

  return (
    <div>
      <h2>Search Results</h2>
      <div>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
