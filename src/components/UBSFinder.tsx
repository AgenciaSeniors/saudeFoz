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
      {/* Search */}
      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl shadow-card focus:outline-none focus:border-brand-primary focus:shadow-glow text-base transition-all"
          aria-label={t('searchPlaceholder')}
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {(['all', 'dentist', 'pediatrician', 'gynecologist'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              filter === f
                ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            {t(`filter.${f}`)}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-brand-muted text-center py-12">{t('noResults')}</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((u) => (
            <li
              key={u.id}
              className="bg-white border border-slate-200/80 border-l-4 border-l-brand-primary rounded-xl p-5 shadow-card"
            >
              <h3 className="font-semibold text-lg text-slate-900">{u.name}</h3>
              <p className="text-sm text-brand-primary font-medium mb-3">
                {u.neighborhood}
              </p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="shrink-0 mt-0.5 text-brand-muted" aria-hidden />
                  <span>{u.address}</span>
                </div>
                {u.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-brand-muted" aria-hidden />
                    <a href={`tel:${u.phone}`} className="hover:underline text-brand-primary">
                      {u.phone}
                    </a>
                  </div>
                )}
                {u.hours && (
                  <div className="flex items-center gap-2.5">
                    <Clock size={15} className="text-brand-muted" aria-hidden />
                    <span>{u.hours}</span>
                  </div>
                )}
              </div>
              {u.services && u.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {u.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-brand-light text-brand-primary px-2.5 py-1 rounded-full font-medium"
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
