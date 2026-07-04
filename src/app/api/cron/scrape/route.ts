import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { runScraper } from '@/lib/scraper';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Validates the cron Authorization header against CRON_SECRET.
 *
 * Fails closed: if CRON_SECRET is not configured, every request is rejected
 * (rather than authenticating anyone who sends the literal "Bearer undefined").
 * Uses a constant-time comparison to avoid leaking the secret via timing.
 */
function isAuthorized(authHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || !authHeader) return false;

  const provided = Buffer.from(authHeader);
  const expected = Buffer.from(`Bearer ${secret}`);
  if (provided.length !== expected.length) return false;

  return timingSafeEqual(provided, expected);
}

export async function GET(request: Request) {
  if (!isAuthorized(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await runScraper();
  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;

  return NextResponse.json({ ok, failed, results });
}
