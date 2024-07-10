// src/app/cep/page.tsx
"use client";

import React, { useState } from 'react';
import CepLookup from '../../components/CepLookup';
import { CepData } from '../../types';

const CepPage: React.FC = () => {
  const [address, setAddress] = useState<CepData | null>(null);

  const handleAddressFound = (address: CepData) => {
    setAddress(address);
  };

  return (
    <div>
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
    </div>
  );
};

export default CepPage;
