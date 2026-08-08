import type { APIRoute } from 'astro';
import { flattenError } from 'zod';
import { getMessages, isLocale, type Locale } from '../../../i18n';
import { createDiscoveryFormSchema } from '../../../features/discovery-form/schemas';
import { persistDiscoverySubmission } from '../../../features/discovery-form/services/persist-discovery-submission';
import { sendDiscoveryNotification } from '../../../features/discovery-form/services/send-discovery-notification';
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
  const supabaseReady = hasSupabaseConfigured(env);
  const emailReady = hasEmailConfigured(env);

  if (supabaseReady) {
    const persisted = await persistDiscoverySubmission(env, {
      submissionId,
      locale,
      data: parsed.data,
    });

    if (!persisted.ok) {
      return json(
        {
          error: 'Failed to persist submission',
          details: persisted.error,
        },
        500,
      );
    }
  }

  if (emailReady) {
    const notified = await sendDiscoveryNotification(env, {
      submissionId,
      locale,
      data: parsed.data,
    });

    if (!notified.ok) {
      // If we already saved to Supabase, keep the submission successful.
      if (supabaseReady) {
        console.error(
          '[discovery.submit] email failed after persist',
          notified.error,
        );
      } else {
        return json(
          {
            error: 'Failed to send notification email',
            details: notified.error,
          },
          500,
        );
      }
    }
  }

  if (!supabaseReady && !emailReady) {
    console.warn(
      '[discovery.submit] accepted without Supabase/Resend credentials',
      { submissionId, email: parsed.data.email },
    );
  }

  console.info('[discovery.submit]', {
    submissionId,
    locale,
    email: parsed.data.email,
    projectType: parsed.data.projectType,
    persisted: supabaseReady,
    emailed: emailReady,
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
