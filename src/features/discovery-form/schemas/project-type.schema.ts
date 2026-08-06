import { z } from 'zod';
import { PROJECT_TYPES } from '../types/steps';
import type { ValidationMessages } from './messages';

export function createProjectTypeSchema(v: ValidationMessages) {
  return z.object({
    projectType: z.enum(PROJECT_TYPES, { error: v.required }),
  });
}

export type ProjectTypeSchema = ReturnType<typeof createProjectTypeSchema>;
