import { z } from 'zod';
import {
  HAS_WEBSITE_OPTIONS,
  INDUSTRIES,
} from '../constants/industries';
import type { ValidationMessages } from './messages';

export function createBusinessSchema(v: ValidationMessages) {
  return z
    .object({
      company: z.string().trim().min(2, v.required),
      industry: z.enum(INDUSTRIES, { error: v.required }),
      hasWebsite: z.enum(HAS_WEBSITE_OPTIONS, { error: v.required }),
      website: z
        .string()
        .trim()
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.hasWebsite !== 'yes') return;

      if (!data.website) {
        ctx.addIssue({
          code: 'custom',
          path: ['website'],
          message: v.required,
        });
        return;
      }

      if (!z.url().safeParse(data.website).success) {
        ctx.addIssue({
          code: 'custom',
          path: ['website'],
          message: v.urlInvalid,
        });
      }
    });
}

export type BusinessSchema = ReturnType<typeof createBusinessSchema>;
export type BusinessInput = z.infer<BusinessSchema>;
