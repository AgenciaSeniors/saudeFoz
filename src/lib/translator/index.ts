/**
 * Translator module using Google Gemini API (free tier).
 *
 * Rate limiting strategy:
 * - All calls are serialized through a module-level queue (no parallelism)
 * - 5-second gap between consecutive calls (12 req/min, under 15 RPM limit)
 * - Single retry with 60-second backoff ONLY on 429 (rate limit). Any other
 *   failure (4xx/5xx, empty response, parse error) fails fast without backoff,
 *   so a systemic error can't burn the whole cron time budget.
 *
 * This means the scraper can call translateContent() freely in parallel —
 * the throttling happens here, not in the caller.
 *
 * Guarani is intentionally excluded (see README for reasoning).
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Minimum gap between consecutive Gemini calls (ms).
// 5000ms = 12 req/min, well under the 15 RPM free-tier limit.
const MIN_GAP_MS = 5000;

// Backoff time after a 429 before retrying once.
const BACKOFF_MS = 60_000;

type SingleTranslation = {
  title: string;
  summary: string;
};

export type TranslationResult = {
  es?: SingleTranslation;
  en?: SingleTranslation;
  fr?: SingleTranslation;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Sentinel returned by callGemini() to distinguish a retryable 429 from a
// permanent failure (which returns null).
const RATE_LIMITED = Symbol('rate_limited');
type GeminiOutcome = TranslationResult | null | typeof RATE_LIMITED;

// Serialization queue — every call waits for the previous to finish
let queue: Promise<unknown> = Promise.resolve();
let lastCallAt = 0;

/**
 * Translates Portuguese content to ES, EN, FR in a single Gemini call.
 * Returns empty object on any failure (graceful degradation).
 */
export async function translateContent(
  title: string,
  summary: string
): Promise<TranslationResult> {
  if (!GEMINI_API_KEY) {
    console.warn('[translator] GEMINI_API_KEY not set, skipping translation');
    return {};
  }

  // Chain onto the global queue: wait for any pending call to finish first
  const job = queue.then(async () => {
    // Enforce minimum gap between calls
    const now = Date.now();
    const wait = Math.max(0, MIN_GAP_MS - (now - lastCallAt));
    if (wait > 0) await sleep(wait);

    try {
      return await callGeminiWithRetry(title, summary);
    } finally {
      lastCallAt = Date.now();
    }
  });

  // Keep queue chain alive even if this job throws
  queue = job.catch(() => undefined);

  return job;
}

async function callGeminiWithRetry(
  title: string,
  summary: string
): Promise<TranslationResult> {
  const result = await callGemini(title, summary);

  // Only a 429 is worth waiting out — retry once after the backoff.
  if (result === RATE_LIMITED) {
    console.warn(
      `[translator] Rate limited (429), waiting ${BACKOFF_MS / 1000}s before retrying once...`
    );
    await sleep(BACKOFF_MS);
    const retryResult = await callGemini(title, summary);
    return retryResult && retryResult !== RATE_LIMITED ? retryResult : {};
  }

  // Any other failure (null) fails fast — no dead 60s backoff.
  return result ?? {};
}

/**
 * Single Gemini API call. Returns RATE_LIMITED on a 429, null on any other
 * failure, and the parsed result on success.
 */
async function callGemini(
  title: string,
  summary: string
): Promise<GeminiOutcome> {
  const prompt = `You are a professional medical translator working on a public health website for immigrants in Foz do Iguaçu, Brazil (Triple Frontier region).

Translate the following Brazilian Portuguese health information from the Brazilian Ministry of Health (SUS) into three languages: Spanish (es), English (en), and French (fr).

CRITICAL REQUIREMENTS:
- Preserve medical accuracy above all else
- Use clear, accessible language for people with basic health literacy
- Keep the same tone and structure as the original
- Do NOT add explanations, caveats, or information not in the source
- Do NOT translate institutional names like "SUS", "CNS", "UBS", "UPA", "SAMU", "Ministério da Saúde", "CadSUS", "Farmácia Popular", "CAPS" — keep them in Portuguese
- Preserve all numbers, dates, and phone numbers exactly as written
- Return ONLY valid JSON, no markdown code blocks, no preamble, no explanation

Required JSON format:
{
  "es": { "title": "...", "summary": "..." },
  "en": { "title": "...", "summary": "..." },
  "fr": { "title": "...", "summary": "..." }
}

Source content to translate:

TITLE: ${title}

SUMMARY: ${summary}`;

  try {
    const res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (res.status === 429) {
      console.warn('[translator] Hit rate limit (429)');
      return RATE_LIMITED;
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `[translator] Gemini API error ${res.status}:`,
        errorText.slice(0, 200)
      );
      return null;
    }

    const data = await res.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[translator] Empty response from Gemini');
      return null;
    }

    // Strip markdown code fences if Gemini wraps them despite instructions
    const clean = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(clean) as TranslationResult;

    // Validate shape: each locale must have both title and summary
    const result: TranslationResult = {};
    for (const locale of ['es', 'en', 'fr'] as const) {
      const t = parsed[locale];
      if (t && typeof t.title === 'string' && typeof t.summary === 'string') {
        result[locale] = { title: t.title.trim(), summary: t.summary.trim() };
      }
    }

    return result;
  } catch (err) {
    console.error('[translator] Failed:', err);
    return null;
  }
}