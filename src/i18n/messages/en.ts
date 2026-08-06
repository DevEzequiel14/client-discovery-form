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
    thanksTitle: 'Request received',
    thanksDescription:
      'We received your project. Here is what happens next and when you will hear from us.',
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
  reviewStep: {
    hint: 'Review each block. If something is off, you can edit it and come back here.',
    sectionLabel: 'Section {n}',
    emptyExtras: 'You did not add extra notes.',
    trustTitle: 'You are one step away from sending your project',
    trustBody:
      'With this information we prepare a tailored proposal. If anything is incomplete or has changed, it is better to fix it now.',
    nextTitle: 'What happens after you send',
    nextPoints: [
      'We receive your request and review it carefully',
      'We write back with next steps or a few focused questions',
      'No commitment: sending this is not a contract',
    ],
    privacyNote:
      'We use this information only to reply and prepare your proposal.',
  },
  thanks: {
    eyebrow: 'Successfully received',
    headline: 'Thank you. We have your project.',
    supporting:
      'We will read your information carefully. From here we prepare a clear proposal—without unnecessary back-and-forth.',
    referenceLabel: 'Your reference number',
    referenceHint:
      'Save it in case you write to us: it helps us find your request instantly.',
    nowTitle: 'What happens now',
    nowIntro: 'A simple path, with realistic timing so you know what to expect.',
    timeline: [
      {
        title: 'We review your request',
        timing: 'Today – 24 h',
        description:
          'We read goals, scope, materials, and context to understand the full project.',
      },
      {
        title: 'We write to you',
        timing: '1 – 2 business days',
        description:
          'You will get a message with next steps or, if needed, one or two focused questions.',
      },
      {
        title: 'We prepare the proposal',
        timing: '2 – 4 business days',
        description:
          'Once everything is clear, we shape a proposal aligned with your scope, timing, and investment.',
      },
    ],
    nextTitle: 'In the meantime, this can help',
    nextSteps: [
      'Gather logo, photos, and copy if they are not ready yet',
      'Have domain or hosting access handy, if you already have them',
      'Think of 1 or 2 reference sites you genuinely like',
    ],
    ctaSupporting: 'You do not need to do anything else for now. We will reach out.',
    ctaPrimary: 'Back to home',
    ctaNote: 'Optional: you can close this page with peace of mind.',
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
    extras: {
      title: 'Before we wrap up…',
      description:
        'If there is something we did not ask that changes how we understand your project — a constraint, an idea, a concern, or a detail that matters to you — tell us here. We read it carefully.',
    },
    review: {
      title: 'Review your information',
      description:
        'One last look before sending. This helps us understand your project clearly.',
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
  extrasStep: {
    listenLabel: 'We especially care if you can share…',
    listenPoints: [
      'Something that did not fit the earlier questions',
      'A constraint, date, or context that changes the approach',
      'How you picture the outcome, or what you want to avoid',
    ],
    promptsLabel: 'If it helps, start with one of these topics',
    promptsHint: 'Tap an idea to open the thread. You can add more than one.',
    writeLabel: 'Write in your own words',
    writePlaceholder:
      'For example: “We have an event in October and need to be online before…”, “We tried another site and it did not work because…”, “What matters most to me is…”',
    writeHint:
      'It does not need to be perfect. If there is nothing else, you can continue anyway.',
    readingNote: 'Thank you—we read this when shaping your proposal.',
    savedMessage: 'Thanks for sharing. The next step will be available soon.',
    prompts: {
      deadline: {
        label: 'There is an important date or event',
        seed: 'Important date or event:',
      },
      priorWork: {
        label: 'I already have prior experience with this',
        seed: 'Prior experience / current site:',
      },
      mustHave: {
        label: 'Something cannot be missing',
        seed: 'Must not be missing:',
      },
      concern: {
        label: 'I have a doubt or concern',
        seed: 'Doubt or concern:',
      },
      vision: {
        label: 'I want to describe the outcome I imagine',
        seed: 'How I picture the outcome:',
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
