import type { StepId } from '../types/steps';

export type FormPhase = 'contact' | 'business' | 'project' | 'close';

export function getStepPhase(stepId: StepId): FormPhase {
  switch (stepId) {
    case 'contact':
      return 'contact';
    case 'business':
      return 'business';
    case 'needs':
    case 'assets':
    case 'design':
    case 'technical':
      return 'project';
    case 'timeline-budget':
    case 'extras':
    case 'review':
      return 'close';
  }
}
