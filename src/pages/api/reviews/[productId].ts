// src/pages/api/reviews/[productId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { productId } = req.query;

  if (method === 'GET') {
    try {
      const db = await getDatabase();
      const reviews = await db
        .collection('reviews')
        .find({ productId })
        .toArray();

      res.status(200).json(reviews);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
