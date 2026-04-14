import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Botón que abre Google Translate en una nueva pestaña con el texto pre-cargado.
 * Se oculta automáticamente si el idioma de destino es portugués
 * (porque el contenido ya está en portugués).
 */
export function TranslateButton({
  text,
  targetLocale,
}: {
  text: string;
  targetLocale: string;
}) {
  const t = useTranslations('section');

  // El contenido scrapeado está en PT, así que no tiene sentido traducir a PT
  if (targetLocale === 'pt') return null;

  // Google Translate soporta los 5 idiomas del proyecto:
  // es, en, fr, gn (Guaraní, agregado en 2022)
  const url = `https://translate.google.com/?sl=pt&tl=${targetLocale}&text=${encodeURIComponent(text)}&op=translate`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
    >
      <Languages size={16} aria-hidden />
      {t('translateWithGoogle')}
    </a>
  );
}