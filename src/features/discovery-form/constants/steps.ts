import type { PartialDiscoveryForm } from '../types/form';
import type { StepId } from '../types/steps';
import { STEP_IDS } from '../types/steps';

export type StepDefinition = {
  id: StepId;
  /** When omitted or returns true, the step is part of the active flow */
  when?: (data: PartialDiscoveryForm) => boolean;
};

/**
 * Canonical step registry. Visibility rules live here so UI stays dumb.
 */
export const STEP_DEFINITIONS: StepDefinition[] = STEP_IDS.map((id) => ({
  id,
}));

export function getActiveSteps(data: PartialDiscoveryForm): StepId[] {
  return STEP_DEFINITIONS.filter((step) =>
    step.when ? step.when(data) : true,
  ).map((step) => step.id);
}
