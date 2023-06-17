import { TypeOf, boolean, number, object, string } from 'zod';

const payload = {
  body: object({
    productId: string(),
    title: string({ required_error: 'Product title should not be blank.' }),
    description: string(),
    price: string({ required_error: 'Product price should not be blank.' }),
    image: string({ required_error: 'Product image should not be blank.' }),
    address: string({ required_error: 'Product address should not be blank.' }),
    area: number(),
    adType: string(),
    isNewProduct: boolean(),
  }),
};

export const paramas = {
  params: object({
    productId: string({
      required_error: 'Product id has to required.',
    }),
  }),
};

export const createProductSchema = object({ ...payload });
export const updateProductSchema = object({ ...payload, ...paramas });
export const deleteProductSchema = object({ ...paramas });
export const getProductSchema = object({ ...paramas });

export type CreateProductInputType = TypeOf<typeof createProductSchema>;
export type ReadProductInputType = TypeOf<typeof getProductSchema>;
export type UpdateProductInputType = TypeOf<typeof updateProductSchema>;
export type DeleteProductInputType = TypeOf<typeof deleteProductSchema>;
