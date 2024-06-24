// src/pages/api/address.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AddressLookupData } from '../../types';

const fetchAddressData = async (uf: string, cidade: string, logradouro: string): Promise<AddressLookupData[]> => {
  const url = `https://www.cepcerto.com/ws/json-endereco/${uf}/${cidade.replace(/ /g, '-')}/${logradouro.replace(/ /g, '-')}`;
  console.log('Fetching URL:', url); // Adicionado para logar a URL sendo chamada
  const response = await axios.get<AddressLookupData[]>(url);
  console.log('API Response:', response.data); // Adicionado para logar a resposta da API
  return response.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uf, cidade, logradouro } = req.query;
  console.log('Received query:', req.query); // Adicionado para logar os parâmetros recebidos

  if (!uf || !cidade || !logradouro) {
    res.status(400).json({ error: 'UF, cidade ou logradouro não fornecido' });
    return;
  }

  try {
    const data = await fetchAddressData(uf as string, cidade as string, logradouro as string);
    if (data.length === 0) {
      res.status(404).json({ error: 'Nenhum endereço encontrado' });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Erro ao consultar endereço:', error);
    res.status(500).json({ error: 'Erro ao consultar endereço' });
  }
}
