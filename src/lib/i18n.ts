export const locales = ['es', 'pt', 'en', 'fr', 'gn'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  pt: 'Português',
  en: 'English',
  fr: 'Français',
  gn: "Avañe'ẽ",
};

export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  pt: '🇧🇷',
  en: '🇬🇧',
  fr: '🇫🇷',
  gn: '🌿',
};
