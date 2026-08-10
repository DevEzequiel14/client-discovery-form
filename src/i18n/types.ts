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
    phases: {
      contact: string;
      business: string;
      project: string;
      close: string;
    };
  };
  reviewStep: {
    hint: string;
    sectionLabel: string;
    emptyExtras: string;
    trustTitle: string;
    trustBody: string;
    nextTitle: string;
    nextPoints: [string, string, string];
    privacyNote: string;
  };
  thanks: {
    eyebrow: string;
    headline: string;
    supporting: string;
    referenceLabel: string;
    referenceHint: string;
    nowTitle: string;
    nowIntro: string;
    timeline: [
      { title: string; timing: string; description: string },
      { title: string; timing: string; description: string },
      { title: string; timing: string; description: string },
    ];
    nextTitle: string;
    nextSteps: [string, string, string];
    ctaSupporting: string;
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
    urlsPlaceholder: string;
    urlsHint: string;
    tastePlaceholder: string;
    tasteHint: string;
    savedMessage: string;
    styleOptions: {
      minimal: { label: string; description: string };
      modern: { label: string; description: string };
      classic: { label: string; description: string };
      bold: { label: string; description: string };
      elegant: { label: string; description: string };
      friendly: { label: string; description: string };
      editorial: { label: string; description: string };
      other: { label: string; description: string };
    };
  };
  technicalStep: {
    domainLegend: string;
    domainHint: string;
    domainNamePlaceholder: string;
    domainNameHint: string;
    hostingLegend: string;
    hostingHint: string;
    emailLegend: string;
    emailHint: string;
    adminLegend: string;
    adminHint: string;
    updatesLegend: string;
    updatesHint: string;
    savedMessage: string;
    domainOptions: {
      yes: string;
      buying: string;
      no: string;
      unsure: string;
    };
    hostingOptions: {
      yes: string;
      no: string;
      unsure: string;
    };
    emailOptions: {
      yes: string;
      planning: string;
      no: string;
    };
    roleOptions: {
      myself: string;
      team: string;
      external: string;
      undecided: string;
    };
  };
  timelineBudgetStep: {
    timelineLegend: string;
    timelineHint: string;
    investmentLegend: string;
    investmentIntro: string;
    investmentHint: string;
    savedMessage: string;
    timelineOptions: {
      asap: string;
      oneMonth: string;
      oneToThreeMonths: string;
      flexible: string;
      unsure: string;
    };
    investmentOptions: {
      starter: { label: string; description: string };
      focused: { label: string; description: string };
      complete: { label: string; description: string };
      open: { label: string; description: string };
      discuss: { label: string; description: string };
    };
  };
  extrasStep: {
    listenLabel: string;
    listenPoints: [string, string, string];
    promptsLabel: string;
    promptsHint: string;
    writeLabel: string;
    writePlaceholder: string;
    writeHint: string;
    readingNote: string;
    savedMessage: string;
    prompts: {
      deadline: { label: string; seed: string };
      priorWork: { label: string; seed: string };
      mustHave: { label: string; seed: string };
      concern: { label: string; seed: string };
      vision: { label: string; seed: string };
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
    referenceUrls: string;
    designTaste: string;
    domainStatus: string;
    domainName: string;
    hostingStatus: string;
    corporateEmailStatus: string;
    siteAdmin: string;
    siteUpdates: string;
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
