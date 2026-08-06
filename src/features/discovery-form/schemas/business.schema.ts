import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createBusinessSchema(v: ValidationMessages) {
  return z.object({
    company: z.string().trim().min(2, v.required),
    industry: z.string().trim().min(2, v.required),
    website: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || z.url().safeParse(value).success,
        v.urlInvalid,
      ),
  });
}

export type BusinessSchema = ReturnType<typeof createBusinessSchema>;
