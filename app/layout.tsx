import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'OnushilonHub - Excel in HSC & SSC Grammar with Smart Learning',
  description: 'Get all board questions, rules, and topic-wise analysis in one place. Filter by board, year, or chapter. Master HSC and SSC grammar with strategic learning.',
  keywords: 'HSC grammar, SSC grammar, board questions, Bangladesh education, English grammar, exam preparation',
  authors: [{ name: 'OnushilonHub' }],
  creator: 'OnushilonHub',
  publisher: 'OnushilonHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://onushilonhub.com'),
  openGraph: {
    title: 'OnushilonHub - Excel in HSC & SSC Grammar',
    description: 'Get all board questions, rules, and topic-wise analysis in one place. Master HSC and SSC grammar with strategic learning.',
    type: 'website',
    locale: 'en_US',
    siteName: 'OnushilonHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnushilonHub - Excel in HSC & SSC Grammar',
    description: 'Get all board questions, rules, and topic-wise analysis in one place. Master HSC and SSC grammar with strategic learning.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={poppins.variable}>
      <body className={`${poppins.className} bg-sf-bg text-sf-text antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}