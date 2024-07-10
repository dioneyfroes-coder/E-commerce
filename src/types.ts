export interface ProductType {
  _id: string;
  price: number;
  name: string;
  quantity?: number;
  imageUrl: string;
  description?: string;
  currency?: string;
  category?: string;
  stock?: number;
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

export interface ProductWithReviews extends ProductType {
  reviews: Review[];
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
  error?: boolean;
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
  complemento?: string;
  bairro?: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  weight: number;
  height: number;
  width: number;
  length: number;
}