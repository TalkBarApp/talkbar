import type { APIRoute } from 'astro';
import { IS_PREVIEW_BUILD, CURRENT_CONFIG } from '../i18n/domains';

export const GET: APIRoute = () => {
  const isPreviewBuild = IS_PREVIEW_BUILD;
  const body = isPreviewBuild
    ? `User-agent: *
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ChatGPT-User
Disallow: /
`
    : `User-agent: *
Allow: /

Sitemap: ${CURRENT_CONFIG.site}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
