import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import logger from '../utils/logger';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      return res
        .status(400)
        .json({ ok: false, errorMessage: err.errors[0].message });
    }
  };

export default validate;
