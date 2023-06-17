import { Router } from 'express';
import deserializeUser from '../middleware/deserialize-user.middleware';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import validate from '../middleware/validate-recources.middleware';
import {
  getProductSchema,
  updateProductSchema,
} from '../schema/product.schema';

const productRouter = Router();

productRouter.get('/', (req, res) => {
  res.status(200).json({ data: 'iPhone 14 Pro Max' }).end();
});

productRouter.post('/', deserializeUser, createProductHandler);
productRouter.get('/list', getProductsHandler);
productRouter.get('/:productId', validate(getProductSchema), getProductHandler);
productRouter.put(
  '/:productId',
  deserializeUser,
  // validate(updateProductSchema),
  updateProductHandler
);
productRouter.delete('/:productId', deserializeUser, deleteProductHandler);

export default productRouter;
