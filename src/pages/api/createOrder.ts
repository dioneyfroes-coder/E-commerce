// src/pages/api/createOrder.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Order from '../../models/Order';
import User from '../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, cartItems, shippingDetails } = req.body;

    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: 'MongoDB URI is not defined' });
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI);

      const user = await User.findOne({ clerkId: userId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const order = new Order({
        user: user._id,
        cartItems,
        shippingDetails,
        status: 'open',
      });

      await order.save();

      res.status(201).json({ orderId: order._id });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    } finally {
      await mongoose.disconnect();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
