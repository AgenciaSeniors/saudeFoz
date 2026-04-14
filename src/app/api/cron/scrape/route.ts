import { NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await runScraper();
  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;

  return NextResponse.json({ ok, failed, results });
}
