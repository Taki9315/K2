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
  Sparkles,
  Users,
  DollarSign,
  Quote,
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
    title: 'Start Here - Learn the Fundamentals for Free',
    idealFor:
      'You\'re exploring your options, getting familiar with how commercial financing works, or just want to make sure you\'re headed in the right direction.',
    bullets: [
      'Full access to our free video library and articles — no signup, no strings attached.',
      'Learn about loan programs, what lenders actually look for, common mistakes, and how to prepare before you ever fill out an application.',
      'Walk away with the confidence to ask better questions, compare offers, and spot red flags early.',
    ],
    commitment: '$0 — just your time and curiosity.',
    cta: { label: 'Start Learning for Free', href: '/content' },
  },
  {
    step: 2,
    icon: FileCheck,
    title: 'Go Independent - The Financing Success Kit',
    idealFor:
      'You know you want to move forward and you\'d rather do it on your own - with the right tools, templates, and a clear roadmap to follow.',
    bullets: [
      'Our Financing Success Kit gives you 50+ pages of step-by-step guidance, 15+ worksheets and templates - everything you need to package your deal like a pro.',
      'Learn how to choose the right loan type, organize the documents lenders love to see, compare your options side by side, and avoid the missteps that stall or kill deals.',
      'Includes our Document Vault, lender comparison tools, and checklists - all yours to keep, with instant PDF download.',
    ],
    commitment: '$15 one-time. No subscriptions, no upsells.',
    cta: { label: 'Get the Financing Success Kit - $15', href: '/workbook' },
  },
  {
    step: 3,
    icon: Headphones,
    title: 'Get Expert Support - Become a K2 Certified Borrower',
    idealFor:
      'You want hands-on guidance, access to our lender network, and personalized support to navigate complex deals or maximize your terms - no matter the asset class.',
    bullets: [
      'One-time $150 fee for lifetime access as a K2 Certified Borrower - no recurring charges.',
      'A full transaction management system to upload documents, track your progress, and stay organized from application to closing.',
      'Direct access to our Preferred Lender network, covering virtually every program and asset type.',
      'Monthly live Q&A sessions, advanced video content, case studies, document review and feedback, plus a private borrower community.',
      'A $1,500 closing credit applied at funding when you close with any K2 Preferred Lender - it comes right off your costs.',
    ],
    feeTransparency: {
      title: 'How We Earn - Full Transparency',
      text: 'K2 Commercial Finance receives a flat success fee only when you close a loan through one of our Preferred Lenders:',
      tiers: [
        '2% on loans under $500,000',
        '1.5% on loans $500,000 - $1,000,000',
        '1% on loans above $1,000,000',
      ],
      footnote:
        'This fee is paid by the lender - not by you. It\'s standard in the industry and fully disclosed upfront, so there are never any surprises. When you\'re well-prepared, everyone wins - better deals, smoother closings, and stronger outcomes all around.',
    },
    commitment: '$150 one-time - with real payback potential through your closing credit.',
    cta: {
      label: 'Become a K2 Certified Borrower',
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 py-24 md:py-36">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-radial from-primary/[0.03] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Trusted by entrepreneurs and borrowers nationwide
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 leading-[1.1] tracking-tight">
              Fast Track Funding
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-500 mb-6">
              Rapid Results, Higher Returns.
            </p>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
                Welcome — you&apos;re in the right place. Whether you&apos;re just starting
                to explore commercial financing or you&apos;re ready to move, we&apos;ve
                built three clear paths to help you get there. Learn at your own
                pace for free, grab our toolkit and go independent, or work with
                us directly and earn a $1,500 closing credit along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Link href="/workbook">
                  Download Workbook
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                <Link href="/membership">
                  Join Membership
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* ============================================================ */}
      {/*  CHOOSE YOUR PATH                                             */}
      {/* ============================================================ */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Your Journey, Your Choice</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Three Paths - Pick the One That Fits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everyone starts somewhere different, and that&apos;s perfectly fine.
              We&apos;ve laid out three straightforward options so you can jump in
              wherever it makes the most sense for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PATHS.map((item) => {
              const isFeatured = item.step === 3;
              return (
                <Card
                  key={item.step}
                  className={`relative flex flex-col rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full ${
                    isFeatured
                      ? 'border-2 border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20'
                      : 'border border-slate-200 hover:border-primary/30'
                  }`}
                >
                  {isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                        <Star className="h-3.5 w-3.5 fill-white" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-white text-lg font-bold shadow-sm ${
                        isFeatured ? 'bg-primary' : 'bg-slate-800'
                      }`}>
                        {item.step}
                      </div>
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        isFeatured ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-snug">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-primary/90 mt-3 leading-relaxed">
                      <span className="font-semibold">Best if:</span> {item.idealFor}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                          What You Get
                        </p>
                        <ul className="space-y-3">
                          {item.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {'feeTransparency' in item && item.feeTransparency && (
                        <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 text-sm">
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
                    <div className="mt-auto pt-6 flex-shrink-0 space-y-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700">
                          {item.commitment}
                        </p>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className={`w-full ${
                          isFeatured
                            ? 'shadow-md shadow-primary/20'
                            : ''
                        }`}
                        variant={isFeatured ? 'default' : 'outline'}
                      >
                        <Link href={item.cta.href}>
                          {item.cta.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReadinessQuiz />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY BORROWER EDUCATION MATTERS                               */}
      {/* ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Be Prepared</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Why Preparation Makes All the Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The borrowers who get the best terms aren&apos;t always the biggest — they&apos;re
              the best prepared. Here&apos;s how a little upfront work pays off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Avoid Costly Mistakes',
                text: 'Understanding what lenders look for — and what raises red flags — helps you position yourself for approval before you ever submit an application.',
              },
              {
                icon: TrendingUp,
                title: 'Qualify for Better Terms',
                text: 'When you know how to present your credit profile, cash flow, and business plan clearly, lenders are more likely to offer you favorable rates and terms.',
              },
              {
                icon: BarChart3,
                title: 'Faster Approvals, Higher Leverage',
                text: "A clean, well-organized package tells lenders you're serious. That kind of professionalism often means faster decisions and stronger offers.",
              },
            ].map((card) => (
              <Card key={card.title} className="group border border-slate-200 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{card.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LOAN TYPES & PREP GUIDES                                     */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Know Your Options</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 border border-yellow-200 px-4 py-1.5 text-sm font-medium text-yellow-800 mb-6">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                Rated 5.0 by 200+ borrowers
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Financing Success Kit
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Everything you need in one place: 50+ pages of clear, actionable
                guidance along with 15+ worksheets and templates. It walks you
                through selecting the right loan type, pulling together the
                documents lenders want to see, comparing your options, and
                sidestepping the mistakes that slow deals down.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Preparing for Financing Success',
                  'Understanding and Selecting the loan program best suited for your unique situation',
                  'Finding the right lender — hint... it may not be your local bank',
                  'Navigating Underwriting and Closing your deal',
                  'Document Vault — All the forms a lender may request, ready for download',
                  'Lender Comparison Worksheets',
                ].map((feature) => (
                  <li key={feature} className="flex items-start group">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0 mt-0.5 group-hover:bg-green-200 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Link href="/workbook">
                  Get the Financing Success Kit — $15
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-50/50 rounded-3xl -rotate-2 scale-105" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-8">
                  <Image
                    src="/assets/Lender_Logo.png"
                    alt="Lender Logo"
                    width={510}
                    height={225}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Format', value: 'PDF Download' },
                    { label: 'Pages', value: '50+ Pages' },
                    { label: 'Templates', value: '15 Worksheets' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                      <span className="text-gray-500 text-sm">{row.label}</span>
                      <span className="font-semibold text-gray-900">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-500 text-sm">Price</span>
                    <span className="font-bold text-3xl text-primary">$15</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                  */}
      {/* ============================================================ */}
      {/* <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Social Proof</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              What Other Borrowers Are Saying
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from borrowers who took the time to prepare — and
              saw the difference it made when it counted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="group border border-slate-200 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex mb-4">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {t.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t.author}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* ============================================================ */}
      {/*  K2 CERTIFIED BORROWER (PATH 3 DEEP DIVE)                     */}
      {/* ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-50/50 rounded-3xl rotate-2 scale-105" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                  <div className="aspect-video bg-gradient-to-br from-slate-50 to-white rounded-xl flex items-center justify-center mb-8">
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
                        <li key={benefit} className="flex items-center group">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0 group-hover:bg-green-200 transition-colors">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Headphones className="h-4 w-4" />
                Expert Guidance + $1,500 Closing Credit
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Become a K2 Certified Borrower
              </h2>
              <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                Built for borrowers who want hands-on support — whether you&apos;re
                navigating a complex deal, working across asset classes, or
                simply want the confidence that comes from having experts in
                your corner.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                For a one-time $150 fee, you get lifetime access to our full
                transaction management system, our Preferred Lender network,
                monthly live Q&A sessions, document review and feedback, and
                more. And when you close with a K2 Preferred Lender, you
                receive a $1,500 closing credit applied directly at funding.
              </p>
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 mb-10">
                <p className="font-semibold text-gray-900 mb-2">
                  How We Earn — Full Transparency
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  K2 Commercial Finance receives a flat success fee only when
                  you close a loan through one of our Preferred Lenders:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 mb-3 space-y-1">
                  <li>2% on loans under $500,000</li>
                  <li>1.5% on loans $500,000 – $1,000,000</li>
                  <li>1% on loans above $1,000,000</li>
                </ul>
                <p className="text-xs text-gray-500 italic">
                  This fee is paid by the lender — not by you. It&apos;s standard
                  in the industry and fully disclosed upfront, so there are
                  never any surprises.
                </p>
              </div>
              <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                <Link href="/membership/certified-borrower">
                  Become a K2 Certified Borrower
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Start Learning</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Free Educational Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start learning today with our free resources. No registration
              required.
            </p>
          </div>

          <VideoCards />

          <div className="text-center mt-14">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
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
      <section className="relative py-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-8">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hundreds of borrowers have used K2 to get prepared, find the right
            lender, and close on their terms. Wherever you are in the process,
            there&apos;s a path here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              <Link href="/workbook">
                Get the Financing Success Kit — $15
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/membership/certified-borrower">
                Become a K2 Certified Borrower
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
