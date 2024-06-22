// src/pages/api/reviews/add.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const db = await getDatabase();
      const reviewsCollection = db.collection('reviews');
      const { productId, rating, comment, name, userId } = req.body;
      const newReview = { productId, rating, comment, name, userId, date: new Date() };

      const result = await reviewsCollection.insertOne(newReview);
      res.status(201).json({ ...newReview, id: result.insertedId });
    } catch (error) {
      console.error('Failed to add review:', error);
      res.status(500).json({ message: 'Failed to add review' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
