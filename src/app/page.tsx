// src/app/page.tsx

import { getDatabase } from '../lib/mongodb';
import Home from '../components/Home';
import { Product } from '../types/types';

export const revalidate = 60; // Tempo de revalidação em segundos

export default async function Page() {
  const db = await getDatabase();
  const products = await db.collection('products').find().toArray();
  
  const productsFormatted = products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
  }));

  return <Home products={productsFormatted} />;
};
