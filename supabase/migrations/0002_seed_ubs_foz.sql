-- SaúdeFoz — seed de UBS reales de Foz do Iguaçu
-- Ejecutar en el SQL Editor de Supabase DESPUÉS de 0001_init.sql
--
-- ⚠️  VERIFICAR ANTES DEL LAUNCH
-- Datos recopilados de fuentes públicas (Prefeitura pmfi.pr.gov.br, Clickfoz,
-- y agregadores derivados de CNES/DataSUS) en 2026-07. Precisiones:
--   * Direcciones/teléfonos "s/n" o de una sola fuente pueden estar
--     desactualizados. Confirmar con la Secretaria Municipal de Saúde
--     (Central de Atendimento ao Cidadão: 45 2105-1000) antes de publicar.
--   * `phone` guarda solo el número principal (para el enlace tel:); algunas
--     unidades tienen un segundo número de recepción/gerencia.
--   * `services` = baseline ['clínica geral','vacinação'] (universal en UBS),
--     NO verificado por unidad.
--   * has_dentist / has_pediatrician / has_gynecologist quedan en `false` por
--     defecto: NO hay dato confiable por unidad todavía — verificar y activar.
--   * latitude/longitude quedan NULL — geocodificar como paso posterior.
--   * UBS Padre Monti se deja COMENTADA: baja confianza y reportada en
--     proceso de fusión con Ouro Verde. Descomentar solo tras confirmar.

-- Limpiar las 3 filas de ejemplo del seed inicial (direcciones "Rua Exemplo")
delete from public.ubs where address ilike '%exemplo%';

-- Hacer el nombre único para que este seed sea idempotente (re-ejecutable)
create unique index if not exists ubs_name_key on public.ubs (name);

insert into public.ubs (name, neighborhood, address, phone, hours, services) values
  ('UBS Campos do Iguaçu', 'Campos do Iguaçu', 'Rua Paranapanema, 809', '(45) 3525-4031', 'Seg–Sex 7h30–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Morumbi I', 'Parque Morumbi I', 'Av. Mário Filho, s/n', '(45) 2105-8050', 'Seg–Sex 7h–20h', ARRAY['clínica geral','vacinação']),
  ('UBS Morumbi II', 'Parque Morumbi II', 'Rua Eunápio de Queiroz, s/n (esq. Jules Rimet)', '(45) 3901-2262', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Morumbi III', 'Parque Morumbi III', 'Rua Cláudio Coutinho, s/n', '(45) 3578-3553', 'Seg–Sex 7h–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Portal da Foz', 'Portal da Foz', 'Rua Águia, s/n', '(45) 3901-3434', 'Seg–Sex 7h30–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Parque Presidente', 'Parque Presidente I', 'Rua da República, s/n', '(45) 3522-4482', 'Seg–Sex 7h30–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Maracanã', 'Vila Maracanã', 'Av. República Argentina, 2553', '(45) 3901-2266', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Ouro Verde', 'Parque Ouro Verde', 'Rua Níquel, 59', '(45) 3527-1014', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Profilurb I', 'Profilurb I', 'Rua Manguruju, s/n', '(45) 3901-3436', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Profilurb II', 'Profilurb II', 'Rua Boto, s/n', '(45) 3527-1159', 'Seg–Sex 7h–20h', ARRAY['clínica geral','vacinação']),
  ('UBS Itaipu C / Vila C Velha', 'Vila C (Cidade Nova)', 'Rua A, s/n', '(45) 3901-3416', 'Seg–Sex 7h30–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Itaipu C / Vila C Nova', 'Vila C (Cidade Nova)', 'Rua O, s/n', '(45) 3901-3417', 'Seg–Sex 7h30–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Porto Belo', 'Jardim Irmã (Porto Belo)', 'Av. Zacarias Vitalino da Silva, s/n', '(45) 3901-3414', 'Seg–Sex 7h30–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Três Lagoas', 'Três Lagoas', 'Rua Camorim, 700', '(45) 3577-2825', 'Seg–Sex 8h–18h', ARRAY['clínica geral','vacinação']),
  ('UBS CAIC Porto Meira', 'Porto Meira (Jardim Elisa)', 'Av. Javier Koelbel, s/n – Jardim Elisa I', '(45) 3901-3438', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Cidade Nova', 'Cidade Nova', 'Rua Angelin Favassa, s/n', '(45) 3901-3412', 'Seg–Sex 7h30–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Jardim São Paulo I', 'Jardim São Paulo', 'Av. Monsenhor Guilherme, s/n', NULL, 'Seg–Sex 7h–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Jardim São Paulo II', 'Jardim São Paulo', 'Rua Jorge Sanways, s/n', '(45) 3525-6154', 'Seg–Sex 7h–11h30 e 13h–17h', ARRAY['clínica geral','vacinação']),
  ('UBS Vila Yolanda', 'Vila Yolanda', 'Rua Vereador Moacir Pereira, 900', '(45) 3521-9750', 'Seg–Sex 7h–19h', ARRAY['clínica geral','vacinação']),
  ('UBS Jardim Jupira', 'Jardim Jupira', 'Rua Gonçalves Ledo, s/n', '(45) 3901-3330', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Jardim Curitibano (Lancaster I)', 'Jardim Curitibano / Lancaster I', 'Av. Silvio Américo Sasdelli, s/n', '(45) 3524-3895', NULL, ARRAY['clínica geral','vacinação']),
  ('Núcleo de Saúde AKLP', 'Jardim das Laranjeiras', 'Rua Belo Horizonte, 100', '(45) 3524-3756', NULL, ARRAY['clínica geral','vacinação']),
  ('Núcleo de Saúde São João', 'Conjunto Libra / São João', 'Rua Mirim, s/n (esq. Av. Gramado)', '(45) 2105-9753', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Jardim América', 'Jardim América', 'Rua das Guianas, 12', '(45) 3901-3444', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Vila Adriana', 'Vila Adriana', 'Alameda Campânulas, s/n', '(45) 3529-7597', NULL, ARRAY['clínica geral','vacinação']),
  ('UBS Vila Carimã', 'Vila Carimã', 'Rua Atalaia, s/n (ao lado do Colégio Augusto Wermer)', '(45) 3529-6567', NULL, ARRAY['clínica geral','vacinação'])
on conflict (name) do nothing;

-- UBS Padre Monti — baja confianza / en proceso de fusión con Ouro Verde.
-- Descomentar solo tras confirmar con la Secretaria Municipal de Saúde:
-- insert into public.ubs (name, neighborhood, address, phone, services) values
--   ('UBS Padre Monti', 'Vila Padre Monti / Jardim das Flores', 'Av. Morenitas, 2047', '(45) 3529-7497', ARRAY['clínica geral','vacinação'])
-- on conflict (name) do nothing;
