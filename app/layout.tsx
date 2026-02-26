import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { LayoutShell } from '@/components/LayoutShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'K2C - Financing Education Platform',
  description: 'Empowering borrowers with the knowledge and tools to secure financing and build successful businesses.',
  openGraph: {
    images: [
      {
        url: 'public/logo2.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'public/logo2.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutShell>{children}</LayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
