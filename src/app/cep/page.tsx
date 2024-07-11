// src/app/cep/page.tsx
"use client";

import React, { useState } from 'react';
import CepLookup from '../../components/CepLookup';
import { Address } from '../../types';

const CepPage: React.FC = () => {
  const [address, setAddress] = useState<Address | null>(null);

  const handleAddressFound = (address: Address) => {
    setAddress(address);
  };

  return (
    <div>
      <CepLookup onAddressFound={handleAddressFound} />
    </div>
  );
};

export default CepPage;
