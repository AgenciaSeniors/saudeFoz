import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function EmergencyBar() {
  const t = useTranslations('emergency');
  return (
    <a
      href="tel:192"
      className="bg-red-600 text-white text-center py-2 px-4 flex items-center justify-center gap-2 font-bold text-sm sticky top-0 z-50 hover:bg-red-700 transition-colors"
      aria-label={t('callSamu')}
    >
      <Phone size={16} aria-hidden />
      <span>{t('samuLabel')}: 192</span>
    </a>
  );
}
