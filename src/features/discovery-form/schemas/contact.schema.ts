import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createContactSchema(v: ValidationMessages) {
  return z.object({
    fullName: z.string().trim().min(2, v.required),
    email: z
      .string()
      .trim()
      .min(1, v.required)
      .pipe(z.email(v.emailInvalid)),
    phone: z
      .string()
      .trim()
      .transform((value) => (value.length === 0 ? undefined : value))
      .refine(
        (value) => value === undefined || /^[+]?[\d\s()-]{7,20}$/.test(value),
        v.phoneInvalid,
      ),
  });
}

export type ContactSchema = ReturnType<typeof createContactSchema>;
export type ContactInput = z.infer<ContactSchema>;
