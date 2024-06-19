//src/components/Home.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../types/product';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to our E-commerce Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
            <Link href={`/product/${product.id}`} legacyBehavior>
              <a className="text-blue-500 hover:underline mt-2 block">View Product</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
