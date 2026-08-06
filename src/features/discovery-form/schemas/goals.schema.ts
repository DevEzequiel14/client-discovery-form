import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createGoalsSchema(v: ValidationMessages) {
  return z.object({
    goals: z.string().trim().min(10, v.minLength.replace('{min}', '10')),
    targetAudience: z.string().trim().min(2, v.required),
  });
}

export type GoalsSchema = ReturnType<typeof createGoalsSchema>;
