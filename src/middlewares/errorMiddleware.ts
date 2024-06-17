import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error(error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export { CustomError };
export default errorMiddleware;
