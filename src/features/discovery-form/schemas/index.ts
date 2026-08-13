import type { StepId } from '../types/steps';
import type { ValidationMessages } from './messages';
import { createAssetsSchema } from './assets.schema';
import { createBusinessSchema } from './business.schema';
import { createContactSchema } from './contact.schema';
import { createDesignSchema } from './design.schema';
import { createDiscoveryFormSchema } from './discovery-form.schema';
import { createNeedsSchema } from './needs.schema';
import { createTechnicalSchema } from './technical.schema';
import { createExtrasSchema } from './extras.schema';
import { createTimelineBudgetSchema } from './timeline-budget.schema';

export function createIdentitySchema(v: ValidationMessages) {
  return createContactSchema(v).and(createBusinessSchema(v));
}

export function createReadinessSchema(v: ValidationMessages) {
  return createAssetsSchema(v).and(createDesignSchema(v));
}

export function createApproachSchema(v: ValidationMessages) {
  return createTechnicalSchema(v).and(createTimelineBudgetSchema(v));
}

export function getStepSchema(stepId: StepId, v: ValidationMessages) {
  switch (stepId) {
    case 'identity':
      return createIdentitySchema(v);
    case 'needs':
      return createNeedsSchema(v);
    case 'readiness':
      return createReadinessSchema(v);
    case 'approach':
      return createApproachSchema(v);
    case 'close':
      return createExtrasSchema(v).and(createDiscoveryFormSchema(v));
  }
}

export function getFirstInvalidStep(
  data: unknown,
  v: ValidationMessages,
): Exclude<StepId, 'close'> | null {
  const checks: Array<[Exclude<StepId, 'close'>, ReturnType<typeof getStepSchema>]> =
    [
      ['identity', createIdentitySchema(v)],
      ['needs', createNeedsSchema(v)],
      ['readiness', createReadinessSchema(v)],
      ['approach', createApproachSchema(v)],
    ];

  for (const [stepId, schema] of checks) {
    if (!schema.safeParse(data).success) return stepId;
  }

  return null;
}

export {
  createAssetsSchema,
  createBusinessSchema,
  createContactSchema,
  createDesignSchema,
  createDiscoveryFormSchema,
  createExtrasSchema,
  createNeedsSchema,
  createTechnicalSchema,
  createTimelineBudgetSchema,
};
