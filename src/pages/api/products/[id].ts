// src/pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDatabase();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await db.collection('products').findOne({ _id: new ObjectId(id as string) });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
