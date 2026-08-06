import { useEffect, useId, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { FormField } from '@components/ui/FormField';
import { getMessages, type Locale } from '@i18n/index';
import { zodErrorToFieldErrors } from '../../lib/field-errors';
import { createContactSchema } from '../../schemas/contact.schema';
import {
  $discoveryForm,
  $formLocale,
  patchFormData,
  setCurrentStep,
  setFieldErrors,
  setFormStatus,
} from '../../stores/discovery-form.store';
import type { ContactData } from '../../types/form';

type ContactStepFormProps = {
  locale: Locale;
};

type ContactField = keyof ContactData;

const FIELD_ORDER: ContactField[] = ['fullName', 'email', 'phone'];

export function ContactStepForm({ locale }: ContactStepFormProps) {
  const form = useStore($discoveryForm);
  const messages = getMessages(locale);
  const formId = useId();
  const firstErrorRef = useRef<ContactField | null>(null);

  const [values, setValues] = useState({
    fullName: form.data.fullName ?? '',
    email: form.data.email ?? '',
    phone: form.data.phone ?? '',
  });
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>(
    {},
  );

  useEffect(() => {
    $formLocale.set(locale);
  }, [locale]);

  useEffect(() => {
    if (!firstErrorRef.current) return;
    const field = document.getElementById(firstErrorRef.current);
    field?.focus();
    firstErrorRef.current = null;
  }, [errors]);

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleContinue(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFormStatus('validating');

    const schema = createContactSchema(messages.validation);
    const result = schema.safeParse(values);

    if (!result.success) {
      const fieldErrors = zodErrorToFieldErrors(result.error);
      const nextErrors: Partial<Record<ContactField, string>> = {};

      for (const field of FIELD_ORDER) {
        if (fieldErrors[field]) {
          nextErrors[field] = fieldErrors[field];
        }
      }

      firstErrorRef.current =
        FIELD_ORDER.find((field) => nextErrors[field]) ?? null;
      setErrors(nextErrors);
      setFieldErrors(fieldErrors);
      setFormStatus('idle');
      return;
    }

    const payload: ContactData = {
      fullName: result.data.fullName,
      email: result.data.email,
      ...(result.data.phone ? { phone: result.data.phone } : {}),
    };

    patchFormData(payload);
    setFieldErrors({});
    setErrors({});
    setFormStatus('idle');
    setCurrentStep('business');
  }

  const privacyId = `${formId}-privacy`;

  return (
    <form
      className="space-y-6"
      noValidate
      aria-describedby={privacyId}
      onSubmit={handleContinue}
    >
      <div className="space-y-5 rounded-xl border border-cdf-border/80 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-6">
        <FormField
          id="fullName"
          name="fullName"
          label={messages.fields.fullName}
          type="text"
          value={values.fullName}
          placeholder={messages.contactStep.fullNamePlaceholder}
          error={errors.fullName}
          required
          requiredLabel={messages.common.required}
          autoComplete="name"
          inputMode="text"
          onChange={(event) => updateField('fullName', event.target.value)}
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
          requiredLabel={messages.common.required}
          autoComplete="email"
          inputMode="email"
          onChange={(event) => updateField('email', event.target.value)}
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
          optionalLabel={messages.common.optional}
          autoComplete="tel"
          inputMode="tel"
          onChange={(event) => updateField('phone', event.target.value)}
        />

        <p
          id={privacyId}
          className="border-t border-cdf-border/60 pt-4 text-xs leading-relaxed text-cdf-muted"
        >
          {messages.contactStep.privacyNote}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="inline-flex min-h-11 min-w-36 items-center justify-center rounded-md bg-cdf-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cdf-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cdf-accent disabled:opacity-60"
          disabled={form.status === 'validating'}
        >
          {messages.common.continue}
        </button>
      </div>
    </form>
  );
}
