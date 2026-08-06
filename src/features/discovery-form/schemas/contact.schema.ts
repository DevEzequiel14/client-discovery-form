import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createContactSchema(v: ValidationMessages) {
  return z.object({
    fullName: z.string().trim().min(2, v.required),
    email: z.email(v.emailInvalid),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || /^[+]?[\d\s()-]{7,20}$/.test(value),
        v.phoneInvalid,
      ),
  });
}

export type ContactSchema = ReturnType<typeof createContactSchema>;
