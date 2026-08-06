import type { DiscoveryFormData } from '../types/form';
import type { Locale } from '@i18n/locales';

export type SubmitDiscoverySuccess = {
  ok: true;
  submissionId: string;
};

export type SubmitDiscoveryFailure = {
  ok: false;
  error: string;
};

export type SubmitDiscoveryResult =
  | SubmitDiscoverySuccess
  | SubmitDiscoveryFailure;

export type SubmitDiscoveryPayload = {
  locale: Locale;
  data: DiscoveryFormData;
};

export async function submitDiscoveryForm(
  payload: SubmitDiscoveryPayload,
): Promise<SubmitDiscoveryResult> {
  try {
    const response = await fetch('/api/discovery/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const body = (await response.json()) as {
      submissionId?: string;
      error?: string;
    };

    if (!response.ok || !body.submissionId) {
      return {
        ok: false,
        error: body.error ?? 'Submit failed',
      };
    }

    return {
      ok: true,
      submissionId: body.submissionId,
    };
  } catch {
    return {
      ok: false,
      error: 'Network error',
    };
  }
}
