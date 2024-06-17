# `src/app/not-found/page.tsx`

## Descrição

Este arquivo define a página de erro 404 (Página não encontrada) no projeto de e-commerce. A página exibe uma mensagem indicando que a página solicitada não foi encontrada.

## Estrutura do Código

- O componente `NotFoundPage` é um componente funcional React.
- Utiliza classes Tailwind CSS para estilização e centralização do conteúdo.

## Código

```tsx
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl">Página não encontrada (404).</h1>
    </div>
  );
};

export default NotFoundPage;

Como Funciona
Estilização: Utiliza classes Tailwind CSS para centralizar o conteúdo na tela e estilizar o texto.
flex items-center justify-center h-screen: Centraliza o conteúdo tanto vertical quanto horizontalmente.
text-3xl: Define o tamanho do texto.
Mensagem de Erro: Renderiza uma mensagem indicando que a página solicitada não foi encontrada.
Teste
O arquivo page.test.tsx contém testes automatizados para este componente, garantindo que a mensagem de erro 404 seja renderizada corretamente.

Como Executar os Testes
Certifique-se de que todas as dependências de desenvolvimento estão instaladas:
npm install
Execute os testes:
npm test

Dependências
React
Jest e React Testing Library para testes automatizados.