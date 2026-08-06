import { flattenError, type ZodError } from 'zod';
import type { FieldErrors } from '../types/form';

export function zodErrorToFieldErrors(error: ZodError): FieldErrors {
  const flattened = flattenError(error);
  const result: FieldErrors = {};

  for (const [key, messages] of Object.entries(flattened.fieldErrors)) {
    const list = messages as string[] | undefined;
    if (list?.[0]) {
      result[key as keyof FieldErrors] = list[0];
    }
  }

  return result;
}
