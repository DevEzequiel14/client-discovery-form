-- Partial leads captured when the identity step is completed.
-- Run in the Supabase SQL Editor if the table does not exist yet.

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
