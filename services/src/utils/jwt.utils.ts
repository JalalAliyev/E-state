import jwt from 'jsonwebtoken';
import config from '../../config/default';

const privateKey = config['privateKey'];
const publicKey = config['publicKey'];

export async function signInJWT(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export async function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null,
    };
  }
}
