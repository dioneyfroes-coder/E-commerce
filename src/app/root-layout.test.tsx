// src/app/root-layout.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from './layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

jest.mock('../components/Header', () => () => <div>Mocked Header</div>);
jest.mock('../components/Footer', () => () => <div>Mocked Footer</div>);

describe('RootLayout', () => {
  it('renders the Header, Footer, and children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(getByText('Mocked Header')).toBeInTheDocument();
    expect(getByText('Mocked Footer')).toBeInTheDocument();
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});
