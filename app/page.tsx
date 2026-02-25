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
  Star,
  Zap,
  BarChart3,
  Award,
  MessageCircle,
  Sparkles,
  Users,
  Quote,
  Bot,
} from 'lucide-react';
import { ReadinessQuiz } from '@/components/ReadinessQuiz';
import { PathsAccordion } from '@/components/PathsAccordion';

const TESTIMONIALS = [
  {
    quote:
      'The Success Kit helped me organize everything before I even talked to a lender. I got approved on the first try with better terms than I expected.',
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
                Fast-Track Your {` `}
                <span className="text-primary">Commercial Financing Success</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-2 leading-relaxed">
                Elite Expertise | Exceptional Outcomes
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                This $15 Success Kit positions you as the borrower banks WANT to fund and your deal as one they’ll compete for.
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
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Prepared Borrower Guarantee
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <Image
                src="/book_cover.png"
                alt="K2 Financing Success Kit"
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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you&apos;re a commercial real estate investor or business owner pursuing financing for rental, multifamily, retail, mixed use, industrial, office, or owner-occupied business properties, you&apos;re in the right place.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              We help you avoid common pitfalls and position your deal so lenders compete for it. Depending on your immediate needs, pick from these three paths:
            </p>
          </div>

          <PathsAccordion />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  READINESS QUIZ (GREEN BAR)                                   */}
      {/* ============================================================ */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <ReadinessQuiz />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MEET PREPCOACH                                               */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            Built-In AI Agent
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet <span className="text-primary">PrepCoach</span>
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-2xl mx-auto">
            Your personal AI coach that walks you through every preparation
            step — so you show up organized, confident, and lender-ready.
          </p>
          <p className="text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            It doesn&apos;t replace experts — it prepares you to work smarter
            with them. The result? Faster responses, better terms, and deals
            that close.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
              <Link href="/prepcoach">
                Explore PrepCoach
                <Bot className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Link href="/workbook">
                Financing Success Kit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY PREPARATION WINS                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Why Preparation Wins</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Prepared Borrowers Get Better Outcomes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The borrowers who land the best terms aren&apos;t always the biggest — they&apos;re
              the best prepared. A little upfront work pays off in a big way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Avoid Costly Mistakes',
                text: 'Know what lenders look for — and what raises red flags — so you can position yourself for approval before you ever submit an application. Skip the trial-and-error that costs time and money.',
              },
              {
                icon: TrendingUp,
                title: 'Qualify for Better Terms',
                text: 'Present your credit profile, cash flow, and business plan the way lenders want to see it. Prepared borrowers consistently get more favorable rates, lower fees, and stronger offers.',
              },
              {
                icon: BarChart3,
                title: 'Faster Approvals, Higher Leverage',
                text: 'A clean, well-organized loan package signals professionalism. That translates to faster decisions, higher leverage, and lenders competing for your deal instead of the other way around.',
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
      {/* <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Know Your Options</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Know Your Loan Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding available programs is the first step to choosing the
              right one. Expand each to see what lenders look for, common
              pitfalls, and a prep tip linked to the Success Kit.
            </p>
          </div>

          <LoanTypesGuide />
        </div>
      </section> */}



      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                  */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Real Results</p>
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
      </section>

      {/* ============================================================ */}
      {/*  LENDER / VENDOR INQUIRY                                      */}
      {/* ============================================================ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            If you&apos;re interested in joining our network as a preferred lender, or if you&apos;re a commercial real estate service provider,{' '}
            <Link href="/partnership" className="text-primary font-semibold hover:underline">
              click here for more information
            </Link>.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FREE CONTENT TEASE                                           */}
      {/* ============================================================ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Start Learning</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Free Educational Content
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start building your knowledge today — no sign-up, no cost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: BookOpen,
                title: 'Unlock Your Small Business Loan Success',
                type: 'Video',
              },
              {
                icon: Sparkles,
                title: 'Commercial Mortgage Insights with Ken Kaplan',
                type: 'Video',
              },
              {
                icon: MessageCircle,
                title: '5 Mistakes That Kill Small Commercial Loans',
                type: 'Article',
              },
              {
                icon: BarChart3,
                title: 'How to Choose the Right Loan Program',
                type: 'Article',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href="/content"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.type}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
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
            Ready to Take Control?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start free or grab your kit today. Hundreds of borrowers have used
            K2 to get prepared, find the right lender, and close on their
            terms. Pick the path that fits you and get started now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/content">
                Start Free
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              <Link href="/workbook">
                Grab Your Kit — $15
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
                Become a Certified Borrower
                <Users className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
