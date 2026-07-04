import type { Metadata } from 'next';

export const SITE_URL = 'https://pavansharmaportfolio.in';
export const SITE_NAME = 'Pavan Sharma Portfolio';

export const PERSON = {
  name: 'Pavan Sharma',
  alternateName: 'Pavan Kumar Sharma',
  jobTitle: 'AI & Full Stack Software Developer',
  email: 'ps3297169@gmail.com',
  github: 'https://github.com/Pavan8104',
  linkedin: 'https://www.linkedin.com/in/pavan-sharma-1645ab276/',
  image: `${SITE_URL}/og-image.jpg`,
  description:
    'Pavan Sharma is a global AI & Full Stack Software Developer helping businesses, startups, founders, and companies build websites, AI automation systems, SaaS platforms, and custom software solutions. Specialties: AI agents, LLM applications, RAG systems, AI chatbots, MVP development, and modern web applications with Python, FastAPI, LangChain, LangGraph, OpenAI APIs, React, and Next.js.',
} as const;

export const DEFAULT_DESCRIPTION =
  'Pavan Sharma — AI Agent Developer & Full Stack Engineer helping businesses in the USA, UK, Canada, Australia, Europe, and UAE build AI agents, automation systems, chatbots, RAG pipelines, SaaS products, MVPs, and modern web applications.';

/** Canonical URL for a route path ('' or '/services/rag-development'). trailingSlash-consistent. */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = path.replace(/\/+$/, '');
  return `${SITE_URL}${clean.startsWith('/') ? clean : `/${clean}`}/`;
}

interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** OpenGraph type; articles get published/modified time via `article` */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  imageAlt?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  imageAlt = 'Pavan Sharma — AI Agent Developer & Full Stack Engineer',
}: PageMeta): Metadata {
  const url = canonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime,
            authors: [PERSON.name],
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}
