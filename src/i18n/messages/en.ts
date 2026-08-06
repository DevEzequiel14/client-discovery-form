import type { Messages } from '../types';

export const en: Messages = {
  meta: {
    brandLabel: 'Web quote',
    homeTitle: 'Tell us about your project',
    homeDescription:
      'Answer a few questions before requesting a quote for your website or system.',
    formTitle: 'Project form',
    formDescription:
      'Answer step by step so we can understand your project and prepare a clear proposal.',
    thanksTitle: 'Thank you!',
    thanksDescription: 'We received your information. We will contact you soon.',
  },
  common: {
    continue: 'Continue',
    back: 'Back',
    submit: 'Submit request',
    submitting: 'Submitting…',
    required: 'Required',
    optional: 'Optional',
    language: 'Language',
    startCta: 'Get started',
    goHome: 'Back to home',
    edit: 'Edit',
  },
  home: {
    headline: 'Tell us about your project',
    supporting:
      'Answer these questions so we can understand your goals, scope, and timeline before preparing a proposal.',
    timeEstimate: 'Takes about 5–8 minutes.',
    nextStep: 'We will follow up with next steps afterward.',
  },
  form: {
    progressLabel: 'Form progress',
    stepOf: 'Step {current} of {total}',
    reviewTitle: 'Review',
    reviewHint: 'Check your answers before submitting.',
    submitError: 'We could not submit the form. Please try again.',
  },
  thanks: {
    headline: 'Request received',
    supporting:
      'We will review your information and follow up with next steps.',
    reference: 'Reference',
  },
  steps: {
    contact: {
      title: 'How can we reach you?',
      description:
        'We only need these details to get back to you. We do not share your information.',
    },
    business: {
      title: 'Tell us about your business',
      description:
        'This helps us understand your brand context before we talk about the project.',
    },
    needs: {
      title: 'What do you need to solve?',
      description:
        'We start with your problem or goal. Then we look at the project type you imagine and the result you expect.',
    },
    assets: {
      title: 'What materials do you already have?',
      description:
        'This shows how ready you are to produce and whether you need help with content and brand.',
    },
    design: {
      title: 'What visual style are you after?',
      description:
        'No color talk: we want references, aesthetic direction, and taste.',
    },
    technical: {
      title: 'A few practical details',
      description:
        'Just to understand where things stand technically and who will look after the site later.',
    },
    'timeline-budget': {
      title: 'Timing and investment',
      description:
        'This helps us suggest realistic paths—without asking for an exact number.',
    },
    review: {
      title: 'Review',
      description: 'Confirm everything looks right.',
    },
  },
  contactStep: {
    fullNamePlaceholder: 'e.g. Ana Pérez',
    emailPlaceholder: 'ana@company.com',
    phonePlaceholder: '+1 555 123 4567',
    emailHint: 'We will use this email to reply.',
    phoneHint: 'If you prefer WhatsApp or a phone call.',
    privacyNote: 'We only use this information to prepare your quote.',
    savedMessage: 'Details saved. The next step will be available soon.',
  },
  businessStep: {
    companyPlaceholder: 'e.g. Norte Studio',
    industryPlaceholder: 'Select an industry',
    industryHint: 'Choose the one that best matches your main activity.',
    hasWebsiteLegend: 'Do you have a website?',
    hasWebsiteHint: 'If a site already exists, we ask for the URL to review it.',
    websitePlaceholder: 'https://www.example.com',
    websiteHint: 'Include the full URL, with https://',
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
      'e.g. Today we rely on word of mouth and want a steady way to get inquiries…',
    goalsHint:
      'Describe the problem or opportunity. No need to talk about technology yet.',
    projectTypeLegend: 'What kind of project do you imagine?',
    projectTypeHint: 'Pick the closest option. We can refine it together later.',
    expectedOutcomePlaceholder:
      'e.g. I want more qualified inquiries each month and a clear way to present my services…',
    expectedOutcomeHint:
      'Think about the concrete result that would make you say “this worked”.',
    savedMessage: 'Need captured. The next step will be available soon.',
    projectTypeOptions: {
      website: {
        label: 'Website',
        description: 'Online presence, pages, and contact.',
      },
      webApp: {
        label: 'App or system',
        description: 'Workflows, users, and information management.',
      },
      ecommerce: {
        label: 'Online store',
        description: 'Catalog, payments, and online sales.',
      },
      redesign: {
        label: 'Redesign',
        description: 'Improve an existing site or system.',
      },
      other: {
        label: 'Other',
        description: 'You are unsure or it is a mix.',
      },
    },
  },
  assetsStep: {
    matrixLegend: 'Status of each asset',
    matrixHint: 'Choose the option closest to your current situation.',
    helpLegend: 'Would you like help creating or completing what’s missing?',
    helpHint:
      'If you prefer to focus on your business, we can handle content and brand.',
    savedMessage: 'Assets recorded. The next step will be available soon.',
    readiness: {
      ready: 'Ready',
      partial: 'Partial',
      none: 'Don’t have',
    },
    items: {
      logo: {
        label: 'Logo',
        hint: 'A usable file (SVG, PNG, or AI), not just a cropped photo.',
      },
      photos: {
        label: 'Photographs',
        hint: 'Original images of the business, products, or team.',
      },
      texts: {
        label: 'Copy / texts',
        hint: 'Service copy, about text, benefits, or offers.',
      },
      visualIdentity: {
        label: 'Visual identity',
        hint: 'Defined colors, typography, or visual style.',
      },
      brandManual: {
        label: 'Brand guidelines',
        hint: 'A document with brand usage rules.',
      },
    },
  },
  designStep: {
    styleLegend: 'Which style feels closest to what you imagine?',
    styleHint: 'Pick a general direction. We will refine it with references.',
    urlsPlaceholder:
      'https://example.com\nhttps://another-reference.com/page',
    urlsHint:
      'Paste one or more URLs of sites or pages you like (one per line).',
    tastePlaceholder:
      'e.g. I like clean layouts with strong typography. I prefer to avoid cluttered or overly corporate looks…',
    tasteHint:
      'Tell us what you like, what to avoid, and the feeling it should convey.',
    savedMessage: 'Style captured. The next step will be available soon.',
    styleOptions: {
      minimal: {
        label: 'Minimal',
        description: 'Space, clarity, and few elements.',
      },
      modern: {
        label: 'Modern',
        description: 'Current, clean, and visually paced.',
      },
      classic: {
        label: 'Classic',
        description: 'Sober, ordered, and timeless.',
      },
      bold: {
        label: 'Bold',
        description: 'Strong, expressive, and full of personality.',
      },
      elegant: {
        label: 'Elegant',
        description: 'Refined, premium, and detail-oriented.',
      },
      friendly: {
        label: 'Friendly',
        description: 'Warm, approachable, and easy to browse.',
      },
      editorial: {
        label: 'Editorial',
        description: 'Focused on type, reading, and composition.',
      },
      other: {
        label: 'Other / mix',
        description: 'Does not fit a single category.',
      },
    },
  },
  technicalStep: {
    domainLegend: 'Do you already have a domain for the site?',
    domainHint: 'For example: yourbusiness.com',
    domainNamePlaceholder: 'yourbusiness.com',
    domainNameHint: 'Enter it without https://, just the domain name.',
    hostingLegend: 'Do you already have a place to host the site?',
    hostingHint: 'If you are not sure, that option is fine.',
    emailLegend: 'Do you use or plan to use email with your domain?',
    emailHint: 'For example: hello@yourbusiness.com',
    adminLegend: 'Once the site is online, who will handle day-to-day tasks?',
    adminHint: 'Posting updates, checking messages, or simple site tasks.',
    updatesLegend: 'And for later changes or updates, who would take care of them?',
    updatesHint: 'Text edits, new sections, or adjustments over time.',
    savedMessage: 'Details saved. The next step will be available soon.',
    domainOptions: {
      yes: 'Yes, I already have one',
      buying: 'I am buying it',
      no: 'Not yet',
      unsure: 'I am not sure',
    },
    hostingOptions: {
      yes: 'Yes, I already have it',
      no: 'Not yet',
      unsure: 'I am not sure',
    },
    emailOptions: {
      yes: 'Yes, I already use it',
      planning: 'I want to set it up',
      no: 'Not for now',
    },
    roleOptions: {
      myself: 'Me',
      team: 'Someone on my team',
      external: 'An external person',
      undecided: 'I have not decided yet',
    },
  },
  timelineBudgetStep: {
    timelineLegend: 'When would you like it ready?',
    timelineHint: 'A rough idea is enough; we can refine it together later.',
    investmentLegend:
      'Which investment range feels comfortable for this project?',
    investmentIntro:
      'No exact amount needed. Pick the option that feels closest—it helps us suggest paths that fit.',
    investmentHint:
      'This is not a commitment. If you prefer to leave it for the conversation, that is fine too.',
    notesPlaceholder:
      'e.g. There is an event date, or you want to move in stages…',
    notesHint: 'Anything that helps us prioritize timing or scope.',
    savedMessage: 'Answers saved. The next step will be available soon.',
    timelineOptions: {
      asap: 'As soon as possible',
      oneMonth: 'In about a month',
      oneToThreeMonths: 'In 1 to 3 months',
      flexible: 'No rush; I am flexible',
      unsure: 'I am not sure yet',
    },
    investmentOptions: {
      starter: {
        label: 'A contained starting point',
        description: 'Rough guide: up to ~USD 1,000',
      },
      focused: {
        label: 'A mid-scope project',
        description: 'Rough guide: ~USD 1,000 – 2,500',
      },
      complete: {
        label: 'Something more complete',
        description: 'Rough guide: ~USD 2,500 – 5,000',
      },
      open: {
        label: 'I am open to a broader investment',
        description: 'Rough guide: more than ~USD 5,000',
      },
      discuss: {
        label: 'I prefer to talk about it later',
        description: 'No problem—we can cover it in the conversation.',
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
    goals: 'What do you want to achieve?',
    expectedOutcome: 'What do you expect to get?',
    logo: 'Logo',
    photos: 'Photographs',
    texts: 'Copy / texts',
    visualIdentity: 'Visual identity',
    brandManual: 'Brand guidelines',
    needsContentHelp: 'Help with materials',
    designStyle: 'Visual style',
    referenceUrls: 'Reference pages or sites',
    designTaste: 'Taste and preferences',
    domainStatus: 'Domain',
    domainName: 'Domain name',
    hostingStatus: 'Place to host the site',
    corporateEmailStatus: 'Domain email',
    siteAdmin: 'Who handles day-to-day',
    siteUpdates: 'Who handles updates',
    timeline: 'When you need it',
    investmentRange: 'Investment range',
    additionalNotes: 'Anything else you want to share',
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
