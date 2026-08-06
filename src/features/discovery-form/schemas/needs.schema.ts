import { z } from 'zod';
import { PROJECT_TYPES } from '../types/steps';
import type { ValidationMessages } from './messages';

export function createNeedsSchema(v: ValidationMessages) {
  return z.object({
    goals: z.string().trim().min(10, v.minLength.replace('{min}', '10')),
    projectType: z.enum(PROJECT_TYPES, { error: v.required }),
    expectedOutcome: z
      .string()
      .trim()
      .min(10, v.minLength.replace('{min}', '10')),
  });
}

export type NeedsSchema = ReturnType<typeof createNeedsSchema>;
export type NeedsInput = z.infer<NeedsSchema>;
