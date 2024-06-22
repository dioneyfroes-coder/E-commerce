// src/app/product/[id]/page.tsx
import React from 'react';
import ClientProductPage from '../../../components/ClientProductPage';

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  return <ClientProductPage productId={params.id} />;
};

export default ProductPage;
