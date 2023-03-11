import { z } from 'zod';

export const userSchema = z.record(
    z.object({
      username: z.string().min(1, 'cannot be empty.'),
      email: z.string().email().min(1, 'cannot be empty.'),
      website: z.string(),
      address: z.string(),
      bankName: z.string(),
      bankAccount: z.string(),
      bankHolder: z.string(),
    }),
);
