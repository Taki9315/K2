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
  Zap,
  FileCheck,
  Compass,
  Headphones,
  Star,
  MessageCircle,
  BarChart3,
  Award,
} from 'lucide-react';
import VideoCards from '@/components/VideoCards';
import { ReadinessQuiz } from '@/components/ReadinessQuiz';
import { LoanTypesGuide } from '@/components/LoanTypesGuide';
import { StatsCounter } from '@/components/StatsCounter';

const ROADMAP_STEPS = [
  {
    step: 1,
    icon: Zap,
    title: 'Get Prepared Fast',
    description:
      'Start with free videos or grab the workbook in minutes. No guesswork — clear frameworks from day one.',
    cta: { label: 'Browse Free Content', href: '/content' },
  },
  {
    step: 2,
    icon: FileCheck,
    title: 'Build Your Strong Profile',
    description:
      'Use templates to organize docs, select the right loan program, and identify your ideal lenders.',
    cta: { label: 'Get the Workbook', href: '/workbook' },
  },
  {
    step: 3,
    icon: Compass,
    title: 'Streamline Your Prep',
    description:
      'Upload and manage your preparation documents in a simple vault. Checklists keep you on track.',
    cta: { label: 'View Resources', href: '/Resource' },
  },
  {
    step: 4,
    icon: Headphones,
    title: 'Get Expert Acceleration',
    description:
      'Join for live Q&A, document reviews, and community guidance to close deals faster and on better terms.',
    cta: { label: 'Join the Program', href: '/membership' },
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The workbook helped me organize everything before I even talked to a lender. I got approved on the first try with better terms than I expected.',
    author: 'Michael R.',
    role: 'First-Time CRE Borrower',
    stars: 5,
  },
  {
    quote:
      'I wasted months applying to the wrong lenders. K2 showed me how to identify the right ones and present my deal the way they want to see it.',
    author: 'Sarah L.',
    role: 'Small Business Owner',
    stars: 5,
  },
  {
    quote:
      'The monthly Q&A calls alone are worth the membership. Having an expert review my loan package saved me from costly mistakes.',
    author: 'David K.',
    role: 'Multi-Property Investor',
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Zap className="h-4 w-4" />
                Trusted by 500+ borrowers nationwide
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Fast-Track Your{' '}
                <span className="text-primary">Financing Success</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-2 leading-relaxed">
                Get Institutional-Ready in Minutes.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;This $14.95 Success Kit will position you as a borrower
                the Banks will WANT to work with — and your transaction as one
                they will want to fund.&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" asChild className="text-lg px-8 py-6 shadow-lg shadow-primary/20">
                  <Link href="/workbook">
                    Get Your Success Kit — $14.95
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href="/content">
                    Start Free
                    <BookOpen className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Instant PDF download
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  No subscription
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Lifetime access
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <Image
                src="/book_cover.png"
                alt="K2 Borrower Preparation Workbook"
                width={480}
                height={620}
                className="rounded-xl shadow-2xl object-contain max-h-[520px] w-auto"
                priority
              />
              <Link
                href="/workbook"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border-2 border-yellow-500 bg-yellow-400 px-8 py-3 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-yellow-300 hover:shadow-lg hover:scale-105"
              >
                Learn More
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS — 4-STEP ROADMAP                                */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Borrower Success Roadmap
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven 4-step journey that turns preparation into approvals.
              Start anywhere — every step gets you closer to funding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ROADMAP_STEPS.map((item) => (
              <div key={item.step} className="relative group">
                <Card className="h-full border-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-lg font-bold shadow-sm">
                        {item.step}
                      </div>
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                    <Link
                      href={item.cta.href}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {item.cta.label}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
                {item.step < 4 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 h-8 w-8 items-center justify-center text-slate-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="shadow-lg shadow-primary/20">
              <Link href="/workbook">
                Launch Your Financing Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS & SOCIAL PROOF                                         */}
      {/* ============================================================ */}
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTIVE READINESS QUIZ                                    */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReadinessQuiz />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY BORROWER EDUCATION MATTERS                               */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Preparation Wins Better Deals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most borrowers fail not from lack of ambition, but from lack of
              preparation. We change that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Avoid Costly Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn what lenders look for, what disqualifies you, and how to
                  position yourself for approval before you apply.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
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
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Faster Approvals, Higher Leverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  A well-prepared package signals professionalism. Lenders
                  compete harder for borrowers who make underwriting easy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LOAN TYPES & PREP GUIDES                                     */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Know Your Loan Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding available programs is the first step to choosing the
              right one. Expand each to see what lenders look for, common
              pitfalls, and a prep tip linked to the workbook.
            </p>
          </div>

          <LoanTypesGuide />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE BORROWER PREPARATION WORKBOOK                            */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-medium text-yellow-800 mb-4">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                Rated 5.0 by 200+ borrowers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Borrower Preparation Workbook
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                A comprehensive, step-by-step guide that walks you through
                everything you need to prepare for financing. No fluff — just
                actionable frameworks used by experienced borrowers.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Preparing for Financing Success',
                  'Understanding and Selecting the loan program best suited for your unique situation',
                  'Finding the right lender — hint... it may not be your local bank',
                  'Navigating Underwriting and Closing your deal',
                  'Document Vault — All the forms a lender may request, ready for download',
                  'Lender Comparison Worksheets',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/workbook">
                  Get the Workbook — $14.95
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
                  <span className="text-gray-600">Templates</span>
                  <span className="font-semibold">15 Worksheets</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-2xl">$14.95</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                  */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Borrowers Who Prepared, Succeeded
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from borrowers who used K2 to get financing-ready — and
              closed deals on their terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINANCING ACCELERATION PROGRAM (ADVISOR / COMMUNITY)         */}
      {/* ============================================================ */}
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
                      'Monthly Q&A with capital markets advisors',
                      'Exclusive advanced video library',
                      'Document review & expert feedback',
                      'Private member community & forum',
                      'Priority access to new tools & updates',
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
                <Headphones className="h-4 w-4" />
                Expert Capital Markets-Style Guidance
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Financing Acceleration Program
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Go beyond the workbook. Get ongoing support, exclusive content,
                and direct access to expert guidance as you navigate your
                financing journey.
              </p>
              <p className="text-gray-600 mb-6">
                Think of it as having a capital markets advisor in your corner —
                reviewing your deals, answering tough questions, and helping you
                present your package like an institutional borrower.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Monthly live Q&A calls with lending experts',
                  'Private member community and forum',
                  'Advanced training videos and case studies',
                  'Document review and feedback',
                  'Side-by-side lender comparison tools',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/membership">
                  Join the Program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FREE EDUCATIONAL CONTENT                                     */}
      {/* ============================================================ */}
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
            <Button
              variant="outline"
              size="lg"
              asChild
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/content">
                View All Free Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                    */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="h-14 w-14 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Take Control of Your Financing Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of borrowers who secured funding with the right
            preparation. Better terms, faster approvals, higher leverage — it
            starts with being ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg"
            >
              <Link href="/workbook">
                Get Prepared in Minutes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 border-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/membership">Explore Membership</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
