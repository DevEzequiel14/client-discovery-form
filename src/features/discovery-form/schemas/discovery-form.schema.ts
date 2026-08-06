import type { ValidationMessages } from './messages';
import { createBusinessSchema } from './business.schema';
import { createContactSchema } from './contact.schema';
import { createDesignSchema } from './design.schema';
import { createFeaturesSchema } from './features.schema';
import { createGoalsSchema } from './goals.schema';
import { createProjectTypeSchema } from './project-type.schema';
import { createTimelineBudgetSchema } from './timeline-budget.schema';

export function createDiscoveryFormSchema(v: ValidationMessages) {
  return createContactSchema(v)
    .and(createBusinessSchema(v))
    .and(createProjectTypeSchema(v))
    .and(createGoalsSchema(v))
    .and(createFeaturesSchema(v))
    .and(createDesignSchema(v))
    .and(createTimelineBudgetSchema(v));
}

export type DiscoveryFormSchema = ReturnType<
  typeof createDiscoveryFormSchema
>;
