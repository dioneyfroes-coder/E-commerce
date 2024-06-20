// src/types.ts

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
}
