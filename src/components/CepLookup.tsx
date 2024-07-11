// src/components/CepLookup.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { Address } from '../types';

interface CepLookupProps {
  onAddressFound: (address: Address) => void;
}

const CepLookup: React.FC<CepLookupProps> = ({ onAddressFound }) => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [complement, setComplement] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const pathname = usePathname();

  const isCheckoutPage = pathname === '/checkout';

  useEffect(() => {
    if (address && !address.complement) {
      setComplement('');
    }
  }, [address]);

  const handleFetchAddress = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/cep/${cep}`);
      if (response.data.error) {
        setError(response.data.error);
        setAddress(null);
      } else {
        const fetchedAddress: Address = response.data;
        setAddress(fetchedAddress);
        if (isCheckoutPage && !fetchedAddress.complement) {
          setComplement('');
        } else {
          setComplement(fetchedAddress.complement || '');
        }
        onAddressFound(fetchedAddress);
      }
    } catch (err) {
      setError('Falha ao buscar endereço. Por favor, verifique o CEP.');
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const handleComplementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComplement(e.target.value);
  };

  const handleSubmit = () => {
    if (address) {
      onAddressFound({ ...address, complement });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={handleFetchAddress} disabled={loading} className="btn btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? 'Carregando...' : 'Buscar Endereço'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {address && (
        <div>
          <p>CEP: {address.cep}</p>
          <p>Rua: {address.street}</p>
          <p>Bairro: {address.neighborhood}</p>
          <p>Cidade: {address.city}</p>
          <p>Estado: {address.state}</p>
          {isCheckoutPage && (
            <div>
              <label>
                Complemento:
                <input
                  type="text"
                  value={complement}
                  onChange={handleComplementChange}
                  placeholder="Digite o complemento"
                />
              </label>
            </div>
          )}
        </div>
      )}
      {isCheckoutPage && address && (
        <button onClick={handleSubmit} className="btn btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Confirmar Endereço
        </button>
      )}
    </div>
  );
};

export default CepLookup;
