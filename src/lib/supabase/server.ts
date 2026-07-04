import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

/**
 * Returns a Supabase admin client (service-role key), or `null` when the
 * required environment variables are missing — e.g. during a build without
 * secrets, or in a preview without a configured database.
 *
 * Callers must handle the null case: server components should fall back to
 * their empty state so the build never crashes, and the scraper should surface
 * a clear configuration error.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, { auth: { persistSession: false } });
  }
  return cached;
}

let cachedAnon: SupabaseClient | null = null;

/**
 * Returns a Supabase client using the anon key, or `null` when the public
 * environment variables are missing. Row Level Security IS enforced with this
 * client, so use it for public read-only queries in server components — reserve
 * getSupabaseAdmin() (which bypasses RLS) for the scraper's privileged writes.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!cachedAnon) {
    cachedAnon = createClient(url, key, { auth: { persistSession: false } });
  }
  return cachedAnon;
}
