'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser, SignOutButton, SignIn, SignUp, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

const Header: React.FC = () => {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { isSignedIn, user } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">E-commerce Platform</h1>
      <nav>
        <Link href="/">Home</Link>
        {isMounted && (
          <Link href="/cart">Carrinho ({itemCount})</Link>
        )}
        <Link href="/cep">Consulta de CEP</Link>
        <div className='flx itens-center gap-8'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal'>
            <button className='border roudend-md border-gray-400 px-3 py-2'>
              Fazer Login
            </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
