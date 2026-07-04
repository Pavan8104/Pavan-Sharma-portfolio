import Link from 'next/link';
import Navbar from '../Navbar';
import ScanLines from '../effects/ScanLines';
import SiteFooter from './SiteFooter';
import { JsonLd, breadcrumbSchema } from '../../lib/schema';

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Shared shell for inner pages: existing cyberpunk chrome (Navbar, ScanLines),
 * breadcrumbs with BreadcrumbList schema, and the SEO footer.
 * Server component — page content stays crawlable static HTML.
 */
export default function PageShell({
  breadcrumbs,
  children,
}: {
  breadcrumbs?: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cyber-black text-cyber-blue relative">
      <ScanLines />
      <Navbar entranceDelay={0} />

      <main className="relative z-10 pt-24 pb-8 min-h-screen">
        <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <>
              <JsonLd data={breadcrumbSchema(breadcrumbs)} />
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 font-code text-xs text-cyber-blue-dim">
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <li key={crumb.path} className="flex items-center gap-2">
                        {i > 0 && <span className="text-neon-pink">/</span>}
                        {isLast ? (
                          <span className="text-cyber-blue">{crumb.name}</span>
                        ) : (
                          <Link href={crumb.path === '/' ? '/' : `${crumb.path}/`} className="hover:text-cyber-blue transition-colors">
                            {crumb.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </>
          )}
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
