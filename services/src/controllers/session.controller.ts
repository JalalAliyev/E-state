import { Request, Response } from 'express';

import { validatePassword } from '../services/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { signInJWT } from '../utils/jwt.utils';
import config from '../../config/default';
import SessionModel from '../models/session.model';
import { CreateSessionInputType } from '../schema/session.schema';

const accessTokenTtl = config['accessTokenTtl'];
const refreshTokenTtl = config['refreshTokenTtl'];

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateSessionInputType['body']>,
  res: Response
) {
  // Validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res
      .status(401)
      .json({ ok: false, errorMessage: 'Invalid email or password!' });
  }
  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create an access token
  const accessToken = await signInJWT(
    { ...user, session: session._id },
    { expiresIn: accessTokenTtl }
  );

  // create a refresh token

  const refreshToken = await signInJWT(
    { ...user, session: session._id },
    { expiresIn: refreshTokenTtl }
  );
  // return access and refresh token
  const data = { accessToken, refreshToken };
  return res.status(201).json({ ok: true, data });
}

export async function getUsersSessionHandler(req: Request, res: Response) {
  try {
    const valid = req.body.valid;
    const userId = res.locals.user._id;
    const sessions = await findSessions({ user: userId, valid });
    return res.status(200).json({ ok: true, data: sessions });
  } catch (err: any) {
    res.status(404).json({ ok: false, errorMessage: err.message });
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { valid: false });
    return res
      .status(202)
      .json({ ok: true, data: { accessToken: null, refreshToken: null } });
  } catch (err: any) {
    res.status(403).json({ ok: false, errorMessage: err.message });
  }
}
