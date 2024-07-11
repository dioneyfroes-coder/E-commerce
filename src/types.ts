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

export interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
}

export interface CepData extends Address {
  // Adicione quaisquer campos adicionais aqui, se necessário.
  // Caso contrário, esta interface é a mesma que Address.
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
  clearCart: () => void;
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