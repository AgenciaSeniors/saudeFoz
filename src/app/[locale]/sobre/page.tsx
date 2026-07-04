import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  AlertTriangle,
  Languages,
  FileWarning,
  Unlink,
  Users,
  Smartphone,
  HeartHandshake,
  Globe,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SobrePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  const causes = [
    {
      icon: Languages,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
      accent: 'border-l-sky-400',
      title: t('project.problem.cause1Title'),
      body: t('project.problem.cause1Body'),
    },
    {
      icon: FileWarning,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      accent: 'border-l-amber-400',
      title: t('project.problem.cause2Title'),
      body: t('project.problem.cause2Body'),
    },
    {
      icon: Unlink,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
      accent: 'border-l-rose-400',
      title: t('project.problem.cause3Title'),
      body: t('project.problem.cause3Body'),
    },
  ];

  const pillars = [
    {
      icon: Users,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      title: t('project.solution.pillar1Title'),
      body: t('project.solution.pillar1Body'),
      badge: null as string | null,
      highlight: false,
    },
    {
      icon: Smartphone,
      iconBg: 'bg-brand-primary',
      iconColor: 'text-white',
      title: t('project.solution.pillar2Title'),
      body: t('project.solution.pillar2Body'),
      badge: t('project.solution.pillar2Badge'),
      highlight: true,
    },
    {
      icon: HeartHandshake,
      iconBg: 'bg-orange-50',
      iconColor: 'text-brand-accent',
      title: t('project.solution.pillar3Title'),
      body: t('project.solution.pillar3Body'),
      badge: null as string | null,
      highlight: false,
    },
  ];

  const impactItems = ['item1', 'item2', 'item3', 'item4', 'item5'].map((k) =>
    t(`project.impact.${k}`)
  );

  return (
    <div>
      {/* Hero */}
      <section className="hero-mesh noise-overlay relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary bg-brand-light border border-brand-primary/20 rounded-full px-3 py-1 mb-4">
            <Sparkles size={13} aria-hidden />
            {t('project.hero.badge')}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3 tracking-tight leading-tight">
            {t('project.hero.name')}
          </h1>
          <p className="text-lg sm:text-xl text-brand-primary font-medium mb-4">
            {t('project.hero.tagline')}
          </p>
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
            {t('project.hero.intro')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-brand-surface to-transparent" />
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14 sm:space-y-20">
        {/* Context */}
        <section aria-labelledby="ctx-heading">
          <h2
            id="ctx-heading"
            className="font-display text-2xl sm:text-3xl text-slate-900 tracking-tight mb-3"
          >
            {t('project.context.title')}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
            {t('project.context.body')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 sm:p-6 flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center">
                <Activity size={22} aria-hidden />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-brand-primary leading-none mb-1">
                  {t('project.context.stat1Value')}
                </div>
                <p className="text-sm text-brand-muted leading-snug">
                  {t('project.context.stat1Label')}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 sm:p-6 flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-orange-50 text-brand-accent flex items-center justify-center">
                <Globe size={22} aria-hidden />
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-brand-accent leading-none mb-1">
                  {t('project.context.stat2Value')}
                </div>
                <p className="text-sm text-brand-muted leading-snug">
                  {t('project.context.stat2Label')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem + causes */}
        <section aria-labelledby="prob-heading">
          <h2
            id="prob-heading"
            className="font-display text-2xl sm:text-3xl text-slate-900 tracking-tight mb-3"
          >
            {t('project.problem.title')}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-7 max-w-2xl">
            {t('project.problem.body')}
          </p>
          <h3 className="text-xs sm:text-sm font-semibold text-brand-muted uppercase tracking-wider mb-4">
            {t('project.problem.causesTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {causes.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className={cn(
                    'bg-white rounded-xl border border-slate-200/80 border-l-4 shadow-card p-5',
                    'animate-fade-in-up',
                    c.accent,
                    `stagger-${i + 1}`
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                      c.iconBg,
                      c.iconColor
                    )}
                  >
                    <Icon size={20} aria-hidden />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-[15px] leading-snug mb-1.5">
                    {c.title}
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed">{c.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Solution + pillars */}
        <section aria-labelledby="sol-heading">
          <h2
            id="sol-heading"
            className="font-display text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2"
          >
            {t('project.solution.title')}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-7 max-w-2xl">
            {t('project.solution.intro')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className={cn(
                    'rounded-2xl border p-5 sm:p-6 shadow-card animate-fade-in-up flex flex-col',
                    `stagger-${i + 1}`,
                    p.highlight
                      ? 'bg-brand-dark border-brand-dark text-white shadow-glow'
                      : 'bg-white border-slate-200/80'
                  )}
                >
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center mb-4',
                      p.iconBg,
                      p.iconColor
                    )}
                  >
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3
                    className={cn(
                      'font-semibold text-lg leading-snug mb-2',
                      p.highlight ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      p.highlight ? 'text-teal-50/90' : 'text-brand-muted'
                    )}
                  >
                    {p.body}
                  </p>
                  {p.badge && (
                    <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold bg-white/15 text-white rounded-full px-3 py-1.5 w-fit">
                      <Sparkles size={12} aria-hidden />
                      {p.badge}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Impact */}
        <section aria-labelledby="imp-heading">
          <h2
            id="imp-heading"
            className="font-display text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2"
          >
            {t('project.impact.title')}
          </h2>
          <p className="text-brand-muted text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
            {t('project.impact.intro')}
          </p>
          <ul className="space-y-3">
            {impactItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="shrink-0 mt-0.5 text-brand-primary"
                  aria-hidden
                />
                <span className="text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Project note + CTA */}
        <section className="bg-brand-light border border-brand-primary/15 rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-xl sm:text-2xl text-slate-900 tracking-tight mb-2">
            {t('project.footerTitle')}
          </h2>
          <p className="text-brand-muted leading-relaxed mb-5">
            {t('project.footerNote')}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-brand-dark active:bg-brand-dark transition-colors cursor-pointer min-h-[44px]"
          >
            {t('nav.sections')}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </section>

        {/* Legal disclaimer */}
        <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-5 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              className="shrink-0 mt-0.5 text-amber-600"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-amber-900 mb-1">
                {t('about.disclaimerTitle')}
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                {t('about.disclaimerBody')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
