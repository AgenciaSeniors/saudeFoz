import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { Section } from '@/lib/sections';
import { cn } from '@/lib/utils';

export function SectionCard({
  section,
  locale,
  title,
  description,
}: {
  section: Section;
  locale: string;
  title: string;
  description: string;
}) {
  const Icon = (Icons[section.icon as keyof typeof Icons] ??
    Icons.Circle) as React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;

  return (
    <Link
      href={`/${locale}/secao/${section.slug}`}
      className={cn(
        'group rounded-2xl border-2 p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none',
        section.color
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 p-2 rounded-lg bg-white/60">
          <Icon size={28} aria-hidden />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
          <p className="text-sm opacity-80 leading-snug">{description}</p>
        </div>
      </div>
    </Link>
  );
}
