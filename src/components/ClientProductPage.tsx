'use client';

import React, { useEffect, useState } from 'react';
import { ProductType } from '../types';
import ProductReviews from './ProductReviews';
import FreightCalculator from './FreightCalculator';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';

const ClientProductPage = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data: ProductType = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
      <p>{product.description}</p>
      <p>
        {formatCurrencyString({
          value: product.price,
          currency: 'BRL',
          language: 'pt-BR',
        })}
      </p>
      <button onClick={() => addItem({
        id: product._id,
        name: product.name,
        price: product.price ,
        currency: 'BRL',
        imageUrl: product.imageUrl,
      })}>Adicionar ao Carrinho</button>
      <FreightCalculator pageType="product" />
      <ProductReviews productId={productId} />
    </div>
  );
};

export default ClientProductPage;
