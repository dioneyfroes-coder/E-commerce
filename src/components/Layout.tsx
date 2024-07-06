"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ProductsProvider } from '../context/ProductsContext';
import Search from './Search';
import Filter from './Filter';
import Categories from './Categories';
import { OrderHistoryProvider } from '../context/OrderHistoryContext';
import { ReviewsContextProvider } from '../context/ReviewsContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProductsProvider>
        <OrderHistoryProvider>
        <ReviewsContextProvider>
          <Header />
          <Search />
          <Filter />
          <Categories />
          <main>{children}</main>
          <Footer />
          </ReviewsContextProvider>
        </OrderHistoryProvider>
    </ProductsProvider>
  );
};

export default Layout;
