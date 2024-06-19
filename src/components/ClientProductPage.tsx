// src/components/ClientProductPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartDispatch } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

interface ClientProductPageProps {
  productId: string;
}

const ClientProductPage = ({ productId }: ClientProductPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useCartDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`);
        setProduct(res.data);
        console.log('Fetched product:', res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const addToCart = () => {
    if (product) {
      console.log('Adding product to cart:', product);
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ClientProductPage;
