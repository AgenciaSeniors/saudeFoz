import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { EmergencyBar } from '@/components/EmergencyBar';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Link from 'next/link';
import '../globals.css';

export const metadata: Metadata = {
  title: 'SaúdeFoz — Guía del SUS en Foz do Iguaçu',
  description:
    'Información práctica del SUS para inmigrantes en Foz do Iguaçu. 15 temas de salud en 5 idiomas.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'SaúdeFoz' },
};

export const viewport: Viewport = {
  themeColor: '#047857',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <EmergencyBar />
          <header className="bg-white border-b border-gray-200 sticky top-8 z-40">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 font-bold text-sus-primary text-xl"
              >
                <span aria-hidden>🏥</span>
                <span>SaúdeFoz</span>
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href={`/${locale}/ubs`}
                  className="text-sm font-medium hover:text-sus-primary"
                >
                  UBS
                </Link>
                <Link
                  href={`/${locale}/sobre`}
                  className="text-sm font-medium hover:text-sus-primary"
                >
                  ℹ️
                </Link>
                <LanguageSwitcher currentLocale={locale as Locale} />
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <DisclaimerBanner />

          <footer className="bg-gray-900 text-gray-300 text-sm py-8 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="font-bold text-white mb-2">SaúdeFoz</p>
              <p className="mb-2">
                Proyecto informativo sin fines de lucro. No sustituye atención médica.
              </p>
              <p className="text-xs text-gray-500">
                Contenido adaptado del portal oficial del SUS (gov.br).
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
