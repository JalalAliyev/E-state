import mongoose from 'mongoose';

export async function setConnectMongoDB() {
  return await mongoose.connect(process.env.mongoUri!);
}
