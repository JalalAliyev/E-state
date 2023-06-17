import { Express } from 'express';
import productRouter from './product.router';
import userRouter from './user.router';

function router(app: Express) {
  app.use('/api/products', productRouter);
  app.use('/api/users', userRouter);
}

export default router;
