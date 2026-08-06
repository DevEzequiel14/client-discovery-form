import type { PartialDiscoveryForm } from '../types/form';
import type { StepId } from '../types/steps';

const STORAGE_KEY = 'discovery-form:v1';

export type PersistedDiscoveryForm = {
  version: 1;
  currentStepId: StepId;
  data: PartialDiscoveryForm;
  savedAt: string;
};

export function loadPersistedForm(): PersistedDiscoveryForm | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedDiscoveryForm;
    if (parsed.version !== 1) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function savePersistedForm(
  currentStepId: StepId,
  data: PartialDiscoveryForm,
): void {
  if (typeof window === 'undefined') return;

  const payload: PersistedDiscoveryForm = {
    version: 1,
    currentStepId,
    data,
    savedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearPersistedForm(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}
