import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils//http.exception';
import logger from '../utils/customLogger';

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<HttpException> => {
  // Bad JSON request body
  if (error.type === 'entity.parse.failed') {
    return res.status(400).send({
      status: 'error',
      message: 'Bad JSON request body',
    });
  }

  // Zod validator errors
  if (error.name === 'ZodError') {
    const key = error.errors[0]?.path[0];
    const expects = error.errors[0]?.expected;
    const receive = error.errors[0]?.received;

    if (error.errors[0]?.code === 'invalid_type') {
      return res.status(400).send({
        status: 'error',
        statusCode: 400,
        message: `${key} should be a ${expects} not ${receive}`,
      });
    }
    return res.status(400).send({
      status: 'error',
      statusCode: 400,
      message: error.errors[0]?.message,
    });
  }

  // Mongoose duplicate key value
  if (error.code === 11000) {
    const keyVal = Object.keys(error.keyValue)[0];
    return res.status(400).send({
      status: 'error',
      statusCode: 400,
      message: `${keyVal} already exist`,
    });
  }

  // Mongoose bad ObjectID
  if (error.name === 'CastError') {
    return res.status(400).send({
      status: 'error',
      statusCode: 400,
      message: `Invalid resource ID`,
    });
  }

  // Log the errors we didn't handle
  logger.error(`[ErrorHandler]:${error.message}`);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  return res.status(statusCode).send({
    status: 'error',
    statusCode,
    message,
  });
};

// Handles request to routes that are not available on the server
export const unhandledRoutes = (
  req: Request,
  res: Response,
): Response<HttpException> => {
  return res.status(404).send({
    status: 'error',
    statusCode: 404,
    message: `${req.method} request to: ${req.originalUrl} not available on this server!`,
  });
};

export default errorMiddleware;
