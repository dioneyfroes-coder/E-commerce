// src/scripts/testConnection.ts
import { getDatabase } from '../lib/mongodb';

(async () => {
  try {
    const db = await getDatabase();
    console.log('Conectado ao banco de dados:', db.databaseName);
    process.exit(0);
  } catch (err) {
    console.error('Falha ao conectar ao banco de dados:', err);
    process.exit(1);
  }
})();
