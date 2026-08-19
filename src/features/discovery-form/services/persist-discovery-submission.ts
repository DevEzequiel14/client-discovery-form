import type { Locale } from '@i18n/locales';
import { err, ok, type Result } from '@lib/result';
import { getSupabaseAdmin } from '@lib/supabase';
import type { ServerEnv } from '@lib/env';
import type { DiscoveryFormData } from '../types/form';

export type PersistDiscoveryInput = {
  submissionId: string;
  locale: Locale;
  data: DiscoveryFormData;
};

export async function persistDiscoverySubmission(
  env: ServerEnv,
  input: PersistDiscoveryInput,
): Promise<Result<{ id: string }, string>> {
  const supabase = getSupabaseAdmin(env);
  const { data } = input;

  const row = {
    submission_id: input.submissionId,
    locale: input.locale,
    full_name: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company,
    industry: data.industry,
    has_website: data.hasWebsite,
    website: data.website ?? null,
    goals: data.goals,
    project_type: data.projectType,
    expected_outcome: data.expectedOutcome ?? '',
    logo: data.logo,
    photos: data.photos,
    texts: data.texts,
    visual_identity: data.visualIdentity,
    // Column kept for existing DBs; form no longer collects a brand manual.
    brand_manual: 'none',
    needs_content_help: data.needsContentHelp,
    design_style: data.designStyle,
    // has_references + design_style_note live in payload; denormalized columns
    // appear in schema.sql (run migrations/20260812_technical_step.sql on existing DBs).
    reference_urls: data.referenceUrls ?? '',
    design_taste: data.designTaste ?? '',
    // Requires infra_status / site_maintenance columns (see migration above).
    infra_status: data.infraStatus,
    domain_name: data.domainName ?? null,
    corporate_email_status: data.corporateEmailStatus,
    site_maintenance: data.siteMaintenance,
    timeline: data.timeline,
    investment_range: data.investmentRange,
    additional_notes: data.additionalNotes ?? null,
    payload: data,
  };

  const { data: inserted, error } = await supabase
    .from('discovery_submissions')
    .insert(row)
    .select('id')
    .single();

  if (error) {
    console.error('[discovery.persist]', error.message);
    return err(error.message);
  }

  return ok({ id: inserted.id as string });
}
