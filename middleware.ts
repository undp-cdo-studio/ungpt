import { locales } from '@/i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Configure default locale detection
  defaultLocale: 'en',
  locales,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - /_vercel (Vercel internals)
    // - all root files inside /public (e.g. /favicon.ico)
    '/((?!api|_next|_vercel|static|[\\w-]+\\.\\w+).*)'
  ]
};
