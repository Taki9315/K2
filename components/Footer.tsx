import Link from 'next/link';
import { Mail, Linkedin, Twitter, X } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              BorrowerEd
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
                  Free Resources
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
            © {new Date().getFullYear()} BorrowerEd. All rights reserved.
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
