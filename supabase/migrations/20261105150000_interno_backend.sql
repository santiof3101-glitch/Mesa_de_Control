-- Servidor del Sistema Interno en Supabase (reemplaza Google Sheets/Apps Script).
create table if not exists public.interno_usuarios (
  username text primary key,
  display_name text not null default '',
  password_hash text not null default '',
  is_admin boolean not null default false,
  is_active boolean not null default true,
  must_change boolean not null default true,
  session_token text,
  session_expires_at timestamptz,
  created_at timestamptz not null default now()
);
create unique index if not exists interno_usuarios_token_idx on public.interno_usuarios(session_token) where session_token is not null;
create table if not exists public.interno_registros (
  modulo text not null check (modulo in ('liquidacion','pago','venta','contrato','firma_sp')),
  placa text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (modulo, placa)
);
create table if not exists public.interno_glosario (
  term text primary key,
  description text not null,
  updated_by text,
  updated_at timestamptz not null default now()
);
alter table public.interno_usuarios enable row level security;
alter table public.interno_registros enable row level security;
alter table public.interno_glosario enable row level security;
revoke all on public.interno_usuarios, public.interno_registros, public.interno_glosario from anon, authenticated;
insert into storage.buckets (id, name, public) values ('interno-expedientes','interno-expedientes', false) on conflict (id) do nothing;
