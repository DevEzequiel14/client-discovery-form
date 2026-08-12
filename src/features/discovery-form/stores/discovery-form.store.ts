import { atom, map } from 'nanostores';
import type {
  FieldErrors,
  FormStatus,
  PartialDiscoveryForm,
} from '../types/form';
import { STEP_IDS, type StepId } from '../types/steps';
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
  /** When set, finishing a step returns here instead of the next step. */
  returnAfterEdit: StepId | null;
  meta: {
    startedAt: string;
    lastSavedAt?: string;
    submissionId?: string;
  };
};

function normalizeStepId(stepId: string | undefined): StepId {
  if (stepId === 'urgency') return 'timeline-budget';
  if (stepId && (STEP_IDS as readonly string[]).includes(stepId)) {
    return stepId as StepId;
  }
  return 'contact';
}

/** SSR-safe empty state — never read localStorage here (hydration mismatch). */
function createEmptyState(): DiscoveryFormStoreValue {
  return {
    currentStepId: 'contact',
    data: {},
    errors: {},
    status: 'idle',
    submitError: null,
    returnAfterEdit: null,
    meta: {
      startedAt: '',
    },
  };
}

export const $discoveryForm = map<DiscoveryFormStoreValue>(createEmptyState());

/** Locale for validation messages inside the island */
export const $formLocale = atom<'es' | 'en'>('es');

let didHydrateFromStorage = false;

/** Restore draft from localStorage after mount (client only). */
export function hydrateDiscoveryFormFromStorage(): void {
  if (didHydrateFromStorage) return;
  didHydrateFromStorage = true;

  const persisted = loadPersistedForm();

  if (!persisted) {
    $discoveryForm.setKey('meta', {
      ...$discoveryForm.get().meta,
      startedAt: new Date().toISOString(),
    });
    return;
  }

  $discoveryForm.set({
    currentStepId: normalizeStepId(persisted.currentStepId),
    data: persisted.data ?? {},
    errors: {},
    status: 'idle',
    submitError: null,
    returnAfterEdit: null,
    meta: {
      startedAt: persisted.savedAt ?? new Date().toISOString(),
      lastSavedAt: persisted.savedAt,
    },
  });
}

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

export function editStepFromReview(stepId: StepId): void {
  $discoveryForm.setKey('returnAfterEdit', 'review');
  setCurrentStep(stepId);
}

/** Prefer this after validating a step so edits from review return there. */
export function completeStepAndGo(nextStepId: StepId): void {
  const current = $discoveryForm.get();
  if (current.returnAfterEdit) {
    const target = current.returnAfterEdit;
    $discoveryForm.setKey('returnAfterEdit', null);
    setCurrentStep(target);
    return;
  }
  setCurrentStep(nextStepId);
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
  didHydrateFromStorage = true;
  $discoveryForm.set({
    ...createEmptyState(),
    meta: { startedAt: new Date().toISOString() },
  });
}

function persist(stepId: StepId, data: PartialDiscoveryForm): void {
  savePersistedForm(stepId, data);
  const current = $discoveryForm.get();
  $discoveryForm.setKey('meta', {
    ...current.meta,
    lastSavedAt: new Date().toISOString(),
  });
}
