import { STEP_IDS, type StepId } from '../types/steps';

const LEGACY_STEP_MAP: Record<string, StepId> = {
  contact: 'identity',
  business: 'identity',
  identity: 'identity',
  needs: 'needs',
  assets: 'readiness',
  design: 'readiness',
  readiness: 'readiness',
  technical: 'approach',
  'timeline-budget': 'approach',
  urgency: 'approach',
  approach: 'approach',
  extras: 'close',
  review: 'close',
  close: 'close',
};

export function normalizeStepId(stepId: string | undefined): StepId {
  if (stepId && LEGACY_STEP_MAP[stepId]) {
    return LEGACY_STEP_MAP[stepId];
  }

  if (stepId && (STEP_IDS as readonly string[]).includes(stepId)) {
    return stepId as StepId;
  }

  return 'identity';
}
