"use client";

import React, { useState } from 'react';
import { CepData } from '../types';

interface CepLookupProps {
  onAddressFound: (address: CepData) => void;
}

const CepLookup: React.FC<CepLookupProps> = ({ onAddressFound }) => {
  const [cep, setCep] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cep?cep=${cep}`);
      const data: CepData = await response.json();
      if (data.error) {
        setError('CEP não encontrado');
      } else {
        setError('');
        onAddressFound(data);
      }
    } catch (error) {
      setError('Erro ao consultar o CEP');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        CEP:
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          required
        />
      </label>
      <button type="submit">Consultar</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CepLookup;
