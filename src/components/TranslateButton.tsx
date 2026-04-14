import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TranslateButton({
  text,
  targetLocale,
}: {
  text: string;
  targetLocale: string;
}) {
  const t = useTranslations('section');

  if (targetLocale === 'pt') return null;

  const url = `https://translate.google.com/?sl=pt&tl=${targetLocale}&text=${encodeURIComponent(text)}&op=translate`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-lg font-medium hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200 transition-all text-sm cursor-pointer min-h-[44px]"
    >
      <Languages size={15} aria-hidden />
      {t('translateWithGoogle')}
    </a>
  );
}
