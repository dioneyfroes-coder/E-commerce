// components/ProductListPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products', {
        params: {
          search: searchTerm,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        },
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, [searchTerm, filters]);

  return (
    <div>
      <div>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
