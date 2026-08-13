import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getMessages, isLocale, type Locale } from '../../../i18n';
import { createIdentitySchema } from '../../../features/discovery-form/schemas';
import { persistDiscoveryLead } from '../../../features/discovery-form/services/persist-discovery-lead';
import { sendLeadStartedNotification } from '../../../features/discovery-form/services/send-lead-started-notification';
import {
  getServerEnv,
  hasEmailConfigured,
  hasSupabaseConfigured,
} from '../../../lib/env';

export const prerender = false;

const bodySchema = z.object({
  locale: z.string().optional(),
  leadId: z.uuid(),
  data: z.unknown(),
});

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const parsedBody = bodySchema.safeParse(raw);
  if (!parsedBody.success) {
    return json({ error: 'Invalid lead payload' }, 400);
  }

  const locale: Locale = isLocale(parsedBody.data.locale ?? '')
    ? (parsedBody.data.locale as Locale)
    : 'es';
  const messages = getMessages(locale);
  const parsed = createIdentitySchema(messages.validation).safeParse(
    parsedBody.data.data,
  );

  if (!parsed.success) {
    return json({ error: 'Validation failed' }, 400);
  }

  const leadId = parsedBody.data.leadId;
  const env = getServerEnv();
  const supabaseReady = hasSupabaseConfigured(env);
  const emailReady = hasEmailConfigured(env);
  let created = true;

  if (supabaseReady) {
    const persisted = await persistDiscoveryLead(env, {
      leadId,
      locale,
      data: parsed.data,
    });

    if (!persisted.ok) {
      return json(
        {
          error: 'Failed to persist lead',
          details: persisted.error,
        },
        500,
      );
    }

    created = persisted.value.created;
  }

  if (emailReady && created) {
    const notified = await sendLeadStartedNotification(env, {
      leadId,
      locale,
      data: parsed.data,
    });

    if (!notified.ok && !supabaseReady) {
      return json(
        {
          error: 'Failed to send lead notification',
          details: notified.error,
        },
        500,
      );
    }

    if (!notified.ok) {
      console.error('[discovery.lead] email failed after persist', notified.error);
    }
  }

  if (!supabaseReady && !emailReady) {
    console.warn('[discovery.lead] accepted without Supabase/Resend credentials', {
      leadId,
      email: parsed.data.email,
    });
  }

  return json({ leadId }, created ? 201 : 200);
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
