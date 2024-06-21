"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { CartProvider } from '../context/CartContext';
import { ProductsProvider } from '../context/ProductsContext';
import Search from './Search';
import Filter from './Filter';
import Categories from './Categories';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <Header />
        <Search />
        <Filter />
        <Categories />
        <main>{children}</main>
        <Footer />
      </CartProvider>
    </ProductsProvider>
  );
};

export default Layout;
