import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { focusIdForField } from '../lib/focus-field';
import { zodErrorToFieldErrors } from '../lib/field-errors';
import { $discoveryForm, setFieldErrors } from '../stores/discovery-form.store';
import type { FieldErrors } from '../types/form';

function pickFieldErrors<T extends string>(
  source: FieldErrors,
  fieldOrder: readonly T[],
): Partial<Record<T, string>> {
  const next: Partial<Record<T, string>> = {};
  for (const field of fieldOrder) {
    if (source[field as keyof FieldErrors]) {
      next[field] = source[field as keyof FieldErrors];
    }
  }
  return next;
}

export function useStepErrors<T extends string>(fieldOrder: readonly T[]) {
  const form = useStore($discoveryForm);
  const firstErrorRef = useRef<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<T, string>>>(() =>
    pickFieldErrors(form.errors, fieldOrder),
  );

  useEffect(() => {
    const next = pickFieldErrors(form.errors, fieldOrder);
    if (Object.keys(next).length === 0) return;
    setErrors(next);
    const first = fieldOrder.find((field) => next[field]);
    firstErrorRef.current = first ? focusIdForField(first) : null;
    // fieldOrder is a module-level constant per step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.errors]);

  useEffect(() => {
    if (!firstErrorRef.current) return;
    const field = document.getElementById(firstErrorRef.current);
    field?.focus();
    firstErrorRef.current = null;
  }, [errors]);

  function clearError(field: T) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function applyZodFailure(error: Parameters<typeof zodErrorToFieldErrors>[0]) {
    const fieldErrors = zodErrorToFieldErrors(error);
    const next = pickFieldErrors(fieldErrors, fieldOrder);
    const first = fieldOrder.find((field) => next[field]);
    firstErrorRef.current = first ? focusIdForField(first) : null;
    setErrors(next);
    setFieldErrors(fieldErrors);
    return next;
  }

  function clearAll() {
    setErrors({});
    setFieldErrors({});
  }

  return {
    errors,
    clearError,
    applyZodFailure,
    clearAll,
  };
}
