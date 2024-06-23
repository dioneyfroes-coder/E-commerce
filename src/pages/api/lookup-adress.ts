import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CepData, Address } from '../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uf, localidade, logradouro, bairro } = req.query;

  if (!uf || !localidade || !logradouro) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const formattedLocalidade = encodeURIComponent(localidade as string);
    const formattedLogradouro = encodeURIComponent(logradouro as string);
    const formattedBairro = bairro ? encodeURIComponent(bairro as string) : undefined;

    const url = `https://viacep.com.br/ws/${uf}/${formattedLocalidade}/${formattedLogradouro}/json/`;

    const response = await axios.get<CepData[]>(url);

    if (response.data.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const addressData = formattedBairro
      ? response.data.find(entry => entry.bairro === formattedBairro)
      : response.data[0];

    if (!addressData) {
      return res.status(404).json({ error: 'Address not found' });
    }

    return res.status(200).json(addressData);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
