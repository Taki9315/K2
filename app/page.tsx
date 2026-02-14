import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Users,
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
  Award,
} from 'lucide-react';
import VideoCards from '@/components/VideoCards';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fast Track Funding
              <p className="text-2xl text-primary/90 mt-4">
                <span className="text-slate-500">
                  Rapid Results, Higher Returns.
                </span>
              </p>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Master Business Financing{' '}
              With Expert Guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/workbook">
                  Download Workbook
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/membership">
                  Join Membership
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Trusted by entrepreneurs and borrowers nationwide
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Borrower Education Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most borrowers fail not from lack of ambition, but from lack of
              preparation. We change that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="text-xl">
                  Avoid Costly Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn what lenders look for, what disqualifies you, and how
                  to position yourself for approval before you apply.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="text-xl">
                  Qualify for Better Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Understand how to improve your credit profile, cash flow
                  presentation, and business plan to secure favorable rates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="text-xl">
                  Save Time and Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stop applying blindly. Get a clear roadmap that shows exactly
                  what you need to do, in the right order.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Borrower Preparation Workbook
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A comprehensive, step-by-step guide that walks you through
                everything you need to prepare for financing. No fluff, just
                actionable frameworks.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Credit analysis and improvement strategies',
                  'Cash flow documentation best practices',
                  'Business plan frameworks that lenders approve',
                  'Collateral positioning and presentation',
                  'Application checklists and timelines',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/workbook">
                  Get the Workbook
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-slate-200">
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                <Image
                  src="/assets/Lender_Logo.png"
                  alt="Lender Logo"
                  width={510}
                  height={225}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-semibold">PDF Download</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-semibold">50+ Pages</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-2xl">$97</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-50 rounded-xl shadow-xl p-8 border-2 border-slate-200">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src="/assets/Borrower_Logo.png"
                    alt="Borrower Logo"
                    width={510}
                    height={225}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Member Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Monthly Q&A sessions',
                      'Exclusive video library',
                      'Direct support channel',
                      'Priority updates',
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Financing Acceleration Program
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Go beyond the workbook. Get ongoing support, exclusive content,
                and direct access to expert guidance as you navigate your
                financing journey.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Monthly live Q&A calls with lending experts',
                  'Private member community and forum',
                  'Advanced training videos and case studies',
                  'Document review and feedback',
                  'Early access to new resources',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/membership">
                  Join the Program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Educational Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start learning today with our free resources. No registration
              required.
            </p>
          </div>

          <VideoCards />

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className='hover:bg-primary hover:text-primary-foreground'>
              <Link href="/content">
                View All Free Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Financing Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join hundreds of borrowers who have successfully secured funding
            with the right preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 border-white hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/workbook">Start With the Workbook</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 border-white hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/membership">Explore Membership</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
