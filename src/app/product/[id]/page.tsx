// src/app/product/[id]/page.tsx

import ClientProductPage from '../../../components/ClientProductPage';

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ClientProductPage productId={params.id} />;
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/products');
  const products = await res.json();

  return products.map((product: { _id: string }) => ({
    id: product._id,
  }));
}
