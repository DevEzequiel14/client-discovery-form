import type { StepId } from '@features/discovery-form/types/steps';

export type Messages = {
  meta: {
    /** Short client-facing label shown in the header / document title */
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
  fields: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    industry: string;
    website: string;
    projectType: string;
    projectTypeOptions: {
      website: string;
      webApp: string;
      ecommerce: string;
      redesign: string;
      other: string;
    };
    goals: string;
    targetAudience: string;
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
