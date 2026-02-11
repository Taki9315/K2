import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  Star,
  Shield,
} from 'lucide-react';

const WORKBOOK_HERO_IMAGE =
  'https://images.pexels.com/photos/6801643/pexels-photo-6801643.jpeg?auto=compress&cs=tinysrgb&w=1400';

const WORKBOOK_FEATURES = [
  {
    title: 'Credit Analysis Framework',
    description:
      'Understand how lenders evaluate your credit, identify weaknesses, and create an action plan to improve your profile.',
    image:
      'https://images.pexels.com/photos/7947656/pexels-photo-7947656.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Cash Flow Documentation System',
    description:
      'Learn what financial documents lenders require, how to organize them, and how to present your cash flow story effectively.',
    image:
      'https://images.pexels.com/photos/8729952/pexels-photo-8729952.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Business Plan Templates',
    description:
      'Proven frameworks for creating business plans that lenders actually read and approve. Includes real examples.',
    image:
      'https://images.unsplash.com/photo-1758518729711-1cbacd55efdb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Collateral Positioning Guide',
    description:
      'How to identify, value, and present collateral in a way that maximizes your borrowing capacity.',
    image:
      'https://images.unsplash.com/photo-1758518727734-98f0a55983b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Application Checklists',
    description:
      'Complete checklists for SBA loans, term loans, lines of credit, and other common financing types.',
    image:
      'https://images.pexels.com/photos/6801643/pexels-photo-6801643.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Lender Comparison Worksheets',
    description:
      'Tools to evaluate different lenders, compare terms, and make informed decisions about where to apply.',
    image:
      'https://images.pexels.com/photos/7947656/pexels-photo-7947656.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function WorkbookPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Rated 5.0 by 200+ borrowers
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Borrower Preparation Workbook
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Stop guessing. Start preparing. A complete, step-by-step system
                to get financing-ready before you apply.
              </p>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl font-bold text-gray-900">$97</span>
                <span className="text-gray-500">One-time payment</span>
              </div>
              <Button size="lg" asChild className="text-lg px-8 py-6 w-full sm:w-auto">
                <Link href="/signup">
                  Get Started
                  <Download className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Instant PDF download. No subscription required.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-slate-200">
              <div
                className="aspect-[3/4] rounded-lg mb-6 bg-cover bg-center"
                style={{ backgroundImage: `url('${WORKBOOK_HERO_IMAGE}')` }}
                aria-label="Workbook planning materials on desk"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Format</span>
                  <span className="font-semibold">PDF Download</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-semibold">50+ Pages</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Worksheets</span>
                  <span className="font-semibold">15 Templates</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Updates</span>
                  <span className="font-semibold">Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to prepare for financing, in one comprehensive
              resource
            </p>
          </div>

          <div className="space-y-6">
            {WORKBOOK_FEATURES.map((item, index) => (
              <Card key={index} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-lg bg-cover bg-center flex-shrink-0 border border-slate-200"
                      style={{ backgroundImage: `url('${item.image}')` }}
                      aria-label={item.title}
                    />
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Financing-Ready?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Download the workbook and start preparing today
          </p>
          <div className="flex items-baseline gap-3 justify-center mb-8">
            <span className="text-5xl font-bold">$97</span>
            <span className="text-slate-300">One-time payment</span>
          </div>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/signup">
              Get Started
              <Download className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-slate-400 mt-4">
            Instant access. Lifetime updates.
          </p>
        </div>
      </section>
    </div>
  );
}
