import { UBSFinder } from '@/components/UBSFinder';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

export default async function UBSPage() {
  const t = await getTranslations();
  const { data: ubsList } = await supabaseAdmin
    .from('ubs')
    .select('*')
    .order('neighborhood');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {t('ubs.title')}
      </h1>
      <p className="text-gray-600 mb-6">{t('ubs.subtitle')}</p>
      <UBSFinder initialUBS={ubsList ?? []} />
    </div>
  );
}
