// src/components/Home.tsx

'use client';

import React from 'react';
import { ProductType } from '../types';
import ProductCard from './ProductCard';

interface HomeProps {
  products: ProductType[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to our E-commerce Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
