import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../services/session.service';

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );
  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    return res
      .status(401)
      .json({ ok: false, errorMessage: 'Access token should be sent.' });
  }

  const { decoded, expired } = await verifyJWT(accessToken);
  if (expired && refreshToken && typeof refreshToken === 'string') {
    const newAccessToken = await reIssueAccessToken(refreshToken);
    if (!newAccessToken) {
      return res.status(403).json({
        ok: false,
        errorMessage: 'Access and Refresh tokens are expired!',
      });
    }
    const result = verifyJWT(newAccessToken);
    res.setHeader('x-access-token', newAccessToken);
    res.locals.user = (await result).decoded;
    return next();
  } else if (expired && !refreshToken) {
    return res
      .status(403)
      .json({ ok: false, errorMessage: 'Token is expired.' });
  } else if (decoded) {
    res.locals.user = decoded;
    return next();
  } else {
    return res
      .status(404)
      .json({ ok: false, errorMessage: 'Could not find user.' });
  }
}

export default deserializeUser;
