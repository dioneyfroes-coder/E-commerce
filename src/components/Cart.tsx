// src/components/Cart.tsx
import React from 'react';
import { useCart, useCartDispatch } from '../context/CartContext';

const Cart = () => {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, name: '', price: 0, quantity: 0 } });
  };

  const handleIncrease = (id: string) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: { id, name: '', price: 0, quantity: 0 } });
  };

  const handleDecrease = (id: string) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: { id, name: '', price: 0, quantity: 0 } });
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        items.map(item => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <button onClick={() => handleIncrease(item.id)}>+</button>
            <button onClick={() => handleDecrease(item.id)}>-</button>
            <button onClick={() => handleRemove(item.id)}>Remover</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
