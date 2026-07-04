import Link from 'next/link';
import type { Section } from '@/lib/sections';
import { SectionIcon } from '@/components/SectionIcon';
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
  return (
    <Link
      href={`/${locale}/secao/${section.slug}`}
      className={cn(
        'group bg-white rounded-xl border border-slate-200/80 border-l-4',
        'p-4 sm:p-5',
        'shadow-card hover:shadow-card-hover active:shadow-card',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 active:translate-y-0',
        'focus:outline-none cursor-pointer',
        'animate-fade-in-up',
        'min-h-[72px]',
        section.accentColor,
        `stagger-${index + 1}`
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={cn(
            'shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center',
            'transition-transform duration-300 group-hover:scale-110',
            section.iconBg,
            section.textColor
          )}
        >
          <SectionIcon name={section.icon} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-[15px] sm:text-base leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-primary transition-colors">
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
