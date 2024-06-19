// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/reset.css";
import "../styles/globals.css";
import { CartProvider } from '../context/CartContext';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppProviders from "../components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AppProviders>

      </body>
    </html>
  );
};
