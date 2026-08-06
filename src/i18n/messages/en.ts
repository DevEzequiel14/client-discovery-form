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
    features: {
      title: 'Features',
      description: 'Key capabilities it should include.',
    },
    design: {
      title: 'Design',
      description: 'Style, references, and inspiration.',
    },
    'timeline-budget': {
      title: 'Timeline & budget',
      description: 'Time and investment expectations.',
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
    features: 'Desired features',
    designStyle: 'Design style',
    references: 'References or links',
    timeline: 'Desired timeline',
    budget: 'Estimated budget',
    additionalNotes: 'Additional notes',
  },
  validation: {
    required: 'This field is required',
    emailInvalid: 'Enter a valid email',
    urlInvalid: 'Enter a valid URL',
    phoneInvalid: 'Enter a valid phone number',
    minLength: 'Must be at least {min} characters',
    selectAtLeastOne: 'Select at least one option',
  },
};
