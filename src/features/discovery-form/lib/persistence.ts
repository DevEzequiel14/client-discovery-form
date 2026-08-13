import type { PartialDiscoveryForm } from '../types/form';
import type { StepId } from '../types/steps';

const STORAGE_KEY = 'discovery-form:v1';

export type PersistedDiscoveryForm = {
  version: 1 | 2;
  currentStepId: string;
  data: PartialDiscoveryForm;
  savedAt: string;
  leadId?: string;
};

export function loadPersistedForm(): PersistedDiscoveryForm | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as PersistedDiscoveryForm;
    if (parsed.version !== 1 && parsed.version !== 2) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function savePersistedForm(
  currentStepId: StepId,
  data: PartialDiscoveryForm,
  leadId?: string,
): void {
  if (typeof window === 'undefined') return;

  const payload: PersistedDiscoveryForm = {
    version: 2,
    currentStepId,
    data,
    savedAt: new Date().toISOString(),
    ...(leadId ? { leadId } : {}),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearPersistedForm(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function persistedFormHasContent(
  data: PartialDiscoveryForm | undefined,
): boolean {
  if (!data) return false;

  return Object.values(data).some((value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  });
}
