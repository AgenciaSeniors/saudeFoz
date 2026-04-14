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
    <div className="flex items-center gap-1">
      <Globe size={16} className="text-gray-500" aria-hidden />
      <select
        value={currentLocale}
        onChange={(e) => handleChange(e.target.value)}
        className="text-sm font-medium bg-transparent border-0 focus:ring-0 cursor-pointer"
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
