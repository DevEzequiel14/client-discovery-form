import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createTimelineBudgetSchema(v: ValidationMessages) {
  return z.object({
    timeline: z.string().trim().min(2, v.required),
    budget: z.string().trim().min(2, v.required),
    additionalNotes: z.string().trim().optional(),
  });
}

export type TimelineBudgetSchema = ReturnType<
  typeof createTimelineBudgetSchema
>;
