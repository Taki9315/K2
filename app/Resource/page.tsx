import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calculator,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Wrench,
} from 'lucide-react';

type Resource = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  badge?: string;
};

const resources: Resource[] = [
  {
    title: 'Mortgage Payment Calculator',
    description:
      'Run the numbers before you apply. This free calculator shows your estimated monthly payment, total interest, and full cost of any loan scenario — so you can walk into a lender meeting with confidence.',
    href: '/calculator',
    icon: <Calculator className="h-6 w-6" />,
    badge: 'Free Tool',
  },
  {
    title: 'Borrower Preparation Workbook',
    description:
      'The step-by-step guide that walks you through everything lenders want to see. Stop guessing and start preparing like a pro — this is the same framework used by borrowers who close deals.',
    href: '/workbook',
    icon: <BookOpen className="h-6 w-6" />,
    badge: '$14.95',
  },
  // ──────────────────────────────────────────────
  // AFFILIATE LINKS — Add new resources below.
  // Copy the template and fill in title, description,
  // href (the affiliate URL), and set external: true.
  // ──────────────────────────────────────────────
  // {
  //   title: 'Product Name',
  //   description:
  //     'A persuasive 2-3 sentence blurb about the product.',
  //   href: 'https://affiliate-link.com',
  //   external: true,
  //   icon: <Wrench className="h-6 w-6" />,
  //   badge: 'Partner',
  // },
];

export default function ResourcePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resource Library
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Curated tools, guides, and partner products to help you navigate
            commercial financing with confidence.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {resources.map((resource) => {
              const isExternal = resource.external;

              return (
                <Link
                  key={resource.title}
                  href={resource.href}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="block group"
                >
                  <Card className="border-2 transition-all hover:shadow-lg hover:border-primary/30">
                    <CardContent className="flex items-start gap-5 p-6 md:p-8">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {resource.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {resource.title}
                          </h2>
                          {resource.badge && (
                            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">
                              {resource.badge}
                            </span>
                          )}
                          {isExternal && (
                            <ExternalLink className="h-4 w-4 shrink-0 text-gray-400" />
                          )}
                        </div>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                          {resource.description}
                        </p>
                      </div>

                      <ArrowRight className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-primary transition-colors mt-1 hidden sm:block" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {resources.length <= 2 && (
            <div className="mt-12 text-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 px-6">
              <Wrench className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">
                More resources coming soon — partner tools, templates, and
                curated products for borrowers.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-slate-300">
            The Borrower Preparation Workbook gives you everything you need
            to present yourself as a borrower banks want to work with.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/workbook">
                Get the Workbook
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/membership">Explore Membership</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
