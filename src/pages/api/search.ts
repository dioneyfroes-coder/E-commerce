import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware from '../../middlewares/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { term, category, priceFilter } = req.query;

  const db = await getDatabase();
  const collection = db.collection('products');

  const filters: any = {};

  if (term) {
    filters.name = { $regex: term, $options: 'i' };
  }

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
