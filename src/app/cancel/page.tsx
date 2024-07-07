// src/app/cancel.tsx

import React from 'react';
import Link from 'next/link';

const CancelPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Pagamento Cancelado</h1>
      <p className="text-lg mb-4">Você cancelou o pagamento. Se tiver alguma dúvida ou precisar de ajuda, entre em contato conosco.</p>
      <Link href="/" legacyBehavior>
        <a className="text-blue-600 hover:underline">Voltar para a Página Inicial</a>
      </Link>
    </div>
  );
};

export default CancelPage;
