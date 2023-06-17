import { Router } from 'express';

import { createUserHandler } from '../controllers/user.controller';
import validate from '../middleware/validate-recources.middleware';
import { createUserSchema } from '../schema/user.schema';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUsersSessionHandler,
} from '../controllers/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import deserializeUser from '../middleware/deserialize-user.middleware';

const userRouter = Router();

userRouter.post('/register', validate(createUserSchema), createUserHandler);

userRouter.post(
  '/login',
  validate(createSessionSchema),
  createUserSessionHandler
);

userRouter.get('/sessions', deserializeUser, getUsersSessionHandler);
userRouter.delete('/session', deserializeUser, deleteSessionHandler);
userRouter.get('/', (req, res) => {
  res.status(200).json({ data: 'Jalal Aliyev' }).end();
});

export default userRouter;
