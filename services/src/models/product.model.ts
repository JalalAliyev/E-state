import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { UserDocument } from './user.model';

// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export interface ProductInterface extends Document {
  productId: string;
  user: UserDocument['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
  address: string;
  area: number;
  adType: string;
  isNewProduct: boolean;
}

export interface ProductDocument extends ProductInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${uuidv4()}`,
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: Number },
  adType: { type: String },
  isNewProduct: { type: Boolean },
});

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
