import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createExtrasSchema(_v: ValidationMessages) {
  return z.object({
    additionalNotes: z
      .string()
      .trim()
      .transform((value) => (value.length === 0 ? undefined : value))
      .optional(),
  });
}

export type ExtrasSchema = ReturnType<typeof createExtrasSchema>;
export type ExtrasInput = z.infer<ExtrasSchema>;
