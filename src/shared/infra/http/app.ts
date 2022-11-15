import "reflect-metadata"
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import 'express-async-errors';
import '../../container'
import { routes } from './routes';
import swaggerFile from '../../../swagger.json';
import swaggerUI from 'swagger-ui-express';
import { AppDataSource } from '../typeorm';

AppDataSource.initialize().then(
    () => console.log('connected')
)

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app }