import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (!requested || !locales.includes(requested as Locale)) notFound();

  return {
    locale: requested,
    messages: (await import(`@/messages/${requested}.json`)).default,
  };
});
