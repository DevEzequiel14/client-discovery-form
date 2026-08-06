import type { StepId } from '../types/steps';
import type { ValidationMessages } from './messages';
import { createBusinessSchema } from './business.schema';
import { createContactSchema } from './contact.schema';
import { createDesignSchema } from './design.schema';
import { createDiscoveryFormSchema } from './discovery-form.schema';
import { createFeaturesSchema } from './features.schema';
import { createGoalsSchema } from './goals.schema';
import { createProjectTypeSchema } from './project-type.schema';
import { createTimelineBudgetSchema } from './timeline-budget.schema';

export function getStepSchema(stepId: StepId, v: ValidationMessages) {
  switch (stepId) {
    case 'contact':
      return createContactSchema(v);
    case 'business':
      return createBusinessSchema(v);
    case 'project-type':
      return createProjectTypeSchema(v);
    case 'goals':
      return createGoalsSchema(v);
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
  createGoalsSchema,
  createProjectTypeSchema,
  createTimelineBudgetSchema,
};
