import { Resend } from 'resend';
import { getMessages, type Locale } from '@i18n/index';
import type { Messages } from '@i18n/types';
import { err, ok, type Result } from '@lib/result';
import type { ServerEnv } from '@lib/env';
import { formatDiscoveryFieldValue } from '../lib/format-field-value';
import type { DiscoveryFormData } from '../types/form';
import { ASSET_KEYS } from '../types/steps';

export type SendDiscoveryNotificationInput = {
  submissionId: string;
  locale: Locale;
  data: DiscoveryFormData;
};

type FieldKey = keyof Messages['fields'];

const summaryFields: FieldKey[] = [
  'fullName',
  'email',
  'phone',
  'company',
  'industry',
  'hasWebsite',
  'website',
  'goals',
  'projectType',
  'expectedOutcome',
  ...ASSET_KEYS,
  'needsContentHelp',
  'designStyle',
  'designStyleNote',
  'hasReferences',
  'referenceUrls',
  'designTaste',
  'infraStatus',
  'domainName',
  'corporateEmailStatus',
  'siteMaintenance',
  'timeline',
  'investmentRange',
  'additionalNotes',
];

export async function sendDiscoveryNotification(
  env: ServerEnv,
  input: SendDiscoveryNotificationInput,
): Promise<Result<{ ownerEmailId: string; clientEmailId?: string }, string>> {
  if (!env.RESEND_API_KEY || !env.DISCOVERY_NOTIFY_EMAIL) {
    return err('Email is not configured');
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const ownerMessages = getMessages('es');
  const clientMessages = getMessages(input.locale);
  const { data, submissionId } = input;

  const ownerHtml = buildOwnerEmailHtml({
    messages: ownerMessages,
    data,
    submissionId,
    locale: input.locale,
  });

  const ownerText = buildOwnerEmailText({
    messages: ownerMessages,
    data,
    submissionId,
    locale: input.locale,
  });

  const ownerResult = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.DISCOVERY_NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `[Discovery] ${data.fullName} · ${data.company} · ${formatDiscoveryFieldValue('projectType', data.projectType, ownerMessages)}`,
    html: ownerHtml,
    text: ownerText,
  });

  if (ownerResult.error) {
    console.error('[discovery.email.owner]', ownerResult.error.message);
    return err(ownerResult.error.message);
  }

  const clientResult = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: data.email,
    subject:
      input.locale === 'en'
        ? `We received your project · Ref ${submissionId.slice(0, 8)}`
        : `Recibimos tu proyecto · Ref ${submissionId.slice(0, 8)}`,
    html: buildClientAckHtml({
      messages: clientMessages,
      fullName: data.fullName,
      submissionId,
      locale: input.locale,
    }),
    text: buildClientAckText({
      fullName: data.fullName,
      submissionId,
      locale: input.locale,
    }),
  });

  if (clientResult.error) {
    // Owner mail already sent; log but don't fail the whole notification.
    console.error('[discovery.email.client]', clientResult.error.message);
  }

  return ok({
    ownerEmailId: ownerResult.data?.id ?? '',
    clientEmailId: clientResult.data?.id,
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function rowsForEmail(
  messages: Messages,
  data: DiscoveryFormData,
): Array<{ label: string; value: string }> {
  return summaryFields
    .map((key) => {
      const raw = data[key as keyof DiscoveryFormData];
      if (raw === undefined || raw === null || raw === '') return null;
      return {
        label: messages.fields[key],
        value: formatDiscoveryFieldValue(key, String(raw), messages),
      };
    })
    .filter((row): row is { label: string; value: string } => Boolean(row));
}

function buildOwnerEmailHtml(opts: {
  messages: Messages;
  data: DiscoveryFormData;
  submissionId: string;
  locale: Locale;
}): string {
  const rows = rowsForEmail(opts.messages, opts.data)
    .map(
      (row) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;vertical-align:top;width:180px;">${escapeHtml(row.label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap;">${escapeHtml(row.value)}</td>
      </tr>`,
    )
    .join('');

  return `
    <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;color:#111827;">
      <h1 style="font-size:22px;margin:0 0 8px;">Nueva solicitud de discovery</h1>
      <p style="margin:0 0 16px;color:#6b7280;">
        Ref: <strong>${escapeHtml(opts.submissionId)}</strong> · Idioma: ${opts.locale}
      </p>
      <table style="width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">
        ${rows}
      </table>
    </div>
  `;
}

function buildOwnerEmailText(opts: {
  messages: Messages;
  data: DiscoveryFormData;
  submissionId: string;
  locale: Locale;
}): string {
  const lines = rowsForEmail(opts.messages, opts.data).map(
    (row) => `${row.label}: ${row.value}`,
  );
  return [
    'Nueva solicitud de discovery',
    `Ref: ${opts.submissionId}`,
    `Idioma: ${opts.locale}`,
    '',
    ...lines,
  ].join('\n');
}

function buildClientAckHtml(opts: {
  messages: Messages;
  fullName: string;
  submissionId: string;
  locale: Locale;
}): string {
  const isEn = opts.locale === 'en';
  const greeting = isEn
    ? `Hi ${opts.fullName},`
    : `Hola ${opts.fullName},`;
  const body = isEn
    ? 'We received your project details. We will review them and get back to you with next steps.'
    : 'Recibimos los detalles de tu proyecto. Los vamos a revisar y te escribimos con los próximos pasos.';
  const ref = isEn
    ? `Your reference number: ${opts.submissionId}`
    : `Tu número de referencia: ${opts.submissionId}`;

  return `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#111827;">
      <p>${escapeHtml(greeting)}</p>
      <p>${escapeHtml(body)}</p>
      <p style="color:#6b7280;">${escapeHtml(ref)}</p>
      <p>${escapeHtml(opts.messages.thanks.ctaSupporting)}</p>
    </div>
  `;
}

function buildClientAckText(opts: {
  fullName: string;
  submissionId: string;
  locale: Locale;
}): string {
  if (opts.locale === 'en') {
    return [
      `Hi ${opts.fullName},`,
      '',
      'We received your project details. We will review them and get back to you with next steps.',
      `Your reference number: ${opts.submissionId}`,
    ].join('\n');
  }

  return [
    `Hola ${opts.fullName},`,
    '',
    'Recibimos los detalles de tu proyecto. Los vamos a revisar y te escribimos con los próximos pasos.',
    `Tu número de referencia: ${opts.submissionId}`,
  ].join('\n');
}
