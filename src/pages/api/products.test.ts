import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { createMocks } from 'node-mocks-http';
import handler from '../api/products';
import { getDatabase } from '../../lib/mongodb';
import errorMiddleware from '../../middlewares/errorMiddleware';

jest.mock('../lib/mongodb');
jest.mock('../middleware/errorMiddleware');

describe('Products API handler', () => {
  it('should return a list of products', async () => {
    const products = [
      { id: '1', name: 'Produto 1', price: 100, quantity: 10 },
      { id: '2', name: 'Produto 2', price: 200, quantity: 20 },
    ];

    (getDatabase as jest.Mock).mockResolvedValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue(products),
        }),
      }),
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(products);
  });

  it('should return 405 if method is not GET', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toBe('Method POST Not Allowed');
  });

  it('should return 500 if there is a database error', async () => {
    (getDatabase as jest.Mock).mockRejectedValue(new Error('Database Error'));

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Internal Server Error' });
  });
});