import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
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
  icons: {
    icon: [
      { url: '/icons/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F766E',
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
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-dvh flex flex-col bg-brand-surface">
        <NextIntlClientProvider messages={messages}>
          <EmergencyBar />

          <header className="header-blur border-b border-slate-200/60 sticky top-8 z-40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-1 group cursor-pointer min-h-[44px] items-center"
              >
                <span className="font-display text-xl sm:text-2xl text-brand-dark tracking-tight">
                  Saúde
                </span>
                <span className="font-display text-xl sm:text-2xl text-brand-primary tracking-tight">
                  Foz
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-accent ml-0.5 group-hover:scale-125 transition-transform" />
              </Link>

              <nav className="flex items-center gap-1 sm:gap-3">
                <Link
                  href={`/${locale}/ubs`}
                  className="text-sm font-semibold text-slate-600 hover:text-brand-primary active:text-brand-dark transition-colors px-3 py-2.5 rounded-lg hover:bg-brand-light cursor-pointer min-h-[44px] flex items-center"
                >
                  UBS
                </Link>
                <Link
                  href={`/${locale}/sobre`}
                  className="text-sm font-semibold text-slate-600 hover:text-brand-primary active:text-brand-dark transition-colors px-3 py-2.5 rounded-lg hover:bg-brand-light cursor-pointer min-h-[44px] flex items-center"
                >
                  Info
                </Link>
                <div className="w-px h-5 bg-slate-200 hidden sm:block" />
                <LanguageSwitcher currentLocale={locale as Locale} />
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <DisclaimerBanner />

          <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 py-8 sm:py-10 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                <span className="font-display text-lg sm:text-xl text-white">Saúde</span>
                <span className="font-display text-lg sm:text-xl text-teal-400">Foz</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 ml-0.5" />
              </div>
              <p className="text-sm mb-2 max-w-md leading-relaxed">
                Proyecto informativo sin fines de lucro. No sustituye atención médica.
              </p>
              <p className="text-xs text-slate-600">
                Contenido adaptado del portal oficial del SUS (gov.br).
              </p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
