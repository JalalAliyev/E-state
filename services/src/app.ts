require('dotenv').config();

import express from 'express';

import { setConnectMongoDB } from './utils/db-connect';
import logger from './utils/logger';
import router from './router';

const app = express();

app.use(express.json());

setConnectMongoDB()
  .then(() => {
    app.listen(process.env.port, () => {
      logger.info(`App is running at http://localhost:${process.env.port}`);
      router(app);
    });
  })
  .catch((err) => {
    logger.error('could not connect mongo!');
  });
