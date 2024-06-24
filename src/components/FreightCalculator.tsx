// src/components/FreightCalculator.tsx

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { FreightData } from '../types';

const FreightCalculator: React.FC = () => {
  const cartContext = useContext(CartContext);
  const [cepDestino, setCepDestino] = useState<string>('');
  const [freightData, setFreightData] = useState<FreightData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateFreight = async () => {
    if (!cepDestino) {
      setError('Por favor, insira um CEP de destino');
      return;
    }

    if (!cartContext || cartContext.items.length === 0) {
      setError('O carrinho está vazio');
      return;
    }

    try {
      const response = await axios.post('/api/frete', {
        cepDestino,
        items: cartContext.items,
      });

      if (response.data) {
        setFreightData(response.data);
        setError(null);
      } else {
        setError('Não foi possível calcular o frete. Verifique os dados informados.');
        setFreightData(null);
      }
    } catch (error) {
      setError('Erro ao calcular o frete. Verifique sua conexão ou tente novamente mais tarde.');
      setFreightData(null);
    }
  };

  return (
    <div>
      <h2>Calculadora de Frete</h2>
      <input
        type="text"
        placeholder="Digite o CEP de destino"
        value={cepDestino}
        onChange={(e) => setCepDestino(e.target.value)}
      />
      <button onClick={calculateFreight}>Calcular Frete</button>
      {freightData && (
        <div>
          <p>Valor do Frete: {freightData.valor}</p>
          <p>Prazo de Entrega: {freightData.prazo} dias úteis</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FreightCalculator;
