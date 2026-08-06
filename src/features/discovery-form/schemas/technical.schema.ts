import { z } from 'zod';
import {
  CORPORATE_EMAIL_STATUS,
  DOMAIN_STATUS,
  HOSTING_STATUS,
  SITE_ROLE,
} from '../types/steps';
import type { ValidationMessages } from './messages';

export function createTechnicalSchema(v: ValidationMessages) {
  return z
    .object({
      domainStatus: z.enum(DOMAIN_STATUS, { error: v.required }),
      domainName: z
        .string()
        .trim()
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
      hostingStatus: z.enum(HOSTING_STATUS, { error: v.required }),
      corporateEmailStatus: z.enum(CORPORATE_EMAIL_STATUS, {
        error: v.required,
      }),
      siteAdmin: z.enum(SITE_ROLE, { error: v.required }),
      siteUpdates: z.enum(SITE_ROLE, { error: v.required }),
    })
    .superRefine((data, ctx) => {
      if (data.domainStatus !== 'yes') return;
      if (!data.domainName) {
        ctx.addIssue({
          code: 'custom',
          path: ['domainName'],
          message: v.required,
        });
      }
    });
}

export type TechnicalSchema = ReturnType<typeof createTechnicalSchema>;
export type TechnicalInput = z.infer<TechnicalSchema>;
