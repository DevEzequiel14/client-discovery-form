-- Run in Supabase SQL Editor if discovery_submissions was created before the
-- technical-step simplification (infra_status / site_maintenance).
-- Fixes: Could not find the 'infra_status' column of 'discovery_submissions'

alter table public.discovery_submissions
  add column if not exists infra_status text not null default 'unsure';

alter table public.discovery_submissions
  add column if not exists site_maintenance text not null default 'undecided';

-- Design-step columns (safe if already applied)
alter table public.discovery_submissions
  add column if not exists has_references text not null default 'no';

alter table public.discovery_submissions
  add column if not exists design_style_note text;

alter table public.discovery_submissions
  alter column reference_urls set default '';

alter table public.discovery_submissions
  alter column design_taste set default '';

-- Legacy technical columns replaced by infra_status / site_maintenance.
-- Drop so inserts no longer require the old NOT NULL fields.
alter table public.discovery_submissions drop column if exists domain_status;
alter table public.discovery_submissions drop column if exists hosting_status;
alter table public.discovery_submissions drop column if exists site_admin;
alter table public.discovery_submissions drop column if exists site_updates;
