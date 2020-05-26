import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import uploadConfig from './config/upload';

import AppError from './errors/AppError';

import './database';
/**
 * importei o ts-node-dev
 * Ele faz o papel do tsc que converte typescript para javascript
 * E também o papel do nodemon, onde restarta o servidor quando há alteração
 * em arquivos ts
 *
 * No package.json, adicinar a flag --transpileOnly
 * Para o ts-node-dev não checar as tipagens ou se o código está correto. Apenas converter
 * Pois a responsabilidade de checar vou deixar como vscode
 *
 * E também a flag --ignore-watch node_modules
 * Para ignorar os códigos da pasta node_modules
 */
const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
// adicionando o middleware para rotas
app.use(routes);

// global error handler
app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  // é um erro da minha aplicação. Um erro que eu conheço
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333');
});
