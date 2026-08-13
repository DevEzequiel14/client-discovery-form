import { Resend } from 'resend';
import { getMessages, type Locale } from '@i18n/index';
import { err, ok, type Result } from '@lib/result';
import type { ServerEnv } from '@lib/env';
import { formatDiscoveryFieldValue } from '../lib/format-field-value';
import type { BusinessData, ContactData } from '../types/form';

export type SendLeadStartedInput = {
  leadId: string;
  locale: Locale;
  data: ContactData & BusinessData;
};

export async function sendLeadStartedNotification(
  env: ServerEnv,
  input: SendLeadStartedInput,
): Promise<Result<{ emailId: string }, string>> {
  if (!env.RESEND_API_KEY || !env.DISCOVERY_NOTIFY_EMAIL) {
    return err('Email is not configured');
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const messages = getMessages('es');
  const { data, leadId, locale } = input;

  const lines = [
    `Nombre: ${data.fullName}`,
    `Email: ${data.email}`,
    data.phone ? `Teléfono: ${data.phone}` : null,
    `Negocio: ${data.company}`,
    `Industria: ${formatDiscoveryFieldValue('industry', data.industry, messages)}`,
    `Sitio: ${data.hasWebsite === 'yes' ? (data.website ?? 'sí') : 'no'}`,
  ].filter((line): line is string => Boolean(line));

  const result = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.DISCOVERY_NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `[Lead] ${data.fullName} · ${data.company} empezó el formulario`,
    text: [
      'Nuevo lead: completó el primer paso y puede no haber enviado el formulario.',
      `Lead: ${leadId}`,
      `Idioma: ${locale}`,
      '',
      ...lines,
    ].join('\n'),
  });

  if (result.error) {
    console.error('[discovery.lead.email]', result.error.message);
    return err(result.error.message);
  }

  return ok({ emailId: result.data?.id ?? '' });
}
