// src/components/AddressLookup.tsx

"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { AddressLookupData } from '../types';

interface AddressLookupProps {
  onAddressUpdate: (address: AddressLookupData) => void;
}

const AddressLookup: React.FC<AddressLookupProps> = ({ onAddressUpdate }) => {
  const [uf, setUf] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [logradouro, setLogradouro] = useState<string>('');
  const [cepData, setCepData] = useState<AddressLookupData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await axios.get<AddressLookupData[]>(
        `/api/address?uf=${uf}&cidade=${cidade}&logradouro=${logradouro}`
      );
      console.log('Received data:', response.data);
      if (response.data.length === 0) {
        setError('Nenhum endereço encontrado.');
        setCepData([]);
      } else {
        setCepData(response.data);
        onAddressUpdate(response.data[0]);
      }
    } catch (error) {
      console.error('Erro ao consultar o endereço:', error);
      setError('Erro ao consultar o endereço. Verifique os dados e tente novamente.');
      setCepData([]);
    }
  };

  return (
    <div>
      <h2>Consulta de Endereço</h2>
      <form onSubmit={handleSubmit}>
        <label>
          UF:
          <input
            type="text"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            placeholder="Ex: SP"
          />
        </label>
        <label>
          Cidade:
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Ex: Sao Paulo"
          />
        </label>
        <label>
          Logradouro:
          <input
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            placeholder="Ex: Avenida Paulista"
          />
        </label>
        <button type="submit">Consultar</button>
      </form>
      {error && <p>{error}</p>}
      {cepData.length > 0 && (
        <div>
          <h3>Resultados:</h3>
          <ul>
            {cepData.map((data, index) => (
              <li key={`${data.cep}-${index}`}>
                <p>CEP: {data.cep}</p>
                <p>Logradouro: {data.logradouro}</p>
                <p>Bairro: {data.bairro}</p>
                <p>Localidade: {data.localidade}</p>
                <p>UF: {data.uf}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddressLookup;
