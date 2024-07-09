// src/middleware/clearCart.ts
import { useCartStore } from '../store';

export const clearCart = () => {
  const { clearCart } = useCartStore.getState();
  clearCart();
};
