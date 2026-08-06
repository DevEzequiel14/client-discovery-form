import { z } from 'zod';
import type { ValidationMessages } from './messages';

export function createFeaturesSchema(v: ValidationMessages) {
  return z.object({
    features: z.string().trim().min(10, v.minLength.replace('{min}', '10')),
  });
}

export type FeaturesSchema = ReturnType<typeof createFeaturesSchema>;
