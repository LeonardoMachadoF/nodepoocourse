import "reflect-metadata"
import { AppDataSource } from './database';
import express from 'express';
import { routes } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import './shared/container'

AppDataSource.initialize().then(
    () => console.log('database connected')
)


const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))


app.use(routes);

app.listen(3333);