import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Headphones,
  Star,
  BarChart3,
  Award,
  MessageCircle,
} from 'lucide-react';
import VideoCards from '@/components/VideoCards';
import { ReadinessQuiz } from '@/components/ReadinessQuiz';
import { LoanTypesGuide } from '@/components/LoanTypesGuide';
import { StatsCounter } from '@/components/StatsCounter';

type PathItem = {
  step: number;
  icon: typeof BookOpen;
  title: string;
  idealFor: string;
  bullets: string[];
  commitment: string;
  cta: { label: string; href: string };
  feeTransparency?: {
    title: string;
    text: string;
    tiers: string[];
    footnote: string;
  };
};

const PATHS: PathItem[] = [
  {
    step: 1,
    icon: BookOpen,
    title: 'Path 1: Build Literacy for Free – Start Learning Today',
    idealFor:
      'Borrowers exploring options, building basics, or deciding if financing makes sense right now.',
    bullets: [
      'Instant access to our free video library and articles (no signup needed).',
      'Cover loan programs, common pitfalls, underwriting essentials, and prep strategies.',
      'Gain the knowledge to ask better questions and spot red flags early.',
    ],
    commitment: '$0 – Time investment only.',
    cta: { label: 'Browse Free Educational Content', href: '/content' },
  },
  {
    step: 2,
    icon: FileCheck,
    title: 'Path 2: Go Independent with Confidence – Financing Success Kit',
    idealFor:
      'Ready borrowers who want to identify the best program, package their deal professionally, and find/match lenders on their own.',
    bullets: [
      'Our comprehensive Financing Success Kit – $15 one-time (50+ pages, 15+ worksheets/templates).',
      'Step-by-step guidance to select the right loan type, organize docs lenders love, compare options, and avoid mistakes that kill deals.',
      'Includes Document Vault, lender comparison tools, checklists – lifetime access, instant PDF download.',
    ],
    commitment: '$15 one-time. No subscription.',
    cta: { label: 'Get the Financing Success Kit – Only $15', href: '/workbook' },
  },
  {
    step: 3,
    icon: Headphones,
    title: 'Path 3: Expert Guidance + $1,500 Closing Credit – Become a K2 Certified Borrower',
    idealFor:
      'Serious borrowers seeking faster approvals, better terms, and personalized support through complex deals or any asset class.',
    bullets: [
      'One-time $150 fee to become a K2 Certified Borrower – lifetime access.',
      'Full automated transaction management system: upload docs, track progress, use checklists.',
      'Direct access to our Preferred Lender network (virtually any program or asset type).',
      'Monthly live Q&A, advanced videos/case studies, document review & feedback, private community.',
      'Exclusive Incentive: $1,500 closing credit applied at funding from any K2 Preferred Lender you close with (reduces your costs directly).',
    ],
    feeTransparency: {
      title: 'Full Transparency on How We Earn',
      text: 'K2 Commercial Finance receives a flat success fee only on closed loans you fund through our Preferred Lenders:',
      tiers: [
        '2% on loans under $500,000',
        '1.5% on loans $500,000 – $1,000,000',
        '1% on loans above $1,000,000',
      ],
      footnote:
        'This fee comes from the lender (not you), is standard in the industry, and is fully disclosed upfront so there are no surprises. Your success is our priority—better preparation means stronger deals for everyone.',
    },
    commitment: '$150 one-time (high-value investment with credit payback potential).',
    cta: {
      label: 'K2 Certified Borrower – $150 + $1,500 Credit',
      href: '/membership/certified-borrower',
    },
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
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                You&apos;ve found us. Now choose your path: Free education to get
                smarter… a one-time toolkit to go independent… or expert
                guidance with a $1,500 closing credit to accelerate results.
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
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Trusted by entrepreneurs and borrowers nationwide
            </p>
          </div>
        </div>
      </section>
      {/* ============================================================ */}
      {/*  CHOOSE YOUR PATH                                             */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path to Financing Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Since landing here, every borrower has three clear options. Pick
              the one that matches your readiness and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-stretch md:overflow-hidden md:rounded-xl md:border-2 md:border-slate-200">
            {PATHS.map((item) => (
              <Card
                key={item.step}
                className="flex flex-col border-2 md:rounded-none md:border-0 md:border-r md:border-slate-200 md:last:border-r-0 hover:border-primary/30 md:hover:border-primary/0 hover:bg-slate-50/50 transition-all duration-300 h-full"
              >
                <CardHeader className="pb-3 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-lg font-bold shadow-sm">
                      {item.step}
                    </div>
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm font-medium text-primary mt-2">
                    Ideal for: {item.idealFor}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        What You Get:
                      </p>
                      <ul className="space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {'feeTransparency' in item && item.feeTransparency && (
                      <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm">
                        <p className="font-semibold text-gray-900 mb-2">
                          {item.feeTransparency.title}
                        </p>
                        <p className="text-gray-600 mb-2">
                          {item.feeTransparency.text}
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mb-2 space-y-1">
                          {item.feeTransparency.tiers.map((tier, i) => (
                            <li key={i}>{tier}</li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 italic">
                          {item.feeTransparency.footnote}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex-shrink-0 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Commitment: {item.commitment}
                    </p>
                    <Button asChild className="w-full">
                      <Link href={item.cta.href}>
                        {item.cta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STATS & SOCIAL PROOF                                         */}
      {/* ============================================================ */}
      {/* <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section> */}

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
                Financing Success Kit
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our comprehensive one-time toolkit: 50+ pages, 15+ worksheets and
                templates. Step-by-step guidance to select the right loan type,
                organize docs lenders love, compare options, and avoid mistakes
                that kill deals.
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
                  Get the Financing Success Kit – Only $15
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
                  <span className="font-semibold text-2xl">$15</span>
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
      {/*  K2 CERTIFIED BORROWER (PATH 3 DEEP DIVE)                     */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-50 rounded-xl shadow-xl p-8 border-2 border-slate-200">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center mb-6">
                  <Image
                    src="/assets/Borrower_Logo.png"
                    alt="K2 Certified Borrower"
                    width={510}
                    height={225}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    What You Get
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Full automated transaction management system',
                      'Direct access to Preferred Lender network',
                      'Monthly live Q&A, document review & feedback',
                      'Private community & advanced content',
                      '$1,500 closing credit at funding',
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
                Expert Guidance + $1,500 Closing Credit
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Become a K2 Certified Borrower
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Ideal for serious borrowers seeking faster approvals, better
                terms, and personalized support through complex deals or any
                asset class.
              </p>
              <p className="text-gray-600 mb-6">
                One-time $150 fee for lifetime access. Full transaction
                management, Preferred Lender network, monthly Q&A, document
                review, and more. Plus: $1,500 closing credit applied at
                funding from any K2 Preferred Lender you close with.
              </p>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 mb-8">
                <p className="font-semibold text-gray-900 mb-2">
                  Full Transparency on How We Earn
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  K2 Commercial Finance receives a flat success fee only on
                  closed loans you fund through our Preferred Lenders:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-2 space-y-1">
                  <li>2% on loans under $500,000</li>
                  <li>1.5% on loans $500,000 – $1,000,000</li>
                  <li>1% on loans above $1,000,000</li>
                </ul>
                <p className="text-xs text-gray-500 italic">
                  This fee comes from the lender (not you), is standard in the
                  industry, and is fully disclosed upfront so there are no
                  surprises.
                </p>
              </div>
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/membership/certified-borrower">
                  Become a K2 Certified Borrower – $150 + $1,500 Credit
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
                Browse Free Educational Content
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
                Get the Financing Success Kit – Only $15
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 border-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/membership/certified-borrower">
                Become a K2 Certified Borrower – $150 + $1,500 Credit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
