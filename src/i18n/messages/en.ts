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
      title: 'Business',
      description: 'Tell us about your company or brand.',
    },
    'project-type': {
      title: 'Project type',
      description: 'What you need to build.',
    },
    goals: {
      title: 'Goals',
      description: 'What you want to achieve with this project.',
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
  fields: {
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone',
    company: 'Company / brand',
    industry: 'Industry',
    website: 'Current website',
    projectType: 'Project type',
    projectTypeOptions: {
      website: 'Website',
      webApp: 'Web app / system',
      ecommerce: 'E-commerce',
      redesign: 'Redesign',
      other: 'Other',
    },
    goals: 'Main goals',
    targetAudience: 'Target audience',
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
