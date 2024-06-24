// src/pages/api/cep.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CepData } from '../../types';

const fetchCepData = async (cep: string): Promise<CepData> => {
  const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cep } = req.query;

  if (!cep) {
    res.status(400).json({ error: 'CEP não fornecido' });
    return;
  }

  try {
    const data = await fetchCepData(cep as string);
    if (data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Erro ao consultar CEP:', error);
    res.status(500).json({ error: 'Erro ao consultar CEP' });
  }
}
