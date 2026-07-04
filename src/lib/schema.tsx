import { PERSON, SITE_URL, canonicalUrl } from './seo';
import { services } from '../data/services';

/** Priority markets first, then worldwide — used across Person/ProfessionalService/Service schemas */
export const SERVICE_AREAS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'Germany',
  'Switzerland',
  'Netherlands',
  'Sweden',
  'Europe',
  'Worldwide',
];

const AUDIENCE = {
  '@type': 'Audience',
  audienceType: [
    'Business Owners',
    'Startup Founders',
    'Entrepreneurs',
    'CEOs',
    'CTOs',
    'Companies',
  ],
};

/** Renders a JSON-LD block. Server-component friendly. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${SITE_URL}/#organization`;

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON.name,
    alternateName: PERSON.alternateName,
    url: `${SITE_URL}/`,
    email: PERSON.email,
    image: PERSON.image,
    description: PERSON.description,
    jobTitle: PERSON.jobTitle,
    worksFor: [
      { '@type': 'Organization', name: 'micro1', url: 'https://www.micro1.ai/' },
      { '@type': 'Organization', name: 'Outlier' },
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Chandigarh University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandigarh',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    },
    address: { '@type': 'PostalAddress', addressCountry: 'IN', addressRegion: 'Punjab' },
    knowsAbout: [
      'AI Agent Development', 'AI Automation', 'LLM Development',
      'RAG Systems', 'AI Chatbots', 'SaaS Development', 'MVP Development',
      'Website Development', 'Web Applications', 'Custom Software Development',
      'Python', 'Artificial Intelligence', 'Machine Learning', 'Data Science',
      'Large Language Models', 'LLM Red Teaming', 'RAG (Retrieval-Augmented Generation)',
      'Agentic AI', 'LangChain', 'LangGraph', 'Prompt Engineering', 'OpenAI API',
      'Full Stack Development', 'Backend Development', 'FastAPI', 'Next.js',
      'Business Automation',
      'Data Structures and Algorithms', 'Competitive Programming',
      'Cloud Computing', 'AWS', 'Docker', 'Computer Vision', 'NLP',
      'PostgreSQL', 'MongoDB', 'React.js', 'C++', 'Java', 'Streamlit',
      'Scikit-learn', 'Pandas', 'NumPy',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI & Full Stack Software Developer',
      occupationLocation: { '@type': 'Country', name: 'India' },
      skills:
        'AI Agents, AI Automation, LLM Development, RAG Systems, AI Chatbots, Python, FastAPI, Machine Learning, Full Stack Development, React, Next.js, SaaS Development, MVP Development, Website Development, Custom Software',
    },
    workLocation: { '@type': 'Place', name: 'Remote — Worldwide' },
    sameAs: [PERSON.github, PERSON.linkedin],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Pavan Sharma',
    alternateName: 'Pavan Sharma | AI & Full Stack Software Developer',
    description:
      'Global AI & Full Stack Software Developer helping businesses build intelligent digital solutions — websites, AI automation systems, SaaS platforms, and custom software.',
    inLanguage: 'en-US',
    author: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
    creator: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
    publisher: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
    sameAs: [PERSON.github, PERSON.linkedin],
  };
}

/** Freelance practice as an Organization/ProfessionalService for entity understanding. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: 'Pavan Sharma — AI & Full Stack Software Development Services',
    url: `${SITE_URL}/services/`,
    image: PERSON.image,
    email: PERSON.email,
    founder: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
    description:
      'Independent AI and software development practice helping businesses, startups, founders, and companies worldwide build websites, AI automation systems, AI agents, chatbots, RAG pipelines, SaaS platforms, MVPs, and custom software solutions.',
    slogan: 'AI Development · AI Automation Solutions · Website Development · SaaS Development · Full Stack Development · Custom Software Solutions',
    areaServed: SERVICE_AREAS,
    audience: AUDIENCE,
    knowsAbout: [
      'AI Development', 'AI Automation Solutions', 'Website Development',
      'SaaS Development', 'Full Stack Development', 'Custom Software Solutions',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI & Software Development Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${canonicalUrl(`/services/${s.slug}`)}#service`,
          name: s.serviceType,
          description: s.metaDescription,
          url: canonicalUrl(`/services/${s.slug}`),
        },
      })),
    },
    sameAs: [PERSON.github, PERSON.linkedin],
  };
}

export function profilePageSchema(dateModified: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified,
    url: `${SITE_URL}/`,
    mainEntity: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON.name,
      alternateName: PERSON.alternateName,
      description: PERSON.description,
      sameAs: [PERSON.github, PERSON.linkedin],
    },
  };
}

export function itemListSchema(
  name: string,
  description: string,
  items: { name: string; description: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url: `${SITE_URL}/`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      ...item,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: canonicalUrl(opts.path),
    provider: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
    areaServed: SERVICE_AREAS,
    audience: AUDIENCE,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/contact/`,
    },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: canonicalUrl(opts.path),
    mainEntityOfPage: canonicalUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    keywords: opts.tags?.join(', '),
    image: PERSON.image,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON.name,
      url: `${SITE_URL}/about/`,
    },
    publisher: { '@type': 'Person', '@id': PERSON_ID, name: PERSON.name },
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}
