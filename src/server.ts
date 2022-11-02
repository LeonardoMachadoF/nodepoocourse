import 'dotenv/config';
import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from './errors/AppError';
import 'express-async-errors';
import './shared/container'
import { routes } from './routes';
import swaggerFile from './swagger.json';
import { AppDataSource } from './database';
import swaggerUI from 'swagger-ui-express';

AppDataSource.initialize().then(
    () => console.log('database connected')
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

app.listen(3333);