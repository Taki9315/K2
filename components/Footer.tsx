import Link from 'next/link';
import { Mail, Linkedin, X, Facebook } from 'lucide-react';

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              K2C Finance
            </h3>
            <p className="text-primary/90 text-sm mb-4">
              Empowering borrowers with the knowledge and tools to secure
              financing and build successful businesses.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:ken@k2cfinance.com"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/k2c-finance"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/kenkap"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@k2Commercial_Finance"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/k2commercialfinance?locale=es_LA"
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href='https://www.tiktok.com/@k2commercialfinance'
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <TiktokIcon className="h-5 w-5" />
              </a>
              <a
                href='https://www.instagram.com/k2commercialfinance'
                className="text-primary/70 hover:text-primary transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />

              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/workbook"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  Borrower Workbook
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  Membership Program
                </Link>
              </li>
              <li>
                <Link
                  href="/content"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  Free Content
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/partnership"
                  className="text-sm text-primary/90 hover:text-primary transition-colors"
                >
                  Partnership Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} K2C Finance. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
