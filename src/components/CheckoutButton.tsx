// src/components/CheckoutButton.tsx
import React from 'react';
import { useCartStore } from '../store';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton: React.FC = () => {
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart,
        }),
      });

      if (!response.ok) {
        console.error('Erro na resposta da API:', response.statusText);
        return;
      }

      const session = await response.json();

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Erro ao processar o checkout:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Finalizar Compra
    </button>
  );
};

export default CheckoutButton;
