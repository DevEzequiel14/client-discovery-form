import type { Locale } from '@i18n/locales';
import { err, ok, type Result } from '@lib/result';
import { getSupabaseAdmin } from '@lib/supabase';
import type { ServerEnv } from '@lib/env';
import type { BusinessData, ContactData } from '../types/form';

export type PersistDiscoveryLeadInput = {
  leadId: string;
  locale: Locale;
  data: ContactData & BusinessData;
};

export type PersistDiscoveryLeadValue = {
  id: string;
  created: boolean;
};

export async function persistDiscoveryLead(
  env: ServerEnv,
  input: PersistDiscoveryLeadInput,
): Promise<Result<PersistDiscoveryLeadValue, string>> {
  const supabase = getSupabaseAdmin(env);
  const { data } = input;

  const row = {
    lead_id: input.leadId,
    locale: input.locale,
    full_name: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company,
    industry: data.industry,
    has_website: data.hasWebsite,
    website: data.website ?? null,
    payload: data,
    updated_at: new Date().toISOString(),
  };

  const existing = await supabase
    .from('discovery_leads')
    .select('id')
    .eq('lead_id', input.leadId)
    .maybeSingle();

  if (existing.error) {
    console.error('[discovery.lead.lookup]', existing.error.message);
    return err(existing.error.message);
  }

  if (existing.data) {
    const updated = await supabase
      .from('discovery_leads')
      .update(row)
      .eq('lead_id', input.leadId)
      .select('id')
      .single();

    if (updated.error) {
      console.error('[discovery.lead.update]', updated.error.message);
      return err(updated.error.message);
    }

    return ok({ id: updated.data.id as string, created: false });
  }

  const inserted = await supabase
    .from('discovery_leads')
    .insert(row)
    .select('id')
    .single();

  if (inserted.error) {
    console.error('[discovery.lead.insert]', inserted.error.message);
    return err(inserted.error.message);
  }

  return ok({ id: inserted.data.id as string, created: true });
}
