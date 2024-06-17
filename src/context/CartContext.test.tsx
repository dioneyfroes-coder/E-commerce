// src/context/CartContext.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CartProvider, useCart, useCartDispatch } from './CartContext';

const TestComponent = () => {
  const cart = useCart();
  const dispatch = useCartDispatch();

  const addItem = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id: '1', name: 'Product 1', price: 100, quantity: 1 },
    });
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <div data-testid="cart-items-count">{cart.items.length}</div>
      {cart.items.map(item => (
        <div key={item.id} data-testid="cart-item">
          {item.name} - {item.quantity}
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  it('adds an item to the cart', () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('cart-items-count').textContent).toBe('0');

    fireEvent.click(getByText('Add Item'));

    expect(getByTestId('cart-items-count').textContent).toBe('1');
    expect(getByTestId('cart-item').textContent).toBe('Product 1 - 1');
  });

  // Add more tests as needed
});
