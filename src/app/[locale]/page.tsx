import { useTranslations } from 'next-intl';
import { SECTIONS } from '@/lib/sections';
import { SectionCard } from '@/components/SectionCard';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 -mt-2 sm:-mt-4 relative z-10"
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
    </>
  );
}
