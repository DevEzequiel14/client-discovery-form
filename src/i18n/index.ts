import { en } from './messages/en';
import { es } from './messages/es';
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  LOCALES,
} from './locales';
import type { Messages } from './types';

const catalogs: Record<Locale, Messages> = {
  es,
  en,
};

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

export function resolveLocale(value: string | undefined): Locale {
  if (value && isLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export function t(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export { DEFAULT_LOCALE, isLocale, LOCALES };
export type { Locale, Messages };
