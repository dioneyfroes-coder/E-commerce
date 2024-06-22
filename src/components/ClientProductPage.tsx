// src/components/ClientProductPage.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useCartDispatch } from '../context/CartContext';
import { Product } from '../types';
import ProductReviews from './ProductReviews';

const ClientProductPage = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useCartDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data: Product = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
      <ProductReviews productId={productId} />
    </div>
  );
};

export default ClientProductPage;
