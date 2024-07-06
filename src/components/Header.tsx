// src/app/Header.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import CartIcon from '../components/CartIcon';

const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">E-commerce Platform</h1>
        <nav className="flex gap-4 items-center">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <CartIcon />
          <Link href="/cep" className="hover:text-gray-300">Consulta de CEP</Link>
          <div className="flex items-center gap-8">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border rounded-md border-gray-400 px-3 py-2 hover:bg-gray-200 hover:text-gray-800">
                  Fazer Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
