import type { StepId } from '@features/discovery-form/types/steps';

export type InvestmentOptionCopy = {
  label: string;
  range: string;
  example: string;
};

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
    draftContinue: string;
    draftRestart: string;
  };
  home: {
    headline: string;
    supporting: string;
    timeEstimate: string;
    nextStep: string;
    afterTitle: string;
    afterSteps: Array<{
      title: string;
      body: string;
    }>;
  };
  form: {
    progressLabel: string;
    stepOf: string;
    reviewTitle: string;
    reviewHint: string;
    submitError: string;
    draftBanner: string;
    sections: {
      contact: string;
      business: string;
      assets: string;
      design: string;
      technical: string;
      timing: string;
      notes: string;
    };
    phases: Record<StepId, string>;
  };
  reviewStep: {
    hint: string;
    afterSend: string;
    privacyNote: string;
  };
  thanks: {
    headline: string;
    supporting: string;
    referenceLabel: string;
    ctaPrimary: string;
    ctaNote: string;
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
  assetsStep: {
    helpLegend: string;
    helpHint: string;
    savedMessage: string;
    logoOptions: {
      yes: string;
      no: string;
    };
    contentOptions: {
      all: string;
      some: string;
      none: string;
    };
    styleOptions: {
      defined: string;
      ideas: string;
      none: string;
    };
    items: {
      logo: { label: string; hint: string };
      photos: { label: string; hint: string };
      texts: { label: string; hint: string };
      visualIdentity: { label: string; hint: string };
    };
  };
  designStep: {
    styleLegend: string;
    styleHint: string;
    styleNoteLabel: string;
    styleNotePlaceholder: string;
    styleNoteHint: string;
    hasReferencesLegend: string;
    hasReferencesHint: string;
    yes: string;
    no: string;
    urlsPlaceholder: string;
    urlsHint: string;
    tastePlaceholder: string;
    tasteHint: string;
    savedMessage: string;
    styleOptions: {
      minimal: { label: string; description: string };
      modern: { label: string; description: string };
      classic: { label: string; description: string };
      friendly: { label: string; description: string };
      other: { label: string; description: string };
    };
  };
  technicalStep: {
    infraLegend: string;
    infraHint: string;
    domainNamePlaceholder: string;
    domainNameHint: string;
    emailLegend: string;
    emailHint: string;
    maintenanceLegend: string;
    maintenanceHint: string;
    savedMessage: string;
    infraOptions: {
      both: string;
      domainOnly: string;
      hostingOnly: string;
      none: string;
      unsure: string;
    };
    emailOptions: {
      yes: string;
      unsure: string;
      no: string;
    };
    maintenanceOptions: {
      client: string;
      agency: string;
      undecided: string;
    };
  };
  timelineBudgetStep: {
    timelineLegend: string;
    timelineHint: string;
    investmentLegend: string;
    investmentHint: string;
    savedMessage: string;
    timelineOptions: {
      asap: string;
      oneToThreeMonths: string;
      flexible: string;
      unsure: string;
    };
    investmentOptions: {
      starter: InvestmentOptionCopy;
      focused: InvestmentOptionCopy;
      complete: InvestmentOptionCopy;
      open: InvestmentOptionCopy;
      discuss: InvestmentOptionCopy;
    };
  };
  extrasStep: {
    promptsLabel: string;
    writeLabel: string;
    writePlaceholder: string;
    writeHint: string;
    savedMessage: string;
    prompts: {
      deadline: { label: string; seed: string };
      mustHave: { label: string; seed: string };
      concern: { label: string; seed: string };
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
    goals: string;
    projectType: string;
    expectedOutcome: string;
    logo: string;
    photos: string;
    texts: string;
    visualIdentity: string;
    needsContentHelp: string;
    designStyle: string;
    designStyleNote: string;
    hasReferences: string;
    referenceUrls: string;
    designTaste: string;
    infraStatus: string;
    domainName: string;
    corporateEmailStatus: string;
    siteMaintenance: string;
    timeline: string;
    investmentRange: string;
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
