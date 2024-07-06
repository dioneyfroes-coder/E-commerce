// src/app/404.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Custom404: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página inicial após 5 segundos
    const timeout = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Página Não Encontrada</h1>
      <p className="mb-4">Desculpe, mas a página que você está procurando não existe, Estamos trabalhando nisso.</p>
      <Image
        src="/img/homen e mulheres trabalhando num canteiro de obras.jpg"
        width={500}
        height={500}
        alt="Ilustração de erro 404"
      />
      <Link href="/" legacyBehavior>
        <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
          Voltar para a Página Inicial
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
