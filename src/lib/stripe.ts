import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('A chave secreta do Stripe não foi definida');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export async function getStripeProducts() {
  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  const productsWithPrices = products.data.map((product) => {
    const price = prices.data.find((price) => price.product === product.id);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: price?.unit_amount || 0,
      currency: price?.currency || 'brl',
      imageUrl: product.images[0] || '',
    };
  });

  return productsWithPrices;
}

export async function getStripeProductById(productId: string) {
  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.retrieve(product.default_price as string);

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: price.unit_amount || 0,
    currency: price.currency || 'brl',
    imageUrl: product.images[0] || '',
  };
}
