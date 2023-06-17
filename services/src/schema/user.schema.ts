import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required.',
    }),
    email: string({
      required_error: 'Email is required.',
    }).email('Email is not valid.'),
    password: string({
      required_error: 'Password is required.',
    }).min(8, 'Password has to be min 8 characters.'),
    passwordConfirmation: string({
      required_error: 'Password is required.',
    }).min(8, 'Confirm password has to be min 8 characters.'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords didn't match",
    path: ['passwordConfirmation'],
  }),
});

export type createUserInput = TypeOf<typeof createUserSchema>;
