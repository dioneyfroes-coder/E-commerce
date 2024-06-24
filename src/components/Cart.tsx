// src/components/Cart.tsx

import React from 'react';
import { useCart, useCartDispatch } from '../context/CartContext';
import { CartItem } from '../types';
import FreightCalculator from './FreightCalculator';

const Cart = () => {
  const { items, totalQuantity } = useCart();
  const dispatch = useCartDispatch();

  const handleRemove = (_id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { _id } });
  };

  const handleIncrease = (_id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { _id } });
  };

  const handleDecrease = (_id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { _id } });
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>
          {items.map((item: CartItem) => (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantidade: {item.quantity}</p>
              <button onClick={() => handleIncrease(item._id)}>+</button>
              <button onClick={() => handleDecrease(item._id)}>-</button>
              <button onClick={() => handleRemove(item._id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3>Total de Itens no Carrinho: {totalQuantity}</h3>
      </div>
      <FreightCalculator pageType="cart"/>
    </div>
  );
};

export default Cart;
