import { Response } from 'express';

export const handleError = (
  res: Response,
  error: Error,
  message: string,
  statusCode = 500,
) => {
  console.error(message, error);
  res.status(statusCode).json({ error: message });
};
