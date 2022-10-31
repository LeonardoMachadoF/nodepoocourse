import 'dotenv/config';
import "reflect-metadata"
import './shared/container'
import express from 'express';
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

app.listen(3333);