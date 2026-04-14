import { useTranslations } from 'next-intl';
import { AlertTriangle } from 'lucide-react';

export default function SobrePage() {
  const t = useTranslations();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl sm:text-4xl text-slate-900 mb-6 tracking-tight">
        {t('about.title')}
      </h1>
      <div className="prose prose-lg max-w-none text-slate-600 space-y-5 leading-relaxed">
        <p>{t('about.paragraph1')}</p>
        <p>{t('about.paragraph2')}</p>
        <p>{t('about.paragraph3')}</p>
      </div>

      <div className="mt-10 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-5 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-600" aria-hidden />
          <div>
            <p className="font-semibold text-amber-900 mb-1">{t('about.disclaimerTitle')}</p>
            <p className="text-amber-800 text-sm leading-relaxed">{t('about.disclaimerBody')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
