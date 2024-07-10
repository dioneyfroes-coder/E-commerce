"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ReviewsContextProvider } from '../context/ReviewsContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ReviewsContextProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </ReviewsContextProvider>
  );
};

export default Layout;
