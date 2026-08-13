-- Run in Supabase SQL Editor (or via CLI) before enabling persistence.
-- Table for Client Discovery Form submissions.

create extension if not exists "pgcrypto";

create table if not exists public.discovery_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique,
  locale text not null check (locale in ('es', 'en')),
  created_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text,

  company text not null,
  industry text not null,
  has_website text not null,
  website text,

  goals text not null,
  project_type text not null,
  expected_outcome text not null,

  logo text not null,
  photos text not null,
  texts text not null,
  visual_identity text not null,
  -- Legacy column: form no longer asks for a brand manual (inserts 'none').
  brand_manual text not null default 'none',
  needs_content_help text not null,

  design_style text not null,
  has_references text not null,
  reference_urls text not null default '',
  design_taste text not null default '',
  design_style_note text,

  infra_status text not null,
  domain_name text,
  corporate_email_status text not null,
  site_maintenance text not null,

  timeline text not null,
  investment_range text not null,

  additional_notes text,

  payload jsonb not null
);

create index if not exists discovery_submissions_created_at_idx
  on public.discovery_submissions (created_at desc);

create index if not exists discovery_submissions_email_idx
  on public.discovery_submissions (email);

create index if not exists discovery_submissions_project_type_idx
  on public.discovery_submissions (project_type);

create index if not exists discovery_submissions_investment_range_idx
  on public.discovery_submissions (investment_range);

create index if not exists discovery_submissions_industry_idx
  on public.discovery_submissions (industry);

create index if not exists discovery_submissions_timeline_idx
  on public.discovery_submissions (timeline);

alter table public.discovery_submissions enable row level security;

-- No policies for anon/authenticated: inserts go through the service role key
-- from the Astro API route (bypasses RLS).

-- Existing projects: run supabase/migrations/20260812_technical_step.sql
-- in the Supabase SQL Editor (adds infra_status / site_maintenance and drops
-- legacy technical columns). Also covers design-step columns if missing.
-- For early-lead capture, also run supabase/migrations/20260813_discovery_leads.sql.

create table if not exists public.discovery_leads (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique,
  locale text not null check (locale in ('es', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text,
  company text not null,
  industry text not null,
  has_website text not null,
  website text,
  payload jsonb not null
);

create index if not exists discovery_leads_created_at_idx
  on public.discovery_leads (created_at desc);

create index if not exists discovery_leads_email_idx
  on public.discovery_leads (email);

alter table public.discovery_leads enable row level security;
