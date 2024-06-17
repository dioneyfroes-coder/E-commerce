# `src/app/error/page.tsx`

## Descrição

Este arquivo define a página de erro no projeto de e-commerce. A página de erro exibe uma mensagem indicando que ocorreu um erro e solicita ao usuário que tente novamente mais tarde.

## Estrutura do Código

- O componente `ErrorPage` é um componente funcional React.
- Utiliza classes Tailwind CSS para estilização e centralização do conteúdo.

## Código

```tsx
import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl">Ocorreu um erro. Por favor, tente novamente mais tarde.</h1>
    </div>
  );
};

export default ErrorPage;

Como Funciona
Estilização: Utiliza classes Tailwind CSS para centralizar o conteúdo na tela e estilizar o texto.
flex items-center justify-center h-screen: Centraliza o conteúdo tanto vertical quanto horizontalmente.
text-3xl: Define o tamanho do texto.
Mensagem de Erro: Renderiza uma mensagem indicando que ocorreu um erro e solicita ao usuário que tente novamente mais tarde.
Teste
O arquivo page.test.tsx contém testes automatizados para este componente, garantindo que a mensagem de erro seja renderizada corretamente.

Como Executar os Testes
Certifique-se de que todas as dependências de desenvolvimento estão instaladas:
npm install
Execute os testes:
npm test

Dependências
React
Jest e React Testing Library para testes automatizados.