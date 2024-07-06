// src/components/CartIcon.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../store';

const CartIcon: React.FC = () => {
  const { cart } = useCartStore();

  return (
    <Link href="/cart" legacyBehavior>
      <a className="relative flex items-center">
        <FaShoppingCart />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-1 text-xs">
            {cart.length}
          </span>
        )}
      </a>
    </Link>
  );
};

export default CartIcon;
