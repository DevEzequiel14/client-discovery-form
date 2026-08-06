import type { StepId } from '../types/steps';
import type { ValidationMessages } from './messages';
import { createBusinessSchema } from './business.schema';
import { createContactSchema } from './contact.schema';
import { createDesignSchema } from './design.schema';
import { createDiscoveryFormSchema } from './discovery-form.schema';
import { createFeaturesSchema } from './features.schema';
import { createNeedsSchema } from './needs.schema';
import { createTimelineBudgetSchema } from './timeline-budget.schema';

export function getStepSchema(stepId: StepId, v: ValidationMessages) {
  switch (stepId) {
    case 'contact':
      return createContactSchema(v);
    case 'business':
      return createBusinessSchema(v);
    case 'needs':
      return createNeedsSchema(v);
    case 'features':
      return createFeaturesSchema(v);
    case 'design':
      return createDesignSchema(v);
    case 'timeline-budget':
      return createTimelineBudgetSchema(v);
    case 'review':
      return createDiscoveryFormSchema(v);
  }
}

export {
  createBusinessSchema,
  createContactSchema,
  createDesignSchema,
  createDiscoveryFormSchema,
  createFeaturesSchema,
  createNeedsSchema,
  createTimelineBudgetSchema,
};
