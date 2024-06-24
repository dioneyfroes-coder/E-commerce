// src/components/CepLookup.tsx

"use client";

import React, { useState } from 'react';
import axios from 'axios';
import AddressLookup from './AddressLookup';
import { CepData } from '../types';

const CepLookup: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [address, setAddress] = useState<CepData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAddressLookup, setShowAddressLookup] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.get<CepData>(`/api/cep?cep=${cep}`);
      if (response.data.erro) {
        setError('CEP não encontrado');
        setAddress(null);
      } else {
        setAddress(response.data);
      }
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
      setError('Erro ao consultar CEP');
      setAddress(null);
    }
  };

  const toggleAddressLookup = () => {
    setShowAddressLookup(!showAddressLookup);
  };

  return (
    <div>
      <h2>Consulta de CEP</h2>
      <form onSubmit={handleSubmit}>
        <label>
          CEP:
          <input type="text" value={cep} onChange={handleChange} />
        </label>
        <button type="submit">Consultar</button>
      </form>
      <button onClick={toggleAddressLookup}>
        {showAddressLookup ? 'Fechar' : 'Não sei meu CEP'}
      </button>
      {error && <p>{error}</p>}
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
      {showAddressLookup && <AddressLookup />}
    </div>
  );
};

export default CepLookup;
