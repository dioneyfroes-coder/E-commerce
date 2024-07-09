// src/app/checkout/page.tsx
"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useCartStore } from '../../store';
import FreightCalculator from '../../components/FreightCalculator';
import CepLookup from '../../components/CepLookup';
import { CepData } from '../../types';
import { formatCurrencyString } from 'use-shopping-cart';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutButton from '../../components/CheckoutButton';
import { validateRG, validateCPF } from '../../utils/validate';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutPage: React.FC = () => {
  const { user } = useUser();
  const { cart } = useCartStore();
  const [freightCost, setFreightCost] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [address, setAddress] = useState<CepData | null>(null);
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [errors, setErrors] = useState({ rg: '', cpf: '' });

  const handleFreightCalculate = (cost: number, time: number) => {
    setFreightCost(cost);
    setDeliveryTime(time);
  };

  const handleAddressFound = (address: CepData) => {
    setAddress(address);
  };

  const handleRgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRg(e.target.value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = { rg: '', cpf: '' };

    if (!validateRG(rg)) {
      newErrors.rg = 'RG inválido. Formato esperado: x.xxx.xxx ou xx.xxx.xxx-x';
      valid = false;
    }

    if (!validateCPF(cpf)) {
      newErrors.cpf = 'CPF inválido.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCheckout = async () => {
    if (!validateInputs()) {
      return;
    }

    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: cart,
        user: {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          rg,
          cpf,
          address,
        },
        freightCost,
      }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0) + freightCost;

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
      <p>Nome: {user.fullName}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>

      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
      <label>
        RG:
        <input type="text" value={rg} onChange={handleRgChange} />
        {errors.rg && <p className="text-red-500">{errors.rg}</p>}
      </label>
      <label>
        CPF:
        <input type="text" value={cpf} onChange={handleCpfChange} />
        {errors.cpf && <p className="text-red-500">{errors.cpf}</p>}
      </label>

      <h2 className="text-xl font-semibold mb-4">Endereço</h2>
      <CepLookup onAddressFound={handleAddressFound} />
      {address && (
        <div>
          <p>CEP: {address.cep}</p>
          <p>Logradouro: {address.logradouro}</p>
          <p>Complemento: {address.complemento}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Localidade: {address.localidade}</p>
          <p>UF: {address.uf}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Carrinho</h2>
      {cart.map((item) => (
        <div key={item._id} className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">
                {formatCurrencyString({ value: item.price, currency: 'BRL', language: 'pt-BR' })}
              </p>
            </div>
          </div>
          <span className="px-4">{item.quantity}</span>
        </div>
      ))}

      <FreightCalculator onCalculate={handleFreightCalculate} />

      <h2 className="text-xl font-bold mt-4">
        Total: {formatCurrencyString({ value: totalPrice, currency: 'BRL', language: 'pt-BR' })}
      </h2>
      <button onClick={handleCheckout} className="btn btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded">Finalizar Compra</button>
    </div>
  );
};

export default CheckoutPage;
