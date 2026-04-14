'use client';

import { useMemo, useState } from 'react';
import { Search, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

type UBS = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  phone: string | null;
  hours: string | null;
  services: string[] | null;
  has_dentist: boolean;
  has_pediatrician: boolean;
  has_gynecologist: boolean;
};

export function UBSFinder({ initialUBS }: { initialUBS: UBS[] }) {
  const t = useTranslations('ubs');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<
    'all' | 'dentist' | 'pediatrician' | 'gynecologist'
  >('all');

  const filtered = useMemo(() => {
    return initialUBS.filter((u) => {
      const matchQ =
        !query ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.neighborhood.toLowerCase().includes(query.toLowerCase());
      const matchF =
        filter === 'all' ||
        (filter === 'dentist' && u.has_dentist) ||
        (filter === 'pediatrician' && u.has_pediatrician) ||
        (filter === 'gynecologist' && u.has_gynecologist);
      return matchQ && matchF;
    });
  }, [initialUBS, query, filter]);

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-sus-primary text-base"
          aria-label={t('searchPlaceholder')}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'dentist', 'pediatrician', 'gynecologist'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filter === f
                ? 'bg-sus-primary text-white border-sus-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-sus-primary'
            }`}
          >
            {t(`filter.${f}`)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10">{t('noResults')}</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((u) => (
            <li
              key={u.id}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <h3 className="font-bold text-lg text-gray-900">{u.name}</h3>
              <p className="text-sm text-sus-primary font-medium mb-3">
                {u.neighborhood}
              </p>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" aria-hidden />
                  <span>{u.address}</span>
                </div>
                {u.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} aria-hidden />
                    <a href={`tel:${u.phone}`} className="hover:underline">
                      {u.phone}
                    </a>
                  </div>
                )}
                {u.hours && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} aria-hidden />
                    <span>{u.hours}</span>
                  </div>
                )}
              </div>
              {u.services && u.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {u.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
