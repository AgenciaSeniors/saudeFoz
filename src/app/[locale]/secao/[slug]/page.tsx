import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SECTIONS, getSectionBySlug } from '@/lib/sections';
import { supabaseAdmin } from '@/lib/supabase/server';
import { TranslateButton } from '@/components/TranslateButton';

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600; // 1h

type Translation = {
  locale: string;
  title: string | null;
  summary: string | null;
};

type ContentRow = {
  id: string;
  title: string | null;
  summary: string | null;
  source_url: string;
  last_scraped_at: string;
  scraped_content_translations: Translation[] | null;
};

async function getContent(slug: string): Promise<ContentRow[]> {
  const { data } = await supabaseAdmin
    .from('scraped_content')
    .select(
      `
      id,
      title,
      summary,
      source_url,
      last_scraped_at,
      scraped_content_translations ( locale, title, summary )
    `
    )
    .eq('section_slug', slug)
    .eq('locale', 'pt')
    .order('last_scraped_at', { ascending: false });
  return (data as ContentRow[] | null) ?? [];
}

/**
 * Given a content row and the user's locale, returns the best available
 * title/summary: the cached translation if it exists, otherwise the PT original.
 */
function resolveContent(row: ContentRow, locale: string) {
  if (locale === 'pt') {
    return {
      title: row.title,
      summary: row.summary,
      translated: false,
    };
  }

  const translation = row.scraped_content_translations?.find(
    (t) => t.locale === locale
  );

  if (translation?.title && translation?.summary) {
    return {
      title: translation.title,
      summary: translation.summary,
      translated: true,
    };
  }

  return {
    title: row.title,
    summary: row.summary,
    translated: false,
  };
}

export default async function SectionPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const section = getSectionBySlug(params.slug);
  if (!section) notFound();

  const contents = await getContent(params.slug);

  return (
    <SectionPageClient
      section={section}
      contents={contents}
      locale={params.locale}
    />
  );
}

function SectionPageClient({
  section,
  contents,
  locale,
}: {
  section: ReturnType<typeof getSectionBySlug>;
  contents: ContentRow[];
  locale: string;
}) {
  const t = useTranslations();
  if (!section) return null;

  // Show the "content is in PT" notice only if user's locale is not PT
  // AND at least one article doesn't have a cached translation
  const hasUntranslated =
    locale !== 'pt' &&
    contents.some((c) => !resolveContent(c, locale).translated);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-sus-primary font-medium mb-6 hover:underline"
      >
        <ArrowLeft size={18} />
        {t('nav.home')}
      </Link>

      <header className={`rounded-2xl border-2 p-6 mb-6 ${section.color}`}>
        <h1 className="text-3xl font-bold mb-2">
          {t(`sections.${section.slug}.title`)}
        </h1>
        <p className="text-lg">{t(`sections.${section.slug}.description`)}</p>
      </header>

      {hasUntranslated && contents.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-900 text-sm">
          <p className="font-medium mb-1">🌐 {t('section.ptNoticeTitle')}</p>
          <p>{t('section.ptNoticeBody')}</p>
        </div>
      )}

      {contents.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
          <p className="font-medium mb-2">{t('section.noContent')}</p>
          <p className="text-sm">{t('section.useOfficialLinks')}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {contents.map((content) => {
            const resolved = resolveContent(content, locale);
            return (
              <article
                key={content.id}
                className="bg-white rounded-lg border border-gray-200 p-5"
              >
                {resolved.title && (
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {resolved.title}
                  </h2>
                )}
                {resolved.summary && (
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line mb-4">
                    {resolved.summary}
                  </div>
                )}

                {resolved.translated && (
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <Sparkles size={12} aria-hidden />
                    {t('section.aiTranslated')}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 items-center">
                  {!resolved.translated && resolved.summary && (
                    <TranslateButton
                      text={`${resolved.title ?? ''}\n\n${resolved.summary}`}
                      targetLocale={locale}
                    />
                  )}
                  <a
                    href={content.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sus-primary font-medium hover:underline"
                  >
                    {t('section.readOfficial')}
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <section className="mt-10 bg-gray-50 rounded-lg p-5">
        <h3 className="font-bold text-gray-900 mb-2">
          {t('section.officialSources')}
        </h3>
        <ul className="space-y-2">
          {section.officialUrls.map((url) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sus-primary hover:underline break-all text-sm"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}