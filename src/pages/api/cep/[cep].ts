// pages/api/cep/[cep].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Address } from '../../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cep } = req.query;

  if (!cep || typeof cep !== 'string') {
    res.status(400).json({ error: 'CEP inválido' });
    return;
  }

  try {
    // Formatar o CEP removendo possíveis caracteres não numéricos
    const formattedCep = cep.replace(/\D/g, '');

    // Chamar a API externa (exemplo: ViaCEP)
    const response = await axios.get(`https://viacep.com.br/ws/${formattedCep}/json/`);

    if (response.data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
      return;
    }

    // Formatar a resposta para o nosso formato
    const address: Address = {
      cep: response.data.cep,
      street: response.data.logradouro,
      neighborhood: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
      complement: response.data.complemento,
    };

    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar endereço' });
  }
};
