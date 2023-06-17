import { Request, Response } from 'express';

import logger from '../utils/logger';
import { createUser, findUser } from '../services/user.service';
import { createUserInput } from '../schema/user.schema';
import { omit } from 'lodash';

export async function createUserHandler(
  req: Request<{}, {}, createUserInput['body']>,
  res: Response
) {
  try {
    const isUserExist = await findUser({ email: req.body.email });
    if (isUserExist !== null) {
      throw new Error('Email already exist!');
    }
    const user = await createUser(req.body);
    const data = {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
    return res.status(201).json({ ok: true, data });
  } catch (err: any) {
    logger.error(err);
    return res.status(409).json({ ok: false, errorMessage: err.message });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  try {
  } catch (err) {}
}
