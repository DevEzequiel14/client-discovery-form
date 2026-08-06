import type { APIRoute } from 'astro';
import { flattenError } from 'zod';
import { getMessages, isLocale, type Locale } from '../../../i18n';
import { createDiscoveryFormSchema } from '../../../features/discovery-form/schemas';
import {
  getServerEnv,
  hasEmailConfigured,
  hasSupabaseConfigured,
} from '../../../lib/env';

export const prerender = false;

type SubmitBody = {
  locale?: string;
  data?: unknown;
};

export const POST: APIRoute = async ({ request }) => {
  let body: SubmitBody;

  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const locale: Locale = isLocale(body.locale ?? '')
    ? (body.locale as Locale)
    : 'es';
  const messages = getMessages(locale);
  const schema = createDiscoveryFormSchema(messages.validation);
  const parsed = schema.safeParse(body.data);

  if (!parsed.success) {
    return json(
      {
        error: 'Validation failed',
        fieldErrors: flattenError(parsed.error).fieldErrors,
      },
      400,
    );
  }

  const submissionId = crypto.randomUUID();
  const env = getServerEnv();

  // Persistence + email integrations are wired here when credentials exist.
  // Until then, accept valid payloads so the wizard flow can be developed end-to-end.
  if (hasSupabaseConfigured(env)) {
    // TODO: insert into discovery_submissions with service role client
  }

  if (hasEmailConfigured(env)) {
    // TODO: send notification + optional client acknowledgement via Resend
  }

  console.info('[discovery.submit]', {
    submissionId,
    locale,
    email: parsed.data.email,
    projectType: parsed.data.projectType,
  });

  return json({ submissionId }, 201);
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
