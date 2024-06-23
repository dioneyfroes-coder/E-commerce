// src/types.ts

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
  imageUrl: string;
  stock: number;
}

export interface Review {
  id?: string;
  productId: string;
  userId?: string;
  rating: number;
  comment: string;
  name?: string;
  date: Date;
}

export interface ProductWithReviews extends Product {
  reviews: Review[];
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

export interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface PartialAddress {
  logradouro: string;
  bairro?: string;
  localidade: string;
  uf: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

