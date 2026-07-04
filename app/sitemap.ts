import type { MetadataRoute } from 'next';
import { SITE_URL, canonicalUrl } from '../src/lib/seo';

export const dynamic = 'force-static';
import { blogPosts } from '../src/data/blog';
import { services } from '../src/data/services';
import { caseStudies } from '../src/data/caseStudies';
import { industries } from '../src/data/industries';

const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/'), lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 1.0 },
    { url: canonicalUrl('/about'), lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: canonicalUrl('/services'), lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: canonicalUrl('/hire-me'), lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.9 },
    { url: canonicalUrl('/contact'), lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonicalUrl('/blog'), lastModified: BUILD_DATE, changeFrequency: 'weekly', priority: 0.8 },
    { url: canonicalUrl('/case-studies'), lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/resume.pdf`, lastModified: BUILD_DATE, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: canonicalUrl(`/services/${s.slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/industries'), lastModified: BUILD_DATE, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...industries.map((i) => ({
      url: canonicalUrl(`/industries/${i.slug}`),
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: canonicalUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: canonicalUrl(`/case-studies/${c.slug}`),
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...corePages, ...servicePages, ...industryPages, ...blogPages, ...caseStudyPages];
}
