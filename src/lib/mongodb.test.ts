// src/lib/mongodb.test.ts
import { MongoClient } from 'mongodb';
import { getDatabase } from './mongodb';

// Mock do MongoClient
jest.mock('mongodb', () => {
  const mMongoClient = {
    connect: jest.fn().mockResolvedValue({
      db: jest.fn().mockReturnValue({
        collection: jest.fn(),
      }),
    }),
  };
  return { MongoClient: jest.fn(() => mMongoClient) };
});

describe('MongoDB Connection Module', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Reseta os módulos para não compartilhar o estado entre os testes
    process.env = { ...OLD_ENV }; // Restaura as variáveis de ambiente originais
    process.env.MONGODB_URI = 'mongodb://test-uri';
    process.env.MONGODB_DB = 'test-db';
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restaura as variáveis de ambiente originais
  });

  it('should throw an error if MONGODB_URI or MONGODB_DB are not defined', () => {
    delete process.env.MONGODB_URI;
    delete process.env.MONGODB_DB;
    expect(() => require('./mongodb')).toThrow('Por favor, defina as variáveis de ambiente MONGODB_URI e MONGODB_DB no arquivo .env.local');
  });

  it('should return a database instance', async () => {
    const db = await getDatabase();
    expect(db).toBeDefined();
    expect(db.collection).toBeDefined();
  });
});