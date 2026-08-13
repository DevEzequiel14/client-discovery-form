import type { Locale } from '@i18n/locales';
import type { BusinessData, ContactData } from '../types/form';

export type SaveDiscoveryLeadPayload = {
  locale: Locale;
  leadId: string;
  data: ContactData & BusinessData;
};

export type SaveDiscoveryLeadResult =
  | { ok: true; leadId: string }
  | { ok: false; error: string };

export async function saveDiscoveryLead(
  payload: SaveDiscoveryLeadPayload,
): Promise<SaveDiscoveryLeadResult> {
  try {
    const response = await fetch('/api/discovery/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    const body = (await response.json()) as {
      leadId?: string;
      error?: string;
    };

    if (!response.ok || !body.leadId) {
      return {
        ok: false,
        error: body.error ?? 'Lead save failed',
      };
    }

    return {
      ok: true,
      leadId: body.leadId,
    };
  } catch {
    return {
      ok: false,
      error: 'Network error',
    };
  }
}
