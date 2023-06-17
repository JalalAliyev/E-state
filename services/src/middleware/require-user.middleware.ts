import { NextFunction, Request, Response } from 'express';

async function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (!user) {
    return res
      .status(403)
      .json({ ok: false, errorMessage: 'User is required!' });
  }
  return next();
}

export default requireUser;
