// src/pages/api/filter.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware, { CustomError } from '../../middlewares/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new CustomError('Method not allowed', 405);
  }

  const { category, priceFilter } = req.query;

  const db = await getDatabase();
  const collection = db.collection('products');

  const filters: any = {};

  if (category) {
    filters.category = category;
  }

  let sort: any = {};

  if (priceFilter === 'highest') {
    sort = { price: -1 };
  } else if (priceFilter === 'lowest') {
    sort = { price: 1 };
  }

  const products = await collection.find(filters).sort(sort).toArray();

  res.status(200).json(products);
};

export default errorMiddleware(handler);
