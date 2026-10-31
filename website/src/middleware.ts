import { defineMiddleware } from 'astro:middleware';
import { CURRENT_CONFIG } from './i18n/domains';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  const defaultLocale = CURRENT_CONFIG.defaultLocale;

  // Redirect default locale prefix to root (e.g., /en/ → /, /ru/ → /)
  if (pathname === `/${defaultLocale}` || pathname === `/${defaultLocale}/` || pathname.startsWith(`/${defaultLocale}/`)) {
    const newPath = pathname.replace(new RegExp(`^/${defaultLocale}/?`), '/') || '/';
    return ctx.redirect(newPath, 301);
  }

  return next();
});
