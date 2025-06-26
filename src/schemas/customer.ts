import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'E-mail is required').email('Invalid e-mail'),
  birth: z.string().min(1, 'Birth date is required'),
});

export type CustomerFormData = z.infer<typeof customerSchema>; 