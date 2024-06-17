import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import errorMiddleware, { CustomError } from './errorMiddleware';

describe('errorMiddleware', () => {
  it('should handle generic errors and return 500 status code', async () => {
    const handler = jest.fn(async (req, res) => {
      throw new Error('Erro genérico');
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();

    await errorMiddleware(handler)(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Internal Server Error' });
  });

  it('should handle custom errors and return custom status code and message', async () => {
    const handler = jest.fn(async (req, res) => {
      throw new CustomError('Recurso não encontrado', 404);
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();

    await errorMiddleware(handler)(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({ message: 'Recurso não encontrado' });
  });

  it('should pass through without errors', async () => {
    const handler = jest.fn(async (req, res) => {
      res.status(200).json({ message: 'Success' });
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>();

    await errorMiddleware(handler)(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'Success' });
  });
});