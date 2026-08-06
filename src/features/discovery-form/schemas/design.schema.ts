import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createDesignSchema(v: ValidationMessages) {
  return z.object({
    designStyle: z.string().trim().min(2, v.required),
    references: z.string().trim().optional(),
  });
}

export type DesignSchema = ReturnType<typeof createDesignSchema>;
