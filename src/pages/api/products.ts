import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware from '../../middlewares/errorMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const db = await getDatabase();
    const products = await db.collection('products').find().toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default errorMiddleware(handler);
