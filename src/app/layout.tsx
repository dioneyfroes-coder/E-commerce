// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/reset.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "use-shopping-cart";
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Criado por dioney froes januario",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  // Verifica se a chave do Stripe está definida
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  if (!stripePublicKey) {
    throw new Error('A chave pública do Stripe não está definida em NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
  }

  return (
    <CartProvider
      mode="payment"
      stripe={stripePublicKey}
      currency="BRL"
      cartMode="client-only"
      successUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/cancel`}
      shouldPersist
    >
      <ClerkProvider localization={ptBR}>
        <html lang="ptBR">
          <body className={inter.className}>
            <Layout>
              {children}
            </Layout>
          </body>
        </html>
      </ClerkProvider>
    </CartProvider>
  );
};
