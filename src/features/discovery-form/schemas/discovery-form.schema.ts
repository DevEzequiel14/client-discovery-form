import type { ValidationMessages } from './messages';
import { createAssetsSchema } from './assets.schema';
import { createBusinessSchema } from './business.schema';
import { createContactSchema } from './contact.schema';
import { createDesignSchema } from './design.schema';
import { createNeedsSchema } from './needs.schema';
import { createTechnicalSchema } from './technical.schema';
import { createExtrasSchema } from './extras.schema';
import { createTimelineBudgetSchema } from './timeline-budget.schema';

export function createDiscoveryFormSchema(v: ValidationMessages) {
  return createContactSchema(v)
    .and(createBusinessSchema(v))
    .and(createNeedsSchema(v))
    .and(createAssetsSchema(v))
    .and(createDesignSchema(v))
    .and(createTechnicalSchema(v))
    .and(createTimelineBudgetSchema(v))
    .and(createExtrasSchema(v));
}

export type DiscoveryFormSchema = ReturnType<
  typeof createDiscoveryFormSchema
>;
