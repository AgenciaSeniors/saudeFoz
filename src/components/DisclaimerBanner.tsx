import { AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function DisclaimerBanner() {
  const t = useTranslations('app');
  return (
    <div className="bg-amber-50 border-t border-amber-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-start gap-3 text-amber-900 text-sm">
        <AlertTriangle size={18} className="shrink-0 mt-0.5" aria-hidden />
        <p>{t('disclaimer')}</p>
      </div>
    </div>
  );
}
