"use client";

import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';

const Categories = () => {
  const { filterByCategory, clearFilter } = useProducts();
  const [categories, setCategories] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    filterByCategory(category);
    setIsVisible(false);
  };

  const handleShowCategories = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleShowCategories}>Categorias</button>
      {isVisible && (
        <ul>
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
          <li onClick={clearFilter}>Todos os Produtos</li>
        </ul>
      )}
    </div>
  );
};

export default Categories;
