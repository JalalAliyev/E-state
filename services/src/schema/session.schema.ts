import { TypeOf, object, string } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({ required_error: 'Email is required.' }).email(
      'Email is not valid.'
    ),
    password: string({ required_error: 'Password is required.' }).min(
      8,
      'Password has to be min 8 characters.'
    ),
  }),
});

export type CreateSessionInputType = TypeOf<typeof createSessionSchema>;
