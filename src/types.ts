// src/types.ts

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

export interface FilterQuery {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}