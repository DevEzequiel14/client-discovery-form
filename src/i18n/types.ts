import type { StepId } from '@features/discovery-form/types/steps';

export type Messages = {
  meta: {
    brandLabel: string;
    homeTitle: string;
    homeDescription: string;
    formTitle: string;
    formDescription: string;
    thanksTitle: string;
    thanksDescription: string;
  };
  common: {
    continue: string;
    back: string;
    submit: string;
    submitting: string;
    required: string;
    optional: string;
    language: string;
    startCta: string;
    goHome: string;
    edit: string;
  };
  home: {
    headline: string;
    supporting: string;
    timeEstimate: string;
    nextStep: string;
  };
  form: {
    progressLabel: string;
    stepOf: string;
    reviewTitle: string;
    reviewHint: string;
    submitError: string;
  };
  thanks: {
    headline: string;
    supporting: string;
    reference: string;
  };
  steps: Record<
    StepId,
    {
      title: string;
      description: string;
    }
  >;
  contactStep: {
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    emailHint: string;
    phoneHint: string;
    privacyNote: string;
    savedMessage: string;
  };
  businessStep: {
    companyPlaceholder: string;
    industryPlaceholder: string;
    industryHint: string;
    hasWebsiteLegend: string;
    hasWebsiteHint: string;
    websitePlaceholder: string;
    websiteHint: string;
    yes: string;
    no: string;
    savedMessage: string;
    industries: {
      retail: string;
      services: string;
      technology: string;
      health: string;
      education: string;
      food: string;
      realEstate: string;
      construction: string;
      professional: string;
      other: string;
    };
  };
  needsStep: {
    goalsPlaceholder: string;
    goalsHint: string;
    projectTypeLegend: string;
    projectTypeHint: string;
    expectedOutcomePlaceholder: string;
    expectedOutcomeHint: string;
    savedMessage: string;
    projectTypeOptions: {
      website: { label: string; description: string };
      webApp: { label: string; description: string };
      ecommerce: { label: string; description: string };
      redesign: { label: string; description: string };
      other: { label: string; description: string };
    };
  };
  fields: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    hasWebsite: string;
    website: string;
    projectType: string;
    goals: string;
    expectedOutcome: string;
    features: string;
    designStyle: string;
    references: string;
    timeline: string;
    budget: string;
    additionalNotes: string;
  };
  validation: {
    required: string;
    emailInvalid: string;
    urlInvalid: string;
    phoneInvalid: string;
    minLength: string;
    selectAtLeastOne: string;
  };
};
