# 🏥 SaúdeFoz

PWA informativa de salud pública (SUS) para inmigrantes en Foz do Iguaçu.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Supabase · next-intl · PWA

**Idiomas:** Español · Português · English · Français · Avañe'ẽ (Guaraní)

## Setup rápido

```bash
# 1. Instalar dependencias
pnpm install   # o npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# edita .env.local con tus credenciales de Supabase

# 3. Crear tablas en Supabase
# Pega el contenido de supabase/migrations/0001_init.sql en el SQL Editor de Supabase,
# y luego 0002_seed_ubs_foz.sql para cargar las UBS reales de Foz (⚠️ verificar datos)

# 4. Correr en desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) — te redirige a `/es`.

## Estructura

- `src/app/[locale]/` — rutas i18n (es, pt, en, fr, gn)
- `src/lib/sections.ts` — catálogo único de las 15 secciones de salud
- `src/lib/scraper/` — worker que scrapea gov.br semanalmente
- `src/messages/` — traducciones (copia `es.json` a los demás y traduce)
- `supabase/migrations/` — schema SQL

## Scraping

El worker scrapea fuentes oficiales de gov.br y cachea el contenido en Supabase.
Se ejecuta via Vercel Cron todos los lunes 4AM UTC.

Para probarlo localmente:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/scrape
```

## Deploy

1. Push a GitHub
2. Importar el repo en Vercel
3. Configurar las env vars
4. Deploy — el cron se activa automáticamente con `vercel.json`

## ⚠️ Importante

- La web es **informativa**, no sustituye atención médica.
- El disclaimer debe mantenerse visible en todas las páginas.
- Respeta el scraping: User-Agent identificable, máximo 3 req/s, cache de 7 días.

## TODO antes del launch

- [x] Cargar las ~25 UBS reales de Foz en Supabase — seed en `supabase/migrations/0002_seed_ubs_foz.sql` (26 UBS; ⚠️ **verificar direcciones/teléfonos con la Secretaria Municipal de Saúde antes del launch**, y activar flags has_dentist/pediatra/ginecología por unidad)
- [ ] Traducir `pt.json`, `en.json`, `fr.json`, `gn.json` (guaraní: contactar Letras UNILA)
- [ ] Generar iconos PWA en `/public/icons/`
- [ ] Revisión legal del disclaimer
- [ ] Analytics (Umami o Plausible, respetando privacidad)
