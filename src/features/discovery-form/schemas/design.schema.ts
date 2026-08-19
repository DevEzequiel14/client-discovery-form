import { z } from 'zod';
import { DESIGN_STYLES, HAS_REFERENCES_OPTIONS } from '../types/steps';
import type { ValidationMessages } from './messages';

function hasValidReferenceToken(value: string): boolean {
  return value
    .split(/\n|,/)
    .map((part) => part.trim())
    .filter(Boolean)
    .some((part) => z.url().safeParse(part).success || part.includes('.'));
}

export function createDesignSchema(v: ValidationMessages) {
  return z
    .object({
      designStyle: z.enum(DESIGN_STYLES, { error: v.required }),
      designStyleNote: z
        .string()
        .trim()
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
      hasReferences: z.enum(HAS_REFERENCES_OPTIONS, { error: v.required }),
      referenceUrls: z
        .string()
        .trim()
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
      // Optional: omitted from payload when the user leaves it blank.
      designTaste: z
        .string()
        .trim()
        .refine((val) => val === '' || val.length >= 10, {
          message: v.minLength.replace('{min}', '10'),
        })
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.hasReferences !== 'yes') return;

      if (!data.referenceUrls) {
        ctx.addIssue({
          code: 'custom',
          path: ['referenceUrls'],
          message: v.required,
        });
        return;
      }

      if (!hasValidReferenceToken(data.referenceUrls)) {
        ctx.addIssue({
          code: 'custom',
          path: ['referenceUrls'],
          message: v.urlInvalid,
        });
      }
    });
}

export type DesignSchema = ReturnType<typeof createDesignSchema>;
export type DesignInput = z.infer<DesignSchema>;
