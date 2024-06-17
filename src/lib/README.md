# MongoDB Connection Module

Este módulo lida com a conexão ao MongoDB para a aplicação.

## Funcionalidades

- Carregamento de variáveis de ambiente do arquivo `.env.local` usando `dotenv`.
- Verificação de que `MONGODB_URI` e `MONGODB_DB` estão definidas.
- Criação de uma única instância do `MongoClient` para evitar múltiplas conexões desnecessárias, especialmente no modo de desenvolvimento.
- Função `getDatabase` que retorna a instância do banco de dados conectada.

## Estrutura do Código

### Importações

- `MongoClient`, `Db` do `mongodb`
- `dotenv` para carregar as variáveis de ambiente

### Variáveis de Ambiente

As variáveis de ambiente são carregadas e verificadas:
- `MONGODB_URI`: URI de conexão ao MongoDB.
- `MONGODB_DB`: Nome do banco de dados a ser usado.

### Lógica de Conexão

- No modo de desenvolvimento (`process.env.NODE_ENV === 'development'`), uma variável global é usada para preservar a instância do `MongoClient` entre recarregamentos de módulo.
- No modo de produção, uma nova instância do `MongoClient` é criada diretamente.

### Função `getDatabase`

Exemplo de Uso

import { getDatabase } from './src/lib/mongodb';

async function example() {
  const db = await getDatabase();
  const collection = db.collection('example');
  const data = await collection.find({}).toArray();
  console.log(data);
}

example();


```typescript
async function getDatabase(): Promise<Db>

Para rodar os testes, execute:
npm test
