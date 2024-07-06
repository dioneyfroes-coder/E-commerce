// src/app/page.tsx

import Home from '../components/Home';
import { ProductType } from '../types';
import { getStripeProducts } from '../lib/stripe';

export const revalidate = 60; // Tempo de revalidação em segundos

export default async function Page() {
  const products = await getStripeProducts();

  const productsFormatted: ProductType[] = products.map((product) => ({
    _id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: "",
    imageUrl: product.imageUrl,
    stock: 1,
  }));

  return <Home products={productsFormatted} />;
}
