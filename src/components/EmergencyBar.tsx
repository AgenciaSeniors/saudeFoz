import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function EmergencyBar() {
  const t = useTranslations('emergency');
  return (
    <a
      href="tel:192"
      className="bg-red-600 text-white text-center py-1.5 px-4 flex items-center justify-center gap-2 font-semibold text-xs tracking-wide uppercase sticky top-0 z-50 hover:bg-red-700 transition-colors"
      aria-label={t('callSamu')}
    >
      <span className="relative flex items-center justify-center">
        <span className="absolute w-5 h-5 rounded-full bg-white/20 animate-pulse-ring" />
        <Phone size={14} aria-hidden />
      </span>
      <span>{t('samuLabel')}: 192</span>
    </a>
  );
}
