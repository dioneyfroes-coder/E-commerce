import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CepData } from '../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cep } = req.query;

  if (!cep) {
    return res.status(400).json({ error: 'Missing CEP parameter' });
  }

  try {
    const response = await axios.get<CepData>(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP not found' });
    }

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
