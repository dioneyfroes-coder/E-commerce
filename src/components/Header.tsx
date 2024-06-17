// src/components/Header.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">E-commerce Platform</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/cart">Carrinho ({itemCount})</Link>
      </nav>
    </header>
  );
};

export default Header;
