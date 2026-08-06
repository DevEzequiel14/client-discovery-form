import { atom, map } from 'nanostores';
import type {
  FieldErrors,
  FormStatus,
  PartialDiscoveryForm,
} from '../types/form';
import type { StepId } from '../types/steps';
import {
  clearPersistedForm,
  loadPersistedForm,
  savePersistedForm,
} from '../lib/persistence';

export type DiscoveryFormStoreValue = {
  currentStepId: StepId;
  data: PartialDiscoveryForm;
  errors: FieldErrors;
  status: FormStatus;
  submitError: string | null;
  meta: {
    startedAt: string;
    lastSavedAt?: string;
    submissionId?: string;
  };
};

const initialState = (): DiscoveryFormStoreValue => {
  const persisted = loadPersistedForm();

  return {
    currentStepId: persisted?.currentStepId ?? 'contact',
    data: persisted?.data ?? {},
    errors: {},
    status: 'idle',
    submitError: null,
    meta: {
      startedAt: persisted?.savedAt ?? new Date().toISOString(),
      lastSavedAt: persisted?.savedAt,
    },
  };
};

export const $discoveryForm = map<DiscoveryFormStoreValue>(initialState());

/** Locale for validation messages inside the island */
export const $formLocale = atom<'es' | 'en'>('es');

export function patchFormData(patch: PartialDiscoveryForm): void {
  const current = $discoveryForm.get();
  const data = { ...current.data, ...patch };

  $discoveryForm.setKey('data', data);
  $discoveryForm.setKey('errors', {});
  persist(current.currentStepId, data);
}

export function setCurrentStep(stepId: StepId): void {
  const current = $discoveryForm.get();
  $discoveryForm.setKey('currentStepId', stepId);
  $discoveryForm.setKey('errors', {});
  persist(stepId, current.data);
}

export function setFieldErrors(errors: FieldErrors): void {
  $discoveryForm.setKey('errors', errors);
}

export function setFormStatus(status: FormStatus): void {
  $discoveryForm.setKey('status', status);
}

export function setSubmitError(message: string | null): void {
  $discoveryForm.setKey('submitError', message);
}

export function markSubmitted(submissionId: string): void {
  const current = $discoveryForm.get();
  $discoveryForm.setKey('status', 'success');
  $discoveryForm.setKey('meta', {
    ...current.meta,
    submissionId,
  });
  clearPersistedForm();
}

export function resetDiscoveryForm(): void {
  clearPersistedForm();
  $discoveryForm.set(initialState());
}

function persist(stepId: StepId, data: PartialDiscoveryForm): void {
  savePersistedForm(stepId, data);
  const current = $discoveryForm.get();
  $discoveryForm.setKey('meta', {
    ...current.meta,
    lastSavedAt: new Date().toISOString(),
  });
}
