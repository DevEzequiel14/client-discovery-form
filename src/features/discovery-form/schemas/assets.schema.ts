import { z } from 'zod';
import { ASSET_READINESS } from '../types/steps';
import type { ValidationMessages } from './messages';

const readiness = (v: ValidationMessages) =>
  z.enum(ASSET_READINESS, { error: v.required });

export function createAssetsSchema(v: ValidationMessages) {
  return z.object({
    logo: readiness(v),
    photos: readiness(v),
    texts: readiness(v),
    visualIdentity: readiness(v),
    brandManual: readiness(v),
    needsContentHelp: z.enum(['yes', 'no'], { error: v.required }),
  });
}

export type AssetsSchema = ReturnType<typeof createAssetsSchema>;
export type AssetsInput = z.infer<AssetsSchema>;
