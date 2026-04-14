import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SECTIONS, getSectionBySlug } from '@/lib/sections';
import { supabaseAdmin } from '@/lib/supabase/server';
import { TranslateButton } from '@/components/TranslateButton';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export const revalidate = 3600;

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

function resolveContent(row: ContentRow, locale: string) {
  if (locale === 'pt') {
    return { title: row.title, summary: row.summary, translated: false };
  }

  const translation = row.scraped_content_translations?.find(
    (t) => t.locale === locale
  );

  if (translation?.title && translation?.summary) {
    return { title: translation.title, summary: translation.summary, translated: true };
  }

  return { title: row.title, summary: row.summary, translated: false };
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

  const Icon = (Icons[section.icon as keyof typeof Icons] ??
    Icons.Circle) as React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;

  const hasUntranslated =
    locale !== 'pt' &&
    contents.some((c) => !resolveContent(c, locale).translated);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-brand-muted mb-8">
        <Link
          href={`/${locale}`}
          className="hover:text-brand-primary transition-colors"
        >
          {t('nav.home')}
        </Link>
        <ChevronRight size={14} aria-hidden />
        <span className="text-slate-900 font-medium">
          {t(`sections.${section.slug}.title`)}
        </span>
      </nav>

      {/* Section header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              section.iconBg,
              section.textColor
            )}
          >
            <Icon size={24} aria-hidden />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {t(`sections.${section.slug}.title`)}
            </h1>
          </div>
        </div>
        <p className="text-brand-muted text-lg leading-relaxed max-w-2xl">
          {t(`sections.${section.slug}.description`)}
        </p>
      </header>

      {hasUntranslated && contents.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-6 text-sky-900 text-sm">
          <p className="font-semibold mb-0.5">{t('section.ptNoticeTitle')}</p>
          <p className="text-sky-700">{t('section.ptNoticeBody')}</p>
        </div>
      )}

      {contents.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-900">
          <p className="font-semibold mb-2">{t('section.noContent')}</p>
          <p className="text-sm text-amber-700">{t('section.useOfficialLinks')}</p>
        </div>
      ) : (
        <div className="space-y-5">
          {contents.map((content) => {
            const resolved = resolveContent(content, locale);
            return (
              <article
                key={content.id}
                className={cn(
                  'bg-white rounded-xl border border-slate-200/80 border-l-4 p-6',
                  'shadow-card',
                  section.accentColor
                )}
              >
                {resolved.title && (
                  <h2 className="font-semibold text-xl text-slate-900 mb-3 leading-snug">
                    {resolved.title}
                  </h2>
                )}
                {resolved.summary && (
                  <div className="prose prose-sm max-w-none text-slate-600 whitespace-pre-line mb-4 leading-relaxed">
                    {resolved.summary}
                  </div>
                )}

                {resolved.translated && (
                  <p className="text-xs text-brand-muted mb-3 flex items-center gap-1.5 bg-teal-50 text-teal-700 rounded-full px-3 py-1 w-fit">
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
                    className="inline-flex items-center gap-2 text-brand-primary font-medium text-sm hover:underline"
                  >
                    {t('section.readOfficial')}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Official sources */}
      <section className="mt-12 bg-white rounded-xl border border-slate-200/80 p-6 shadow-card">
        <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
          {t('section.officialSources')}
        </h3>
        <ul className="space-y-2">
          {section.officialUrls.map((url) => (
            <li key={url}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline break-all text-sm"
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
