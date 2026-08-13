import { atom, map } from 'nanostores';
import type {
  FieldErrors,
  FormStatus,
  PartialDiscoveryForm,
} from '../types/form';
import type { StepId } from '../types/steps';
import { normalizeStepId } from '../lib/legacy-steps';
import {
  clearPersistedForm,
  loadPersistedForm,
  persistedFormHasContent,
  savePersistedForm,
} from '../lib/persistence';

const PERSIST_DEBOUNCE_MS = 400;

export type DiscoveryFormStoreValue = {
  currentStepId: StepId;
  data: PartialDiscoveryForm;
  errors: FieldErrors;
  status: FormStatus;
  submitError: string | null;
  /** When set, finishing a step returns here instead of the next step. */
  returnAfterEdit: StepId | null;
  showDraftBanner: boolean;
  meta: {
    startedAt: string;
    lastSavedAt?: string;
    submissionId?: string;
    leadId?: string;
  };
};

/** SSR-safe empty state — never read localStorage here (hydration mismatch). */
function createEmptyState(): DiscoveryFormStoreValue {
  return {
    currentStepId: 'identity',
    data: {},
    errors: {},
    status: 'idle',
    submitError: null,
    returnAfterEdit: null,
    showDraftBanner: false,
    meta: {
      startedAt: '',
    },
  };
}

export const $discoveryForm = map<DiscoveryFormStoreValue>(createEmptyState());

/** Locale for validation messages inside the island */
export const $formLocale = atom<'es' | 'en'>('es');

let didHydrateFromStorage = false;
let persistTimer: ReturnType<typeof setTimeout> | undefined;
let pendingPersist: { stepId: StepId; data: PartialDiscoveryForm } | null =
  null;
let beforeUnloadBound = false;

function bindBeforeUnload(): void {
  if (beforeUnloadBound || typeof window === 'undefined') return;
  beforeUnloadBound = true;
  window.addEventListener('beforeunload', () => {
    flushPersist();
  });
}

function flushPersist(): void {
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = undefined;
  }

  if (!pendingPersist) return;

  const { stepId, data } = pendingPersist;
  pendingPersist = null;
  const leadId = $discoveryForm.get().meta.leadId;
  savePersistedForm(stepId, data, leadId);
  const current = $discoveryForm.get();
  $discoveryForm.setKey('meta', {
    ...current.meta,
    lastSavedAt: new Date().toISOString(),
  });
}

function persist(
  stepId: StepId,
  data: PartialDiscoveryForm,
  immediate = false,
): void {
  bindBeforeUnload();
  pendingPersist = { stepId, data };

  if (immediate) {
    flushPersist();
    return;
  }

  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    flushPersist();
  }, PERSIST_DEBOUNCE_MS);
}

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
    showDraftBanner: persistedFormHasContent(persisted.data),
    meta: {
      startedAt: persisted.savedAt ?? new Date().toISOString(),
      lastSavedAt: persisted.savedAt,
      leadId: persisted.leadId,
    },
  });
}

export function patchFormData(patch: PartialDiscoveryForm): void {
  const current = $discoveryForm.get();
  const data = { ...current.data, ...patch };

  $discoveryForm.setKey('data', data);
  persist(current.currentStepId, data);
}

export function setCurrentStep(stepId: StepId): void {
  const current = $discoveryForm.get();
  $discoveryForm.setKey('currentStepId', stepId);
  persist(stepId, current.data, true);
}

export function editStepFromReview(stepId: StepId): void {
  $discoveryForm.setKey('returnAfterEdit', 'close');
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

export function dismissDraftBanner(): void {
  $discoveryForm.setKey('showDraftBanner', false);
}

export function ensureLeadId(): string {
  const current = $discoveryForm.get();
  if (current.meta.leadId) return current.meta.leadId;

  const leadId = crypto.randomUUID();
  $discoveryForm.setKey('meta', {
    ...current.meta,
    leadId,
  });
  persist(current.currentStepId, current.data, true);
  return leadId;
}

export function markSubmitted(submissionId: string): void {
  const current = $discoveryForm.get();
  $discoveryForm.setKey('status', 'success');
  $discoveryForm.setKey('meta', {
    ...current.meta,
    submissionId,
  });
  pendingPersist = null;
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = undefined;
  }
  clearPersistedForm();
}

export function resetDiscoveryForm(): void {
  pendingPersist = null;
  if (persistTimer) {
    clearTimeout(persistTimer);
    persistTimer = undefined;
  }
  clearPersistedForm();
  didHydrateFromStorage = true;
  $discoveryForm.set({
    ...createEmptyState(),
    meta: { startedAt: new Date().toISOString() },
  });
}
