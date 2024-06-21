// pages/api/categories.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware from '../../middlewares/errorMiddleware';

const categoriesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const categories = await db.collection('products').distinct('category');

    res.status(200).json({ categories });
  } catch (error) {
    throw new CustomError('Failed to fetch categories', 500);
  }
};

export default errorMiddleware(categoriesHandler);
