// src/pages/api/orders/[orderId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId } = req.query;

  try {
    const { db } = await getDatabase();
    const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId as string) });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o pedido' });
  }
};
