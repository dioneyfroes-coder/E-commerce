// src/app/error/page.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage from './page';

describe('ErrorPage', () => {
  it('renders the ErrorPage component', () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText('Ocorreu um erro. Por favor, tente novamente mais tarde.')).toBeInTheDocument();
  });
});
