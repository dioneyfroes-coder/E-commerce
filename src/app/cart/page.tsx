// src/components/CartPage.tsx
"use client";

import React from 'react';
import { useCartStore } from '../../store';
import { formatCurrencyString } from 'use-shopping-cart';
import { useAuth } from '@clerk/nextjs';
import { Product } from '../../types';
import FreightCalculator from '../../components/FreightCalculator';

interface CartItemProps {
  item: Product;
  decrementItem: (id: string) => void;
  incrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, decrementItem, incrementItem, removeFromCart }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center">
      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mr-4" />
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-600">
          {formatCurrencyString({ value: item.price, currency: 'BRL', language: 'pt-BR' })}
        </p>
      </div>
    </div>
    <div className="flex items-center">
      <button onClick={() => decrementItem(item._id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
      <span className="px-4">{item.quantity}</span>
      <button onClick={() => incrementItem(item._id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
      <button onClick={() => removeFromCart(item._id)} className="ml-4 px-2 py-1 bg-red-600 text-white rounded">Remover</button>
    </div>
  </div>
);

const CartPage: React.FC = () => {
  const { cart, removeFromCart, incrementItem, decrementItem } = useCartStore();
  const { isSignedIn } = useAuth();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems: cart }),
    });
    const data = await response.json();
    window.location.href = data.url;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            decrementItem={decrementItem}
            incrementItem={incrementItem}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <FreightCalculator />
      <h2 className="text-xl font-bold mt-4">
        Total: {formatCurrencyString({ value: totalPrice, currency: 'BRL', language: 'pt-BR' })}
      </h2>
      {isSignedIn ? (
        <button onClick={handleCheckout} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Finalizar Compra
        </button>
      ) : (
        <p className="mt-4">Faça login para finalizar a compra.</p>
      )}
    </div>
  );
};

export default CartPage;
