'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1.5 transition-colors cursor-pointer">
      <Globe size={14} className="text-brand-primary shrink-0" aria-hidden />
      <select
        value={currentLocale}
        onChange={(e) => handleChange(e.target.value)}
        className="text-xs font-semibold text-slate-700 bg-transparent border-0 focus:ring-0 cursor-pointer pr-1 appearance-none"
        aria-label="Language"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
