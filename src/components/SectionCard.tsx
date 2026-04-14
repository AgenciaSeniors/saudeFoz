import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { Section } from '@/lib/sections';
import { cn } from '@/lib/utils';

export function SectionCard({
  section,
  locale,
  title,
  description,
  index = 0,
}: {
  section: Section;
  locale: string;
  title: string;
  description: string;
  index?: number;
}) {
  const Icon = (Icons[section.icon as keyof typeof Icons] ??
    Icons.Circle) as React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;

  return (
    <Link
      href={`/${locale}/secao/${section.slug}`}
      className={cn(
        'group bg-white rounded-xl border border-slate-200/80 border-l-4 p-5',
        'shadow-card hover:shadow-card-hover',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1',
        'focus:outline-none',
        'animate-fade-in-up',
        section.accentColor,
        `stagger-${index + 1}`
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'shrink-0 w-11 h-11 rounded-xl flex items-center justify-center',
            'transition-transform duration-300 group-hover:scale-110',
            section.iconBg,
            section.textColor
          )}
        >
          <Icon size={22} aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-base leading-tight mb-1 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-brand-muted leading-snug line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
