type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

/**
 * Thin analytics wrapper. No-op until a provider is wired.
 */
export function trackEvent(
  name: string,
  payload: AnalyticsPayload = {},
): void {
  if (import.meta.env.DEV) {
    console.info('[analytics]', name, payload);
  }
}
