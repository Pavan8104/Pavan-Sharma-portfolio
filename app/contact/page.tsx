import type { Metadata } from 'next';
import PageShell from '../../src/components/pages/PageShell';
import ContactSection from '../../src/components/Contact/ContactSection';
import { buildMetadata } from '../../src/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact — Hire Pavan Sharma for AI & Full Stack Projects',
  description:
    'Contact Pavan Sharma for AI agent development, automation, chatbots, RAG systems, SaaS, MVP, and full stack projects. Remote work with clients in the USA, UK, Canada, Australia, Europe, UAE, and worldwide.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]}
    >
      {/* Reuses the exact homepage contact experience (form, EmailJS, rate limiting) */}
      <ContactSection showFooter={false} />
    </PageShell>
  );
}
