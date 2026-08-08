import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ServerEnv } from './env';

let cached: SupabaseClient | null = null;

/** Server-only Supabase client (service role). Never import from client components. */
export function getSupabaseAdmin(env: ServerEnv): SupabaseClient {
  if (!env.PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase service role is not configured');
  }

  cached ??= createClient(env.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cached;
}
