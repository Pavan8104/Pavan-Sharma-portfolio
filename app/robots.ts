import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/lib/seo';

export const dynamic = 'force-static';

// AI / LLM crawlers explicitly welcomed (carried over from the original robots.txt)
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Meta-ExternalAgent',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
  'YouBot',
  'cohere-ai',
];

const SEARCH_CRAWLERS = [
  'Googlebot',
  'Googlebot-Image',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'Bingbot',
  'msnbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/.env'],
      },
      ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
