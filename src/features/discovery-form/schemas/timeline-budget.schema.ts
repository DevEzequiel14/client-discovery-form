import { z } from 'zod';
import { INVESTMENT_RANGES, TIMELINE_OPTIONS } from '../types/steps';
import type { ValidationMessages } from './messages';

export function createTimelineBudgetSchema(v: ValidationMessages) {
  return z.object({
    timeline: z.enum(TIMELINE_OPTIONS, { error: v.required }),
    investmentRange: z.enum(INVESTMENT_RANGES, { error: v.required }),
    additionalNotes: z
      .string()
      .trim()
      .transform((value) => (value.length === 0 ? undefined : value))
      .optional(),
  });
}

export type TimelineBudgetSchema = ReturnType<
  typeof createTimelineBudgetSchema
>;
export type TimelineBudgetInput = z.infer<TimelineBudgetSchema>;
