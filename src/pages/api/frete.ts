// src/pages/api/frete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { FreightData, CartItem } from '../../types';

const cepOrigem = process.env.CEP_ORIGEM;
const apiKey = process.env.CEPCERTO_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cepDestino, items }: { cepDestino: string; items: CartItem[] } = req.body;

  if (!cepDestino || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const freightPromises = items.map(item => {
      const url = `https://www.cepcerto.com/ws/json-frete/${cepOrigem}/${cepDestino}/${item.peso}/${item.altura}/${item.largura}/${item.comprimento}/${apiKey}`;
      return axios.get(url);
    });

    const freightResponses = await Promise.all(freightPromises);

    const freightDataArray: FreightData[] = freightResponses.map(response => {
      const data = response.data;
      if (data && data.valor && data.prazo && !data.erro) {
        return {
          valor: data.valor,
          prazo: data.prazo,
        };
      } else {
        throw new Error(data.mensagemErro || 'Erro desconhecido ao calcular frete');
      }
    });

    const totalFreightValue = freightDataArray.reduce((total, freight) => {
      if (freight && freight.valor) {
        return total + parseFloat(freight.valor.replace(',', '.'));
      }
      return total;
    }, 0);
    
    const maxDeliveryTime = Math.max(...freightDataArray.map(freight => {
      if (freight && freight.prazo) {
        return parseInt(freight.prazo, 10);
      }
      return 0;
    }));

    res.status(200).json({ valor: totalFreightValue.toFixed(2), prazo: maxDeliveryTime.toString() });
  } catch (error) {
    console.error('Error fetching freight data:', error instanceof Error ? error.message : String(error));
    res.status(500).json({ error: 'Failed to calculate freight' });
  }
};

export default handler;
