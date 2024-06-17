# `src/app/cart/page.tsx`

## Descrição

Este arquivo define a página do carrinho no projeto de e-commerce. A página do carrinho exibe o componente `Cart`, que mostra os itens adicionados ao carrinho de compras.

## Estrutura do Código

- O componente `CartPage` é um componente funcional React.
- Utiliza o React com a diretiva `'use client'` para garantir que a renderização seja no cliente.
- Renderiza um cabeçalho com o título "Página do Carrinho".
- Inclui o componente `Cart`, que é responsável por mostrar os itens do carrinho.

## Código

```tsx
'use client';

import React from 'react';
import Cart from '../../components/Cart';

const CartPage = () => {
  return (
    <div>
      <h1>Página do Carrinho</h1>
      <Cart />
    </div>
  );
};

export default CartPage;

Como Funciona
Cabeçalho: O componente renderiza um h1 com o texto "Página do Carrinho".
Componente Cart: O componente Cart é renderizado abaixo do cabeçalho e é responsável por exibir os itens do carrinho.
Teste
O arquivo page.test.tsx contém testes automatizados para este componente, garantindo que o cabeçalho e o componente Cart sejam renderizados corretamente.

Como Executar os Testes
Certifique-se de que todas as dependências de desenvolvimento estão instaladas:
npm install
Execute os testes:
npm test

Dependências
React
Jest e React Testing Library para testes automatizados.
