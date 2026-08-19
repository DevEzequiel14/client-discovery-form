import { z } from 'zod';
import { PROJECT_TYPES } from '../types/steps';
import type { ValidationMessages } from './messages';

export function createNeedsSchema(v: ValidationMessages) {
  return z.object({
    goals: z.string().trim().min(10, v.minLength.replace('{min}', '10')),
    projectType: z.enum(PROJECT_TYPES, { error: v.required }),
    // Optional: omitted from payload when the user leaves it blank.
    expectedOutcome: z
      .string()
      .trim()
      .refine((val) => val === '' || val.length >= 10, {
        message: v.minLength.replace('{min}', '10'),
      })
      .transform((value) => (value.length === 0 ? undefined : value))
      .optional(),
  });
}

export type NeedsSchema = ReturnType<typeof createNeedsSchema>;
export type NeedsInput = z.infer<NeedsSchema>;
