-- SaúdeFoz — schema inicial
-- Ejecutar en Supabase SQL Editor

-- UBS (Unidades Básicas de Salud) de Foz do Iguaçu
create table if not exists public.ubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  neighborhood text not null,
  address text not null,
  phone text,
  hours text,
  services text[] default '{}',
  latitude double precision,
  longitude double precision,
  has_dentist boolean default false,
  has_pediatrician boolean default false,
  has_gynecologist boolean default false,
  accepts_without_cpf boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_ubs_neighborhood on public.ubs (neighborhood);

-- Contenido scrapeado con cache
create table if not exists public.scraped_content (
  id uuid primary key default gen_random_uuid(),
  section_slug text not null,
  source_url text not null,
  title text,
  summary text,
  full_html text,
  locale text default 'pt',
  last_scraped_at timestamptz default now(),
  scrape_status text default 'ok',
  unique (source_url, locale)
);

create index if not exists idx_scraped_section on public.scraped_content (section_slug);

-- Traducciones del contenido scrapeado
create table if not exists public.scraped_content_translations (
  content_id uuid references public.scraped_content(id) on delete cascade,
  locale text not null,
  title text,
  summary text,
  created_at timestamptz default now(),
  primary key (content_id, locale)
);

-- Row Level Security: lectura pública, escritura solo service_role
alter table public.ubs enable row level security;
alter table public.scraped_content enable row level security;
alter table public.scraped_content_translations enable row level security;

drop policy if exists "public read ubs" on public.ubs;
create policy "public read ubs" on public.ubs for select using (true);

drop policy if exists "public read content" on public.scraped_content;
create policy "public read content" on public.scraped_content for select using (true);

drop policy if exists "public read translations" on public.scraped_content_translations;
create policy "public read translations" on public.scraped_content_translations for select using (true);

-- Seed de ejemplo (reemplazar con datos reales de la Prefeitura)
insert into public.ubs (name, neighborhood, address, phone, hours, services, has_dentist, has_pediatrician) values
  ('UBS Porto Belo', 'Porto Belo', 'Rua Exemplo, 123', '(45) 3521-0000', 'Lun-Vie 7h-17h', ARRAY['clínica geral','vacinação','pré-natal'], true, true),
  ('UBS Três Lagoas', 'Três Lagoas', 'Av. Exemplo, 456', '(45) 3521-0001', 'Lun-Vie 7h-17h', ARRAY['clínica geral','saúde mental'], false, true),
  ('UBS Jardim São Paulo', 'Jardim São Paulo', 'Rua Exemplo, 789', '(45) 3521-0002', 'Lun-Vie 7h-17h', ARRAY['clínica geral','vacinação'], true, false)
on conflict do nothing;
