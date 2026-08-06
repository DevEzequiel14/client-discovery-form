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

export function getStepSchema(stepId: StepId, v: ValidationMessages) {
  switch (stepId) {
    case 'contact':
      return createContactSchema(v);
    case 'business':
      return createBusinessSchema(v);
    case 'needs':
      return createNeedsSchema(v);
    case 'assets':
      return createAssetsSchema(v);
    case 'design':
      return createDesignSchema(v);
    case 'technical':
      return createTechnicalSchema(v);
    case 'timeline-budget':
      return createTimelineBudgetSchema(v);
    case 'extras':
      return createExtrasSchema(v);
    case 'review':
      return createDiscoveryFormSchema(v);
  }
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
