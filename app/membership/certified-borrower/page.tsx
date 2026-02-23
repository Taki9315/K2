// app/membership/certified-borrower-sample/page.tsx
// SAMPLE PAGE — Concise Certified Borrower sales page for client review
// View at: /membership/certified-borrower-sample

import Link from 'next/link';
import {
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Lock,
  Send,
  DollarSign,
  Brain,
  FileSearch,
  BarChart3,
  Clock,
  MessageCircle,
  Headphones,
  BookOpen,
  FileText,
  Target,
  TrendingUp,
  Quote,
  Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TRUST_BADGES = [
  { icon: Zap, label: 'Lifetime Access' },
  { icon: Brain, label: 'K2 Summit AI' },
  { icon: Lock, label: 'Secure Data Room' },
  { icon: Send, label: 'Direct Submission' },
  { icon: DollarSign, label: '$1,500 Credit' },
  { icon: Headphones, label: 'K2 Expert Support' },
];

const WHO_BULLETS = [
  'Hate mismatched lenders and rejected packages',
  'Want pro-level preparation without broker fees',
  'Value vetted connections and real incentives',
  'Need smart AI help that catches issues early',
];

const FEATURES = [
  {
    icon: Brain,
    title: 'K2 Summit AI Chatbot — Your CRE Co-Pilot',
    desc: 'Always available, trained on real K2 closings.',
    bullets: [
      'Instant deal health score + fix list',
      'Smart Preferred Lender matching with explanations',
      'Document gap detector & missing-item alerts',
      'Polished narrative / cover letter generator',
      'Red-flag scanner for underwriting risks',
      'Rate, term, and total-cost comparison',
      'Realistic closing timeline predictor',
      'Full conversation memory for your deal',
    ],
    callout:
      'Ask anything — get answers that save weeks and thousands.',
  },
  {
    icon: Target,
    title: 'Deal Setup',
    desc: 'Structured deal builder with guided steps and strong narratives.',
  },
  {
    icon: Lock,
    title: 'Secure K2 Data Room',
    desc: 'Private, branded vault. Upload, organize, reuse files across deals.',
  },
  {
    icon: FileSearch,
    title: 'Readiness Checklists',
    desc: 'Step-by-step tasks to spot gaps before submission.',
  },
  {
    icon: Send,
    title: 'Direct Preferred Lender Submission',
    desc: 'Send polished packages to vetted lenders first → faster, better offers.',
  },
  {
    icon: TrendingUp,
    title: 'Broader Shopping',
    desc: 'K2 shops wider network when needed — no extra cost.',
  },
  {
    icon: BarChart3,
    title: 'Automated Tracking',
    desc: 'Real-time lender activity and follow-up alerts.',
  },
  {
    icon: Headphones,
    title: 'K2 Expert Support',
    desc: 'Monthly Q&A • Advanced videos • Doc review • Private community.',
  },
  {
    icon: DollarSign,
    title: '$1,500 Closing Credit',
    desc: 'Credited at funding from any Preferred Lender.',
  },
];

const STEPS = [
  { num: '1', text: 'Pay $150 once → instant access' },
  { num: '2', text: 'Build & polish deal with Summit AI & checklists' },
  { num: '3', text: 'Submit to Preferred Lenders (or K2 shops broader)' },
  { num: '4', text: 'Close → collect $1,500 credit' },
];

const TESTIMONIALS = [
  {
    quote:
      'K2 Summit AI fixed issues I missed. First submission approved fast.',
    author: 'Michael R.',
    role: 'First-Time CRE Borrower',
  },
  {
    quote:
      'Vetted lenders + credit made it worth every dollar.',
    author: 'Sarah L.',
    role: 'Small Business Owner',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CertifiedBorrowerSample() {
  return (
    <main className="bg-white">
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Shield className="h-4 w-4" />
            Elite Expertise | Exceptional Outcomes
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Become a K2{' '}
            <span className="text-primary">Certified Borrower</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-6">
            One-Time $150 — Professional Financing Tools
          </p>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4 leading-relaxed">
            Pay $150 once. Get lifetime access to K2&apos;s proprietary
            platform.
          </p>

          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Set up deals like a pro • Organize documents securely • Submit
            directly to vetted Preferred Lenders • Earn $1,500 closing credit
            on funded deals through them.
          </p>

          <p className="text-sm font-semibold text-primary mb-10">
            No monthly fees. No surprises.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {TRUST_BADGES.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm"
              >
                <b.icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/membership/certified-borrower"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            Join Now — $150 (One-Time)
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHO THIS IS FOR                                              */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Serious CRE Investors Who…
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHO_BULLETS.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHAT YOU GET                                                 */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              What You Get
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              K2&apos;s Proprietary AI-Integrated Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything a prepared borrower needs — in one place.
            </p>
          </div>

          <div className="space-y-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                      {f.title}
                    </h3>
                    <p className="text-gray-600">{f.desc}</p>

                    {f.bullets && (
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {f.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    {f.callout && (
                      <p className="mt-4 text-sm font-semibold text-primary italic">
                        {f.callout}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PREPCOACH HIGHLIGHT                                          */}
      {/* ============================================================ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            <Sparkles className="h-4 w-4" />
            Included with Certification
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet PrepCoach
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Your personal AI coach that walks you through every preparation
            step — so you show up organized, confident, and lender-ready.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            It doesn&apos;t replace experts — it prepares you to work smarter
            with them. Faster responses, better terms, deals that close.
          </p>
          <Link
            href="/prepcoach"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Explore PrepCoach
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TRANSPARENCY                                                 */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Full Transparency
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                How K2 Earns — Only on Success
              </h2>
            </div>

            <p className="text-gray-700 text-center mb-6">
              K2 receives a flat, lender-paid success fee only when you close
              through a Preferred Lender:
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              {[
                { range: 'Under $500k', rate: '2%' },
                { range: '$500k – $1M', rate: '1.5%' },
                { range: 'Above $1M', rate: '1%' },
              ].map((tier) => (
                <div
                  key={tier.range}
                  className="rounded-xl bg-white border border-slate-200 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">{tier.rate}</p>
                  <p className="text-xs text-gray-500 mt-1">{tier.range}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 text-center italic">
              Disclosed upfront. Never charged to you. Your outcomes drive ours.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Four Steps to a Funded Deal
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold mx-auto mb-4">
                  {s.num}
                </div>
                <p className="text-gray-700 font-medium">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Real Results
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Certified Borrowers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8"
              >
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {t.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t.author}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                    */}
      {/* ============================================================ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready?
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            One-time $150 unlocks the tools and network that win better deals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/membership/certified-borrower"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Become Certified — $150 (One-Time)
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/content"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900"
            >
              <BookOpen className="h-4 w-4" />
              Browse Free Content First
            </Link>
            <Link
              href="/#readiness-quiz"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900"
            >
              <FileText className="h-4 w-4" />
              Take 2-Minute Readiness Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            Lifetime access. $1,500 credit from Preferred Lender at close.
            Lender-paid fees only on funded Preferred deals. Terms apply.
          </p>
        </div>
      </section>
    </main>
  );
}
