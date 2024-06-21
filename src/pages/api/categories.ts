// src/pages/api/categories.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware from '../../middlewares/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await getDatabase();
    const categories = await db.collection('products').distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export default errorMiddleware(handler);
