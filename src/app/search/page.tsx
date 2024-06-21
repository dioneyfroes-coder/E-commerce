"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const term = searchParams?.get('term') || '';
    const priceFilter = searchParams?.get('priceFilter') || '';

    if (Array.isArray(products)) {
      let filtered = [...products];

      if (term) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      }

      if (priceFilter === 'lowToHigh') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (priceFilter === 'highToLow') {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    } else {
      console.error('Unexpected data format:', products);
    }
  }, [searchParams, products]);

  return (
    <div>
      <h1>Resultados da Pesquisa</h1>
      <div>
        {filteredProducts.length === 0 ? (
          <p>Nenhum produto encontrado</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
