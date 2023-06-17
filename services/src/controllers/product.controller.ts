import { Request, Response } from 'express';
import {
  CreateProductInputType,
  DeleteProductInputType,
  UpdateProductInputType,
} from '../schema/product.schema';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/product.service';
import { ReadProductInputType } from '../schema/product.schema';
import { getProduct } from '../services/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInputType['body']>,
  res: Response
) {
  const product = req.body;
  const userId = res.locals.user._id;
  if (!userId) {
    return res
      .status(403)
      .json({ ok: false, errorMessage: 'User is required.' });
  }

  try {
    const data = await createProduct({ ...product, user: userId });
    return res.status(201).json({ ok: true, data });
  } catch (err: any) {
    return res.status(406).json({ succes: false, errorMessage: err.message });
  }
}

export async function updateProductHandler(
  req: Request<
    UpdateProductInputType['params'],
    {},
    UpdateProductInputType['body']
  >,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const userId = res.locals.user._id;
    const product = req.body;

    if (!userId) throw new Error('Not allowed!');
    const data = await updateProduct({ user: userId, productId }, product, {
      new: true,
    });
    if (!data)
      throw new Error(
        "Could not find product or you don't have access for this operation."
      );
    return res.status(202).json({ ok: true, data });
  } catch (err: any) {
    return res.status(403).json({ ok: false, errorMessage: err.message });
  }
}

export async function getProductHandler(
  req: Request<ReadProductInputType['params']>,
  res: Response
) {
  const productId = req.params.productId;
  try {
    const data = await getProduct({ productId });
    if (data === null) throw new Error('Could not find product.');
    return res.status(200).json({ ok: true, data });
  } catch (err: any) {
    return res.status(404).json({ ok: false, errorMessage: err.message });
  }
}

export async function getProductsHandler(req: Request, res: Response) {
  try {
    const data = await getProducts();
    return res.status(200).json({ ok: true, data });
  } catch (err: any) {
    return res.status(404).json({ ok: false, errorMessage: err.message });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInputType['params']>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const userId = res.locals.user._id;
    const data = await deleteProduct({ productId, user: userId });
    console.log('data>>>', data);
    if (!data) {
      throw new Error(
        "Could not find product or you don't have access for this operation"
      );
    }
    return res.status(204).json({ ok: true, data });
  } catch (err: any) {
    return res.status(404).json({ ok: false, errorMessage: err.message });
  }
}
