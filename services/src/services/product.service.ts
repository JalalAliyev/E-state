import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ProductModel, {
  ProductDocument,
  ProductInterface,
} from '../models/product.model';

//create product
export async function createProduct(input: ProductInterface) {
  return await ProductModel.create(input);
}
//get product
export async function getProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return await ProductModel.findOne(query, {}, options);
}
//get products
export async function getProducts(
  query: FilterQuery<ProductDocument> = {},
  options: QueryOptions = { lean: true }
) {
  return await ProductModel.find(query, {}, options);
}
//find and update product
export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = {}
) {
  return await ProductModel.findOneAndUpdate(query, update, options);
}
//delete product
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return await ProductModel.findOneAndDelete(query);
}
