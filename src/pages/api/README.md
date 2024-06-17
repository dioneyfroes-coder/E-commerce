# API de Produtos

Este endpoint da API fornece acesso aos produtos armazenados no banco de dados MongoDB.

## Funcionalidades

- **GET**: Retorna todos os produtos da coleção 'products'.
- Tratamento de erros para garantir respostas apropriadas para diferentes cenários.

## Estrutura do Código

### Importações

- `NextApiRequest`, `NextApiResponse` do `next`
- `getDatabase` da biblioteca interna `mongodb`
- `errorMiddleware` do middleware interno de tratamento de erros

### Manipulador de API

O manipulador verifica o método da requisição, se for diferente de `GET`, retorna um erro `405 Method Not Allowed`. Caso contrário, conecta ao banco de dados e retorna todos os produtos na coleção `products`.

### Middleware

O middleware `errorMiddleware` captura erros durante a execução do manipulador e retorna uma resposta apropriada.

## Exemplo de Uso

### Requisição

```bash
GET /api/products
