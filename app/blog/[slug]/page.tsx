import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '../../../src/components/pages/PageShell';
import BlogMarkdown from '../../../src/components/Blog/BlogMarkdown';
import { blogPosts } from '../../../src/data/blog';
import { services } from '../../../src/data/services';
import { buildMetadata } from '../../../src/lib/seo';
import { JsonLd, articleSchema } from '../../../src/lib/schema';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  });
}

/** Services relevant to a post, matched via its tags */
function relatedServices(tags: string[]) {
  const tagText = tags.join(' ').toLowerCase();
  return services
    .filter((s) => {
      if (tagText.includes('rag') && s.slug === 'rag-development') return true;
      if ((tagText.includes('llm') || tagText.includes('ai safety')) && s.slug === 'llm-development') return true;
      if ((tagText.includes('agent') || tagText.includes('automation')) && s.slug === 'ai-agent-development') return true;
      if (tagText.includes('aws') && s.slug === 'full-stack-development') return true;
      if ((tagText.includes('data') || tagText.includes('ml')) && s.slug === 'ai-automation') return true;
      return false;
    })
    .slice(0, 2);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = (post.related ?? [])
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const serviceLinks = relatedServices(post.tags);

  return (
    <PageShell
      breadcrumbs={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]}
    >
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          tags: post.tags,
        })}
      />

      <article className="max-w-3xl mx-auto">
        {/* Header — same visual language as the original blog modal */}
        <header className="cyber-glass-strong p-5 md:p-7 mb-8">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-code text-[10px] text-cyber-green uppercase tracking-widest">
                Decrypted Data
              </span>
            </div>
            <div className="flex items-center gap-3 font-code text-xs text-cyber-blue-dim">
              <time dateTime={post.date}>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
          <h1 className="font-cyber text-xl md:text-2xl text-cyber-blue uppercase tracking-wider">
            {post.title}
          </h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="neon-badge text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          <p className="font-code text-xs text-cyber-blue-dim mt-4">
            By{' '}
            <Link href="/about/" className="text-cyber-blue hover:text-neon-pink transition-colors">
              Pavan Sharma
            </Link>{' '}
            — AI Agent Developer &amp; Full Stack Engineer
          </p>
        </header>

        {/* Article body */}
        <div className="cyber-glass p-5 md:p-7">
          <BlogMarkdown content={post.content} />
        </div>

        {/* Related services */}
        {serviceLinks.length > 0 && (
          <aside className="mt-10">
            <p className="font-code text-xs text-neon-pink tracking-widest uppercase mb-4">
              {'// Need this built for your business?'}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {serviceLinks.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="cyber-glass p-4 block group hover:shadow-neon transition-shadow"
                >
                  <p className="font-cyber text-sm text-cyber-blue group-hover:text-neon-pink transition-colors">
                    {s.icon} {s.shortTitle}
                  </p>
                  <p className="font-code text-xs text-cyber-blue-dim mt-2 line-clamp-2">
                    {s.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <aside className="mt-10">
            <p className="font-code text-xs text-neon-pink tracking-widest uppercase mb-4">
              {'// Related transmissions'}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}/`}
                  className="cyber-glass p-4 block group hover:shadow-neon transition-shadow"
                >
                  <p className="font-cyber text-sm text-cyber-blue group-hover:text-neon-pink transition-colors line-clamp-2">
                    {r.title}
                  </p>
                  <p className="font-code text-[10px] text-cyber-blue-dim mt-2">
                    {r.date} • {r.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/contact/" className="cyber-button-pink inline-block px-8 py-3 text-sm">
            ⚡ Work With Me
          </Link>
          <p className="mt-4">
            <Link href="/blog/" className="font-code text-xs text-cyber-blue-dim hover:text-cyber-blue transition-colors">
              ← Back to all transmissions
            </Link>
          </p>
        </div>
      </article>
    </PageShell>
  );
}
