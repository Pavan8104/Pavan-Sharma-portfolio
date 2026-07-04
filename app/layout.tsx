import type { Metadata, Viewport } from 'next';
import { Orbitron, Fira_Code } from 'next/font/google';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, PERSON } from '../src/lib/seo';
import { JsonLd, personSchema, websiteSchema } from '../src/lib/schema';
import '../src/index.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pavan Sharma | AI Agent Developer & Full Stack Engineer',
    template: '%s | Pavan Sharma',
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.png',
  },
  other: {
    'indexnow-key': 'c65e5f12bae84c3bbe7a2dcc70033b5c',
    'geo.region': 'IN-PB',
    'geo.placename': 'Punjab, India',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${firaCode.variable}`}>
      <head>
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
