-- Prints (capturas) del Sistema Interno guardados por placa.
create table if not exists public.interno_prints (
  id uuid primary key default gen_random_uuid(),
  modulo text not null check (modulo in ('ventas','pagos')),
  placa text not null,
  path text not null,
  nombre text not null default '',
  nota text not null default '',
  mime text not null default 'image/png',
  orden integer not null default 0,
  created_by text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists interno_prints_placa_idx on public.interno_prints(modulo, placa, orden);
alter table public.interno_prints enable row level security;
revoke all on public.interno_prints from anon, authenticated;
