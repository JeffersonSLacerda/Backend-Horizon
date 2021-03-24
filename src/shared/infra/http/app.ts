import express from 'express';
import cors from 'cors';

import createConnection from '../database';
import routes from './routes';

import '@shared/container';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
