// src/components/Layout.tsx

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Filter from './Filter';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <Search />
      <Filter />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
