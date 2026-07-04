import { UBSFinder } from '@/components/UBSFinder';
import { getSupabaseAnon } from '@/lib/supabase/server';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

async function getUBS() {
  const supabase = getSupabaseAnon();
  if (!supabase) return [];

  try {
    const { data } = await supabase
      .from('ubs')
      .select('*')
      .order('neighborhood');
    return data ?? [];
  } catch (err) {
    console.error('[ubs] Failed to load UBS list:', err);
    return [];
  }
}

export default async function UBSPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const ubsList = await getUBS();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl sm:text-4xl text-slate-900 mb-2 tracking-tight">
        {t('ubs.title')}
      </h1>
      <p className="text-brand-muted text-lg mb-8">{t('ubs.subtitle')}</p>
      <UBSFinder initialUBS={ubsList ?? []} />
    </div>
  );
}
