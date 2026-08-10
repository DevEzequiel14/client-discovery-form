import { z } from 'zod';
import {
  BRAND_STYLE_STATUS,
  CONTENT_AMOUNT,
  LOGO_STATUS,
} from '../types/steps';
import type { ValidationMessages } from './messages';

export function createAssetsSchema(v: ValidationMessages) {
  return z.object({
    logo: z.enum(LOGO_STATUS, { error: v.required }),
    photos: z.enum(CONTENT_AMOUNT, { error: v.required }),
    texts: z.enum(CONTENT_AMOUNT, { error: v.required }),
    visualIdentity: z.enum(BRAND_STYLE_STATUS, { error: v.required }),
    needsContentHelp: z.enum(['yes', 'no'], { error: v.required }),
  });
}

export type AssetsSchema = ReturnType<typeof createAssetsSchema>;
export type AssetsInput = z.infer<AssetsSchema>;
