import { z } from 'zod';

const optionalString = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? '');

const publicEnvSchema = z.object({
  PUBLIC_SITE_URL: z
    .string()
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      if (!trimmed) return 'http://localhost:4321';
      return z.url().parse(trimmed);
    }),
  PUBLIC_SUPABASE_URL: optionalString,
  PUBLIC_SUPABASE_ANON_KEY: optionalString,
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  RESEND_API_KEY: optionalString,
  RESEND_FROM_EMAIL: z
    .string()
    .optional()
    .transform(
      (value) =>
        value?.trim() || 'Client Discovery <noreply@example.com>',
    ),
  DISCOVERY_NOTIFY_EMAIL: optionalString,
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getPublicEnv(): PublicEnv {
  return publicEnvSchema.parse({
    PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
    PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
    PUBLIC_SUPABASE_URL: import.meta.env.PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: import.meta.env.RESEND_FROM_EMAIL,
    DISCOVERY_NOTIFY_EMAIL: import.meta.env.DISCOVERY_NOTIFY_EMAIL,
  });
}

export function hasEmailConfigured(env: ServerEnv): boolean {
  return Boolean(env.RESEND_API_KEY && env.DISCOVERY_NOTIFY_EMAIL);
}

export function hasSupabaseConfigured(env: ServerEnv): boolean {
  return Boolean(
    env.PUBLIC_SUPABASE_URL &&
      (env.SUPABASE_SERVICE_ROLE_KEY || env.PUBLIC_SUPABASE_ANON_KEY),
  );
}
