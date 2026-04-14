import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DisclaimerBanner() {
  const t = useTranslations('app');
  return (
    <div className="bg-amber-50/80 border-t border-amber-100 px-4 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center gap-2.5 text-amber-800 text-xs">
        <AlertTriangle size={14} className="shrink-0" aria-hidden />
        <p className="leading-relaxed">{t('disclaimer')}</p>
      </div>
    </div>
  );
}
