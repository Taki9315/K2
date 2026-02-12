import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AssistantLauncher } from '@/components/assistant/AssistantLauncher';

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
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <AssistantLauncher />
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
