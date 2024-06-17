// src/components/Home.tsx

"use client";

import React from 'react';
import { Product } from '../types/types';
import { useCartDispatch } from '../context/CartContext';

type HomeProps = {
  products: Product[];
};

const Home: React.FC<HomeProps> = ({ products }) => {
  const dispatch = useCartDispatch();

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } });
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">E-commerce</h1>
      </header>
      <main className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Produtos</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="mb-2">{product.description}</p>
              <p className="font-bold">${product.price}</p>
              <button
                className="mt-2 bg-blue-500 text-white p-2"
                onClick={() => addToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-4">
        <p>&copy; 2023 E-commerce. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
