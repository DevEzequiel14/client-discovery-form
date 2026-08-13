import type { Messages } from '../types';

export const en: Messages = {
  meta: {
    brandLabel: 'Web quote',
    homeTitle: 'Web quote',
    homeDescription:
      'A short survey to understand your needs, readiness, and expectations before proposing the right solution.',
    formTitle: 'Project survey',
    formDescription:
      'Answer step by step so we can understand your project and prepare a clear proposal.',
    thanksTitle: 'Request sent',
    thanksDescription:
      'We received your information. We write within 1–2 business days with a clear proposal.',
  },
  common: {
    continue: 'Continue',
    back: 'Back',
    submit: 'Submit request',
    submitting: 'Submitting…',
    required: 'Required',
    optional: 'Optional',
    language: 'Language',
    startCta: 'Start the survey',
    goHome: 'Back to home',
    edit: 'Edit',
    draftContinue: 'Continue',
    draftRestart: 'Start over',
  },
  home: {
    headline: 'A short survey to understand your project',
    supporting:
      'Your needs, readiness, and expectations help us choose the right solution and level of support.',
    timeEstimate: 'Takes about 5 minutes.',
    nextStep: 'We will follow up with next steps afterward. No commitment.',
    afterTitle: 'What happens next',
    afterSteps: [
      {
        title: 'You complete the survey',
        body: 'Five steps. Your answers are enough for us to understand the project.',
      },
      {
        title: 'We read it carefully',
        body: 'We write within 1–2 business days. If something is missing, we ask.',
      },
      {
        title: 'You get a clear proposal',
        body: 'Scope, timing, and a tentative investment. No commitment.',
      },
    ],
  },
  form: {
    progressLabel: 'Form progress',
    stepOf: 'Step {current} of {total}',
    reviewTitle: 'Review',
    reviewHint: 'Check your answers before submitting.',
    submitError: 'We could not submit the form. Please try again.',
    draftBanner: 'You have a draft saved on this device.',
    sections: {
      contact: 'Your details',
      business: 'Your business',
      assets: 'Materials',
      design: 'Visual style',
      technical: 'Practical details',
      timing: 'Timeline and investment',
      notes: 'Anything else',
    },
    phases: {
      identity: 'Who you are',
      needs: 'Need',
      readiness: 'Readiness',
      approach: 'Approach',
      close: 'Wrap-up',
    },
  },
  reviewStep: {
    hint: 'If something is off, edit it and come back here.',
    afterSend:
      'After you send, we write back with next steps. No commitment.',
    privacyNote:
      'We use this information only to reply and prepare your proposal.',
  },
  thanks: {
    headline: 'Good — we have your information.',
    supporting:
      'We will read it carefully and put together a clear proposal from here. We write within 1–2 business days. Thank you.',
    referenceLabel: 'Reference',
    ctaPrimary: 'Back to home',
    ctaNote: 'You can also close this tab — no worries.',
  },
  steps: {
    identity: {
      title: 'Tell us who you are',
      description:
        'Your details and a quick snapshot of the business, so we know how to reply.',
    },
    needs: {
      title: 'What do you need to solve?',
      description: 'Say it in your own words. No need to talk about technology yet.',
    },
    readiness: {
      title: 'What do you already have?',
      description:
        'Materials and a visual direction. It is fine if not everything is ready.',
    },
    approach: {
      title: 'How we should approach it',
      description:
        'Practical details, timing, and a rough range. Not a commitment.',
    },
    close: {
      title: 'Review and send',
      description:
        'If something is off, edit it. We will write back with next steps.',
    },
  },
  contactStep: {
    fullNamePlaceholder: 'e.g. Ana Pérez',
    emailPlaceholder: 'ana@company.com',
    phonePlaceholder: '+1 555 123 4567',
    emailHint: 'We will reply to this email.',
    phoneHint: 'If you prefer WhatsApp or a call.',
    privacyNote:
      'We only use these details to reply and prepare your quote. We do not share them.',
    savedMessage: 'Details saved. The next step will be available soon.',
  },
  businessStep: {
    companyPlaceholder: 'e.g. Norte Studio',
    industryPlaceholder: 'Select an industry',
    industryHint: '',
    hasWebsiteLegend: 'Do you have a website?',
    hasWebsiteHint: 'If you already have a site, we ask for the URL to review it.',
    websitePlaceholder: 'https://www.example.com',
    websiteHint: 'Full URL, with https://',
    yes: 'Yes',
    no: 'No',
    savedMessage:
      'Business details saved. The next step will be available soon.',
    industries: {
      retail: 'Retail / commerce',
      services: 'Services',
      technology: 'Technology',
      health: 'Healthcare',
      education: 'Education',
      food: 'Food & hospitality',
      realEstate: 'Real estate',
      construction: 'Construction',
      professional: 'Professional services',
      other: 'Other',
    },
  },
  needsStep: {
    goalsPlaceholder:
      'e.g. We get few web inquiries and mostly rely on word of mouth…',
    goalsHint: 'In your own words. No need to talk about technology yet.',
    projectTypeLegend: 'What kind of project do you imagine?',
    projectTypeHint: 'Pick the closest one. We can refine it later.',
    expectedOutcomePlaceholder:
      'e.g. More inquiries each month / sell online / organize orders…',
    expectedOutcomeHint:
      'Optional. A concrete result that would make you say “this worked”.',
    savedMessage: 'Need captured. The next step will be available soon.',
    projectTypeOptions: {
      website: {
        label: 'Website',
        description: 'Online presence and contact.',
      },
      webApp: {
        label: 'App or system',
        description: 'Workflows, users, and data.',
      },
      ecommerce: {
        label: 'Online store',
        description: 'Catalog, payments, and sales.',
      },
      redesign: {
        label: 'Redesign',
        description: 'Improve something that already exists.',
      },
      other: {
        label: 'Other',
        description: 'Not sure yet, or a mix.',
      },
    },
  },
  assetsStep: {
    helpLegend:
      'If you’re missing any of the above, would you like help putting it together?',
    helpHint:
      'No problem if you don’t have everything ready. We can help with what’s missing.',
    savedMessage: 'Assets recorded. The next step will be available soon.',
    logoOptions: {
      yes: 'Yes',
      no: 'No',
    },
    contentOptions: {
      all: 'I have it all',
      some: 'I have some',
      none: 'I don’t have any',
    },
    styleOptions: {
      defined: 'I have them',
      ideas: 'I have ideas',
      none: 'Not yet',
    },
    items: {
      logo: {
        label: 'Do you have a logo?',
        hint: 'A usable file (PNG, SVG, or similar), not just a cropped photo.',
      },
      photos: {
        label: 'Photos of the business, products, or team',
        hint: 'Original images you can use on the site.',
      },
      texts: {
        label: 'Texts (services, about, benefits…)',
        hint: 'Even drafts or notes in WhatsApp count.',
      },
      visualIdentity: {
        label: 'Colors and fonts',
        hint: 'If you already have brand colors, a preferred typeface, or know the font name.',
      },
    },
  },
  designStep: {
    styleLegend: 'Which style feels closest to what you imagine?',
    styleHint:
      'Pick the sample that feels closest. It is a direction, not a final design.',
    styleNoteLabel: 'Tell us a bit more',
    styleNotePlaceholder:
      'e.g. A mix of clean and bold, or something that does not fit the options…',
    styleNoteHint: 'Optional. Any detail that helps us understand.',
    hasReferencesLegend: 'Do you have any reference pages or sites?',
    hasReferencesHint:
      'If there are sites you like, we use them as a starting point.',
    yes: 'Yes',
    no: 'No',
    urlsPlaceholder:
      'https://example.com\nhttps://another-reference.com/page',
    urlsHint: 'Paste one or more URLs (one per line).',
    tastePlaceholder:
      'e.g. I like clean and clear layouts. I prefer to avoid cluttered or overly corporate looks…',
    tasteHint: 'Optional. What you like, what to avoid, or the feeling you want.',
    savedMessage: 'Style captured. The next step will be available soon.',
    styleOptions: {
      minimal: {
        label: 'Minimal',
        description: 'Space, clarity, and few elements.',
      },
      modern: {
        label: 'Modern / bold',
        description: 'Current, clean, or full of personality.',
      },
      classic: {
        label: 'Classic / elegant',
        description: 'Sober, timeless, and detail-oriented.',
      },
      friendly: {
        label: 'Friendly',
        description: 'Warm, approachable, and easy to browse.',
      },
      other: {
        label: 'Other / mix',
        description: 'Does not fit a single category.',
      },
    },
  },
  technicalStep: {
    infraLegend: 'What do you already have ready for the site?',
    infraHint: 'If you are not sure, pick that option—we will sort it out together.',
    domainNamePlaceholder: 'yourbusiness.com',
    domainNameHint: 'Enter it without https://, just the domain name.',
    emailLegend: 'Do you want email with the domain?',
    emailHint: 'For example: hello@yourbusiness.com',
    maintenanceLegend:
      'Once the site is online, who would maintain and update it?',
    maintenanceHint: 'Copy changes, news, tweaks, or day-to-day care.',
    savedMessage: 'Details saved. The next step will be available soon.',
    infraOptions: {
      both: 'Domain and hosting',
      domainOnly: 'Domain only',
      hostingOnly: 'Hosting only',
      none: 'Nothing yet',
      unsure: 'I am not sure',
    },
    emailOptions: {
      yes: 'Yes',
      unsure: 'I am not sure yet',
      no: 'Not needed',
    },
    maintenanceOptions: {
      client: 'Me or my team',
      agency: 'You',
      undecided: 'I have not decided yet',
    },
  },
  timelineBudgetStep: {
    timelineLegend: 'When would you like it ready?',
    timelineHint: 'A rough idea is enough; we can refine it later.',
    investmentLegend: 'Which investment range feels comfortable?',
    investmentHint:
      'USD amounts are a reference, not a quote. We can agree in USD or a local equivalent. Not sure? Choose “let’s talk later”.',
    savedMessage: 'Answers saved. The next step will be available soon.',
    timelineOptions: {
      asap: 'As soon as possible',
      oneToThreeMonths: 'In 1 to 3 months',
      flexible: 'No rush',
      unsure: 'I am not sure yet',
    },
    investmentOptions: {
      starter: {
        label: 'Initial presence',
        range: 'Up to ~USD 1,000',
        example: 'Landing page or small site',
      },
      focused: {
        label: 'Focused site',
        range: '~USD 1,000 – 2,500',
        example: 'Several pages and a clear goal',
      },
      complete: {
        label: 'Full project',
        range: '~USD 2,500 – 5,000',
        example: 'A site or system with more moving parts',
      },
      open: {
        label: 'Custom',
        range: 'More than ~USD 5,000',
        example: 'Broader or longer-term scope',
      },
      discuss: {
        label: 'Let’s talk later',
        range: '',
        example: 'No number for now',
      },
    },
  },
  extrasStep: {
    promptsLabel: 'If it helps:',
    writeLabel: 'Is there anything else we should know?',
    writePlaceholder: 'E.g. We need to be online before October…',
    writeHint: 'Optional. If there is nothing else, you can continue.',
    savedMessage: 'Thanks for sharing. The next step will be available soon.',
    prompts: {
      deadline: {
        label: 'Date or event',
        seed: 'Date or event: ',
      },
      mustHave: {
        label: 'Must not be missing',
        seed: 'Must not be missing: ',
      },
      concern: {
        label: 'Doubt or concern',
        seed: 'Doubt or concern: ',
      },
    },
  },
  fields: {
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone',
    company: 'Business name',
    industry: 'Industry',
    hasWebsite: 'Do you have a website?',
    website: 'Website URL',
    projectType: 'Project type',
    goals: 'What problem or opportunity do you want to solve?',
    expectedOutcome: 'How would you know the project worked?',
    logo: 'Logo',
    photos: 'Photographs',
    texts: 'Copy / texts',
    visualIdentity: 'Colors and fonts',
    needsContentHelp: 'Help with materials',
    designStyle: 'Visual style',
    designStyleNote: 'Style detail',
    hasReferences: 'Do you have references?',
    referenceUrls: 'Reference pages or sites',
    designTaste: 'Anything you like or want to avoid?',
    infraStatus: 'What you have ready today',
    domainName: 'Domain name',
    corporateEmailStatus: 'Domain email',
    siteMaintenance: 'Who maintains and updates the site',
    timeline: 'When you need it',
    investmentRange: 'Investment range',
    additionalNotes: 'What we have not asked yet',
  },
  validation: {
    required: 'This field is required',
    emailInvalid: 'Enter a valid email',
    urlInvalid: 'Enter at least one reference URL or domain',
    phoneInvalid: 'Enter a valid phone number',
    minLength: 'Must be at least {min} characters',
    selectAtLeastOne: 'Select at least one option',
  },
};
