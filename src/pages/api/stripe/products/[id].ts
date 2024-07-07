import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const product = await stripe.products.retrieve(id as string);
    const prices = await stripe.prices.list({ product: product.id });

    if (prices.data.length === 0) {
      return res.status(404).json({ error: 'Price not found for product' });
    }

    const price = prices.data[0];

    res.status(200).json({
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      price: price.unit_amount,
      currency: price.currency,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
