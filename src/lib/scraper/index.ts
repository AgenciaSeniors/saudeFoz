import * as cheerio from 'cheerio';
import pLimit from 'p-limit';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { SECTIONS } from '@/lib/sections';
import { translateContent } from '@/lib/translator';

const limit = pLimit(3);

/**
 * Extracts the main content paragraphs from a gov.br Plone page.
 * Tries multiple selectors in order, filtering out short boilerplate.
 * Falls back to searching all body paragraphs if none of the common
 * Plone containers have content.
 */
function extractParagraphs($: cheerio.CheerioAPI, maxParagraphs = 4): string[] {
  const contentSelectors = [
    '#parent-fieldname-text',
    '#content-core',
    '.newsItemBody',
    'article .documentDescription',
    'main article',
    'article',
    '#content',
    'main',
  ];

  for (const selector of contentSelectors) {
    const $container = $(selector).first();
    if ($container.length === 0) continue;

    const paragraphs = $container
      .find('p')
      .map((_, p) => $(p).text().trim().replace(/\s+/g, ' '))
      .get()
      .filter((text) => text.length > 50);

    if (paragraphs.length >= 1) {
      return paragraphs.slice(0, maxParagraphs);
    }
  }

  // Last-resort: any substantial <p> anywhere in body
  const fallback = $('body')
    .find('p')
    .map((_, p) => $(p).text().trim().replace(/\s+/g, ' '))
    .get()
    .filter((text) => text.length > 100);

  return fallback.slice(0, maxParagraphs);
}

function extractTitle($: cheerio.CheerioAPI): string {
  const h1InContent = $('#parent-fieldname-title, #content h1, main h1')
    .first()
    .text()
    .trim();
  if (h1InContent) return h1InContent;

  const anyH1 = $('h1').first().text().trim();
  if (anyH1) return anyH1;

  return $('title').text().trim();
}

async function scrapeOne(
  url: string,
  sectionSlug: string,
  supabaseAdmin: SupabaseClient
) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'SaudeFozBot/1.0 (+https://saudefoz.com.br/sobre)',
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = extractTitle($);
    const paragraphs = extractParagraphs($, 4);
    const summary = paragraphs.join('\n\n').slice(0, 1200);

    const $main = $(
      '#parent-fieldname-text, #content-core, main article, article, main'
    ).first();
    const fullHtml = ($main.html() ?? '').slice(0, 20_000);

    if (!summary || summary.length < 100) {
      console.warn(
        `[scraper] Weak content extracted from ${url} (summary length: ${summary.length})`
      );
    }

    const { data: upserted, error: upsertError } = await supabaseAdmin
      .from('scraped_content')
      .upsert(
        {
          section_slug: sectionSlug,
          source_url: url,
          title,
          summary,
          full_html: fullHtml,
          locale: 'pt',
          last_scraped_at: new Date().toISOString(),
          scrape_status: summary.length >= 100 ? 'ok' : 'weak',
        },
        { onConflict: 'source_url,locale' }
      )
      .select('id')
      .single();

    if (upsertError || !upserted) {
      throw new Error(`Upsert failed: ${upsertError?.message}`);
    }

    // Translate to ES, EN, FR only if we have substantial content
    if (title && summary && summary.length >= 100) {
      const translations = await translateContent(title, summary);

     const translationRows = Object.entries(translations)
        .filter(([, t]) => !!t && !!t.title && !!t.summary)
        .map(([locale, t]) => ({
          content_id: upserted.id,
          locale,
          title: t!.title,
          summary: t!.summary,
        }));

      if (translationRows.length > 0) {
        const { error: translationError } = await supabaseAdmin
          .from('scraped_content_translations')
          .upsert(translationRows, { onConflict: 'content_id,locale' });

        if (translationError) {
          console.error(
            `[scraper] Translation upsert failed for ${url}:`,
            translationError.message
          );
        }
      }
    }

    return { url, ok: true as const, summaryLength: summary.length };
  } catch (err) {
    await supabaseAdmin
      .from('scraped_content')
      .update({
        scrape_status: 'error',
        last_scraped_at: new Date().toISOString(),
      })
      .eq('source_url', url);
    return { url, ok: false as const, error: String(err) };
  }
}

export async function runScraper() {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error(
      'Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }

  const jobs = SECTIONS.flatMap((section) =>
    section.officialUrls.map((url) =>
      limit(() => scrapeOne(url, section.slug, supabaseAdmin))
    )
  );
  return Promise.all(jobs);
}