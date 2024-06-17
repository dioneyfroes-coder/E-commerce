# CartContext

O `CartContext` é um contexto React utilizado para gerenciar o estado do carrinho de compras em uma aplicação de e-commerce. Ele permite adicionar, remover e atualizar itens no carrinho de maneira global, facilitando a manipulação desses dados em diferentes componentes da aplicação.

## Estrutura

O código do `CartContext` está estruturado em três partes principais:

1. **Definição dos Tipos**:
   - Tipos para os itens do carrinho e ações disponíveis.
2. **Redutor do Carrinho (`cartReducer`)**:
   - Função redutora que define como o estado do carrinho deve mudar em resposta a diferentes ações.
3. **Provider e Hooks**:
   - Provider do contexto (`CartProvider`) e hooks customizados para acessar e manipular o estado do carrinho.

## Definição dos Tipos

```typescript
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

type CartState = {
  items: CartItem[];
};

type CartDispatch = (action: CartAction) => void;

CartItem: Representa um item no carrinho.
CartAction: Enumera as ações que podem ser realizadas no carrinho.
CartState: Representa o estado do carrinho.
CartDispatch: Tipo para a função de dispatch.

Redutor do Carrinho

ADD_ITEM: Adiciona um item ao carrinho.
REMOVE_ITEM: Remove um item do carrinho.
UPDATE_QUANTITY: Atualiza a quantidade de um item no carrinho.

Provider e Hooks

CartProvider: Componente que provê o estado do carrinho e a função de dispatch para seus descendentes.
useCartState: Hook customizado para acessar o estado do carrinho.
useCartDispatch: Hook customizado para despachar ações para o carrinho.

Como Usar

Para utilizar o CartContext em sua aplicação, siga os passos abaixo
Envolva seu componente raiz com CartProvider
Use os hooks useCartState e useCartDispatch em seus componentes

Conclusão
O CartContext facilita a gestão do estado do carrinho de compras em uma aplicação React, provendo um mecanismo centralizado para adicionar, remover e atualizar itens. Com o uso dos hooks customizados useCartState e useCartDispatch, é fácil acessar e manipular o estado do carrinho em diferentes componentes da aplicação.

