import { z } from 'zod';
import { DESIGN_STYLES } from '../types/steps';
import type { ValidationMessages } from './messages';

export function createDesignSchema(v: ValidationMessages) {
  return z.object({
    designStyle: z.enum(DESIGN_STYLES, { error: v.required }),
    referenceUrls: z
      .string()
      .trim()
      .min(5, v.required)
      .refine(
        (value) =>
          value
            .split(/\n|,/)
            .map((part) => part.trim())
            .filter(Boolean)
            .some((part) => z.url().safeParse(part).success || part.includes('.')),
        v.urlInvalid,
      ),
    designTaste: z.string().trim().min(10, v.minLength.replace('{min}', '10')),
  });
}

export type DesignSchema = ReturnType<typeof createDesignSchema>;
export type DesignInput = z.infer<DesignSchema>;
