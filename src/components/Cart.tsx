import React from 'react';
import { useCart, useCartDispatch } from '../context/CartContext';

const Cart = () => {
  const { items, totalQuantity } = useCart();
  const dispatch = useCartDispatch();

  console.log('Cart Component - Items:', items);
  console.log('Cart Component - Total Quantity:', totalQuantity);

  const handleRemove = (_id: string) => {
    console.log('Removing item with _id:', _id);
    dispatch({ type: 'REMOVE_ITEM', payload: { _id } });
  };

  const handleIncrease = (_id: string) => {
    console.log('Increasing quantity for item with _id:', _id);
    dispatch({ type: 'INCREASE_QUANTITY', payload: { _id } });
  };

  const handleDecrease = (_id: string) => {
    console.log('Decreasing quantity for item with _id:', _id);
    dispatch({ type: 'DECREASE_QUANTITY', payload: { _id } });
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {items.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <ul>
          {items.map(item => (
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
    </div>
  );
};

export default Cart;
