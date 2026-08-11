import { z } from 'zod';
import {
  CORPORATE_EMAIL_STATUS,
  INFRA_STATUS,
  SITE_MAINTENANCE,
  infraIncludesDomain,
} from '../types/steps';
import type { ValidationMessages } from './messages';

export function createTechnicalSchema(v: ValidationMessages) {
  return z
    .object({
      infraStatus: z.enum(INFRA_STATUS, { error: v.required }),
      domainName: z
        .string()
        .trim()
        .transform((value) => (value.length === 0 ? undefined : value))
        .optional(),
      corporateEmailStatus: z.enum(CORPORATE_EMAIL_STATUS, {
        error: v.required,
      }),
      siteMaintenance: z.enum(SITE_MAINTENANCE, { error: v.required }),
    })
    .superRefine((data, ctx) => {
      if (!infraIncludesDomain(data.infraStatus)) return;
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
