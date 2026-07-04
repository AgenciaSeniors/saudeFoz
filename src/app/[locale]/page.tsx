import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SECTIONS } from '@/lib/sections';
import { SectionCard } from '@/components/SectionCard';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      {/* Hero */}
      <section className="hero-mesh noise-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16">
          <div className="max-w-xl sm:max-w-2xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight">
              {t('app.name')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-brand-muted leading-relaxed">
              {t('app.tagline')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-brand-surface to-transparent" />
      </section>

      {/* Sections grid */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10 -mt-2 sm:-mt-4 relative z-10"
        aria-labelledby="sections-heading"
      >
        <h2
          id="sections-heading"
          className="text-xs sm:text-sm font-semibold text-brand-muted uppercase tracking-wider mb-4 sm:mb-6"
        >
          {t('nav.sections')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SECTIONS.sort((a, b) => a.priority - b.priority).map((section, i) => (
            <SectionCard
              key={section.slug}
              section={section}
              locale={locale}
              title={t(`sections.${section.slug}.title`)}
              description={t(`sections.${section.slug}.description`)}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Ponte Saúde project banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-brand-dark text-white shadow-glow px-6 py-8 sm:px-10 sm:py-10">
          <div
            className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-brand-primary/30 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-100 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-3">
              <Sparkles size={13} aria-hidden />
              {t('project.hero.badge')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-2">
              {t('project.hero.name')}
            </h2>
            <p className="text-teal-50/90 leading-relaxed mb-5 max-w-xl">
              {t('project.hero.tagline')}
            </p>
            <Link
              href={`/${locale}/sobre`}
              className="inline-flex items-center gap-2 bg-white text-brand-dark font-semibold text-sm px-5 py-3 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors cursor-pointer min-h-[44px]"
            >
              {t('home.aboutCta')}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
