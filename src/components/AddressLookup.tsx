import React, { useState } from 'react';
import axios from 'axios';
import { PartialAddress, Address } from '../types';

const AddressLookup: React.FC = () => {
  const [address, setAddress] = useState<PartialAddress>({
    logradouro: '',
    localidade: '',
    uf: '',
    bairro: '',
  });
  const [cep, setCep] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const { logradouro, bairro, localidade, uf } = address;
      const response = await axios.get<Address[]>(
        `/api/lookup-address?uf=${uf}&localidade=${localidade}&logradouro=${logradouro}${bairro ? `&bairro=${bairro}` : ''}`
      );

      if (response.data.length === 0 || response.data[0].erro) {
        setError('Endereço não encontrado');
        setCep(null);
      } else {
        setCep(response.data[0].cep);
      }
    } catch (error) {
      setError('Erro ao consultar endereço');
      setCep(null);
    }
  };

  return (
    <div>
      <h2>Consulta de Endereço</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Logradouro:
          <input
            type="text"
            name="logradouro"
            value={address.logradouro}
            onChange={handleChange}
            required
            placeholder="Ex: Avenida Paulista"
          />
        </label>
        <label>
          Bairro:
          <input
            type="text"
            name="bairro"
            value={address.bairro || ''}
            onChange={handleChange}
            placeholder="Ex: Bela Vista"
          />
        </label>
        <label>
          Localidade (Cidade):
          <input
            type="text"
            name="localidade"
            value={address.localidade}
            onChange={handleChange}
            required
            placeholder="Ex: São Paulo"
          />
        </label>
        <label>
          UF:
          <input
            type="text"
            name="uf"
            value={address.uf}
            onChange={handleChange}
            required
            placeholder="Ex: SP"
          />
        </label>
        <button type="submit">Consultar</button>
      </form>
      {error && <p>{error}</p>}
      {cep && <p>CEP: {cep}</p>}
    </div>
  );
};

export default AddressLookup;
