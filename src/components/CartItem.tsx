import React from 'react';
import { ProductType } from '../types';
import { formatCurrencyString } from 'use-shopping-cart';

interface CartItemProps {
  item: ProductType;
  decrementItem: (productId: string) => void;
  incrementItem: (productId: string) => void;
  removeFromCart: (productId: string) => void;
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

export default CartItem;
