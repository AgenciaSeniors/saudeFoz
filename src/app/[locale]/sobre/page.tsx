import { useTranslations } from 'next-intl';

export default function SobrePage() {
  const t = useTranslations();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {t('about.title')}
      </h1>
      <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
        <p>{t('about.paragraph1')}</p>
        <p>{t('about.paragraph2')}</p>
        <p>{t('about.paragraph3')}</p>
      </div>

      <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <p className="font-bold text-amber-900 mb-2">⚠️ {t('about.disclaimerTitle')}</p>
        <p className="text-amber-900 text-sm">{t('about.disclaimerBody')}</p>
      </div>
    </div>
  );
}
