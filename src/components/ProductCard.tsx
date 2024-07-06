// src/components/ProductCard.tsx

import React from 'react';
import Link from 'next/link';
import { ProductType } from '../types';
import { formatCurrencyString } from 'use-shopping-cart';
import { useCartStore } from '../store';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description || "",
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
      <Link href={`/product/${product._id}`} legacyBehavior>
        <a className="block">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-4 line-clamp-2">{product.description}</p>
          <p className="text-gray-900 font-bold mb-4">
            {formatCurrencyString({
              value: product.price,
              currency: 'BRL',
              language: 'pt-BR',
            })}
          </p>
        </a>
      </Link>
      <button onClick={handleAddToCart} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
