import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { signInJWT, verifyJWT } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';
import config from '../../config/default';

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return await SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = await verifyJWT(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;
  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessTokenTtl = config['accessTokenTtl'];
  const accessToken = await signInJWT(
    { ...user, session: session._id },
    { expiresIn: accessTokenTtl }
  );

  return accessToken;
}
