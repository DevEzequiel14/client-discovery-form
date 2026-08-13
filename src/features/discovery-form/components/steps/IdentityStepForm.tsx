import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { RadioGroup } from '@components/ui/RadioGroup';
import { SelectField } from '@components/ui/SelectField';
import { getMessages, type Locale } from '@i18n/index';
import { btnPrimary, stepCard, stepNav } from '@lib/ui-classes';
import {
  INDUSTRIES,
  type HasWebsite,
  type Industry,
} from '../../constants/industries';
import { useStepErrors } from '../../hooks/use-step-errors';
import { createIdentitySchema } from '../../schemas';
import { saveDiscoveryLead } from '../../services/save-discovery-lead';
import {
  $discoveryForm,
  completeStepAndGo,
  ensureLeadId,
  patchFormData,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { BusinessData, ContactData } from '../../types/form';

type IdentityStepFormProps = {
  locale: Locale;
};

type IdentityField = keyof (ContactData & BusinessData);

const FIELD_ORDER = [
  'fullName',
  'email',
  'phone',
  'company',
  'industry',
  'hasWebsite',
  'website',
] as const satisfies readonly IdentityField[];

export function IdentityStepForm({ locale }: IdentityStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const { errors, clearError, applyZodFailure, clearAll } =
    useStepErrors(FIELD_ORDER);

  const values = {
    fullName: form.data.fullName ?? '',
    email: form.data.email ?? '',
    phone: form.data.phone ?? '',
    company: form.data.company ?? '',
    industry: (form.data.industry ?? '') as Industry | '',
    hasWebsite: (form.data.hasWebsite ?? '') as HasWebsite | '',
    website: form.data.website ?? '',
  };

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const result = createIdentitySchema(messages.validation).safeParse({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      company: values.company,
      industry: values.industry || undefined,
      hasWebsite: values.hasWebsite || undefined,
      website: values.website,
    });

    if (!result.success) {
      applyZodFailure(result.error);
      setFormStatus('idle');
      return;
    }

    const payload: ContactData & BusinessData = {
      fullName: result.data.fullName,
      email: result.data.email,
      ...(result.data.phone ? { phone: result.data.phone } : {}),
      company: result.data.company,
      industry: result.data.industry,
      hasWebsite: result.data.hasWebsite,
      website:
        result.data.hasWebsite === 'yes' ? result.data.website : undefined,
    };

    patchFormData({
      ...payload,
      website: payload.hasWebsite === 'yes' ? (payload.website ?? '') : '',
    });
    clearAll();
    setFormStatus('idle');

    const leadId = ensureLeadId();
    void saveDiscoveryLead({
      locale,
      leadId,
      data: {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        company: payload.company,
        industry: payload.industry,
        hasWebsite: payload.hasWebsite,
        website: payload.website,
      },
    });

    completeStepAndGo('needs');
  }

  const industryOptions = INDUSTRIES.map((industry) => ({
    value: industry,
    label: messages.businessStep.industries[industry],
  }));

  return (
    <form className="space-y-5" noValidate onSubmit={handleContinue}>
      <div className={['space-y-4', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.contact}
        </h2>

        <FormField
          id="fullName"
          name="fullName"
          label={messages.fields.fullName}
          type="text"
          value={values.fullName}
          placeholder={messages.contactStep.fullNamePlaceholder}
          error={errors.fullName}
          required
          autoComplete="name"
          inputMode="text"
          onChange={(event) => {
            patchFormData({ fullName: event.target.value });
            clearError('fullName');
          }}
        />

        <FormField
          id="email"
          name="email"
          label={messages.fields.email}
          type="email"
          value={values.email}
          placeholder={messages.contactStep.emailPlaceholder}
          hint={messages.contactStep.emailHint}
          error={errors.email}
          required
          autoComplete="email"
          inputMode="email"
          onChange={(event) => {
            patchFormData({ email: event.target.value });
            clearError('email');
          }}
        />

        <FormField
          id="phone"
          name="phone"
          label={messages.fields.phone}
          type="tel"
          value={values.phone}
          placeholder={messages.contactStep.phonePlaceholder}
          hint={messages.contactStep.phoneHint}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
          onChange={(event) => {
            patchFormData({ phone: event.target.value });
            clearError('phone');
          }}
        />

        <p className="border-t border-cdf-border/60 pt-3.5 text-xs leading-relaxed text-cdf-muted">
          {messages.contactStep.privacyNote}
        </p>
      </div>

      <div className={['space-y-4', stepCard].join(' ')}>
        <h2 className="text-sm font-medium text-cdf-ink">
          {messages.form.sections.business}
        </h2>

        <FormField
          id="company"
          name="company"
          label={messages.fields.company}
          type="text"
          value={values.company}
          placeholder={messages.businessStep.companyPlaceholder}
          error={errors.company}
          required
          autoComplete="organization"
          onChange={(event) => {
            patchFormData({ company: event.target.value });
            clearError('company');
          }}
        />

        <SelectField
          id="industry"
          name="industry"
          label={messages.fields.industry}
          value={values.industry}
          placeholder={messages.businessStep.industryPlaceholder}
          error={errors.industry}
          required
          options={industryOptions}
          onChange={(event) => {
            patchFormData({ industry: event.target.value as Industry });
            clearError('industry');
          }}
        />

        <RadioGroup
          name="hasWebsite"
          legend={messages.businessStep.hasWebsiteLegend}
          hint={messages.businessStep.hasWebsiteHint}
          value={values.hasWebsite}
          error={errors.hasWebsite}
          required
          options={[
            { value: 'yes', label: messages.businessStep.yes },
            { value: 'no', label: messages.businessStep.no },
          ]}
          onChange={(value) => {
            patchFormData({
              hasWebsite: value as HasWebsite,
              website: value === 'no' ? '' : values.website,
            });
            clearError('hasWebsite');
            if (value === 'no') clearError('website');
          }}
        />

        {values.hasWebsite === 'yes' ? (
          <FormField
            id="website"
            name="website"
            label={messages.fields.website}
            type="url"
            value={values.website}
            placeholder={messages.businessStep.websitePlaceholder}
            hint={messages.businessStep.websiteHint}
            error={errors.website}
            required
            autoComplete="url"
            inputMode="url"
            onChange={(event) => {
              patchFormData({ website: event.target.value });
              clearError('website');
            }}
          />
        ) : null}
      </div>

      <div className={[stepNav, 'justify-end'].join(' ')}>
        <button
          type="submit"
          className={btnPrimary}
          disabled={form.status === 'validating'}
        >
          {messages.common.continue}
        </button>
      </div>
    </form>
  );
}
