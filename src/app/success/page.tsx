// src/app/success.tsx

import React from 'react';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Pagamento Bem-sucedido!</h1>
      <p className="text-lg mb-4">Obrigado pela sua compra. Seu pedido foi confirmado com sucesso.</p>
      <Link href="/" legacyBehavior>
        <a className="text-blue-600 hover:underline">Voltar para a Página Inicial</a>
      </Link>
    </div>
  );
};

export default SuccessPage;
