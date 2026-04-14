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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {t('app.name')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('app.tagline')}
        </p>
      </section>

      <section aria-labelledby="sections-heading">
        <h2
          id="sections-heading"
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          {t('nav.sections')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.sort((a, b) => a.priority - b.priority).map((section) => (
            <SectionCard
              key={section.slug}
              section={section}
              locale={locale}
              title={t(`sections.${section.slug}.title`)}
              description={t(`sections.${section.slug}.description`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
