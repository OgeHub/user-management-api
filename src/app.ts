import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routers/user.router';
import errorMiddleware, {
  unhandledRoutes,
} from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get('/', (req: Request, res: Response): Response => {
  return res.status(200).send({
    status: 'success',
    statusCode: 200,
    message: 'Welcome to User Management API',
  });
});
app.use('/users', userRoutes);
app.use(unhandledRoutes);
app.use(errorMiddleware);

export default app;
