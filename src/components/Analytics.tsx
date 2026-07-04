import Script from 'next/script';

/**
 * Privacy-first, opt-in web analytics.
 *
 * Renders nothing unless an analytics provider is configured via env vars, so
 * by default NO tracking script loads. Both supported providers are cookieless
 * and collect no personal data — appropriate for a health service used by
 * vulnerable people.
 *
 *   Plausible:  NEXT_PUBLIC_PLAUSIBLE_DOMAIN  (+ NEXT_PUBLIC_PLAUSIBLE_SRC for self-hosted)
 *   Umami:      NEXT_PUBLIC_UMAMI_WEBSITE_ID  (+ NEXT_PUBLIC_UMAMI_SRC for self-hosted)
 *
 * Env vars are inlined at build time, so an unset provider is tree-shaken away.
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.js';

  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiSrc =
    process.env.NEXT_PUBLIC_UMAMI_SRC ?? 'https://cloud.umami.is/script.js';

  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src={plausibleSrc}
          strategy="afterInteractive"
        />
      )}
      {umamiId && (
        <Script
          defer
          data-website-id={umamiId}
          src={umamiSrc}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
