# Middleware de Tratamento de Erros

Este middleware captura e trata erros em APIs Next.js, retornando respostas apropriadas para diferentes tipos de erro.

## Funcionalidades

- Captura de erros durante a execução do manipulador de API.
- Tratamento de erros com respostas apropriadas baseadas no tipo de erro.

## Estrutura do Código

### Importações

- `NextApiRequest`, `NextApiResponse`, `NextApiHandler` do `next`

### Middleware

O middleware envolve o manipulador de API fornecido e captura qualquer erro que ocorra durante a execução. Ele então determina o tipo de erro e retorna a resposta apropriada.

### Uso

```typescript
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import errorMiddleware, { CustomError } from './middleware/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Lógica da API
  throw new CustomError('Recurso não encontrado', 404);
};

export default errorMiddleware(handler);

Exemplo de Uso
Definindo um Manipulador de API

import { NextApiRequest, NextApiResponse } from 'next';
import errorMiddleware from './middleware/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Lógica da API
  throw new Error('Erro genérico');
};

export default errorMiddleware(handler);

Tratamento de Erros Customizados
Você pode definir erros customizados para retornar códigos de status e mensagens específicas:

import { NextApiRequest, NextApiResponse } from 'next';
import errorMiddleware, { CustomError } from './middleware/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new CustomError('Recurso não encontrado', 404);
};

export default errorMiddleware(handler);


### Testes para `errorMiddleware.ts`

##Explicação dos Testes

Teste de Erros Genéricos: Verifica se o middleware captura erros genéricos e retorna um status 500 com a mensagem "Internal Server Error".
Teste de Erros Customizados: Verifica se o middleware captura erros customizados e retorna o status e mensagem definidos no erro.
Teste de Passagem Sem Erros: Verifica se o middleware permite a execução do manipulador de API sem erros e retorna a resposta correta.

Rodando os Testes
Para rodar os testes, execute:
npm test