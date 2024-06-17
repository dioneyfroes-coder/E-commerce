// src/app/cart/page.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import CartPage from './page';

describe('CartPage', () => {
  it('renders the CartPage component', () => {
    const { getByText } = render(<CartPage />);
    expect(getByText('Página do Carrinho')).toBeInTheDocument();
    // Verifica se o componente Cart está sendo renderizado
    expect(getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });
});
