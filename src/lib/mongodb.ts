// src/lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.local
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MONGODB_DB:', process.env.MONGODB_DB);

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Verifica se as variáveis de ambiente estão definidas
if (!uri || !dbName) {
  throw new Error('Por favor, defina as variáveis de ambiente MONGODB_URI e MONGODB_DB no arquivo .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // No modo de desenvolvimento, usamos uma variável global para preservar o MongoClient entre recarregamentos de módulo
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // No modo de produção, é melhor não usar uma variável global
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Função para obter a instância do banco de dados
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
