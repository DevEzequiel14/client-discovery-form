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
    expected_outcome: data.expectedOutcome,
    logo: data.logo,
    photos: data.photos,
    texts: data.texts,
    visual_identity: data.visualIdentity,
    brand_manual: data.brandManual,
    needs_content_help: data.needsContentHelp,
    design_style: data.designStyle,
    reference_urls: data.referenceUrls,
    design_taste: data.designTaste,
    domain_status: data.domainStatus,
    domain_name: data.domainName ?? null,
    hosting_status: data.hostingStatus,
    corporate_email_status: data.corporateEmailStatus,
    site_admin: data.siteAdmin,
    site_updates: data.siteUpdates,
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
