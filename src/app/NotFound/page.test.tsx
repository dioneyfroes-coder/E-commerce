// src/app/not-found/page.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from './page';

describe('NotFoundPage', () => {
  it('renders the NotFoundPage component', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText('Página não encontrada (404).')).toBeInTheDocument();
  });
});
