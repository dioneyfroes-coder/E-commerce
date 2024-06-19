'use client';

import Link from 'next/link';
import React from 'react';
import { useCart } from '../context/CartContext';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { data: session } = useSession();

  return (
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">E-commerce Platform</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/cart">Carrinho ({itemCount})</Link>
          {session ? (
            <>
              <button onClick={() => signOut()} className="ml-4">
                Logout
              </button>
              <span className="ml-4">Welcome, {session.user?.email}</span>
            </>
          ) : (
            <Link href="/auth/signin" className="ml-4">Login</Link>
          )}
        </nav>
      </header>
  );
};

export default Header;
