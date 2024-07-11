'use client';

import React, { useEffect, useState } from 'react';
import { formatCurrencyString } from 'use-shopping-cart';
import { useCartStore } from '../store';

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
}

const ClientProductPage = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/stripe/products/${productId}`);
      const data = await response.json();
      setProduct({
        id: data.id,
        name: data.name,
        description: data.description,
        images: data.images,
        price: data.price,
        currency: data.currency.toUpperCase(),
      });
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img 
        src={product.images[0]} 
        alt={product.name} 
        className="w-500 h-500 object-cover mb-4 rounded-lg" 
        style={{ width: '500px', height: '500px' }}
      />
      <p>{product.description}</p>
      <p>
        {formatCurrencyString({
          value: product.price,
          currency: product.currency,
          language: 'pt-BR',
        })}
      </p>
      <button onClick={() => addToCart({
        _id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images[0],
        description: product.description || "",
        currency: product.currency,
      })} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ClientProductPage;
