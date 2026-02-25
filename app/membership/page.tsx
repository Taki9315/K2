// app/membership/page.tsx
// Membership page — focused on K2 Certified Borrower

import Link from 'next/link';

export default function MembershipPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Elite Expertise | Exceptional Outcomes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Become a K2 <span className="text-primary">Certified Borrower</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert guidance, automated deal tools, and direct access to our
            Preferred Lender network — all for a one-time $249 fee with
            lifetime access.
          </p>
          <a
            href="/membership/certified-borrower"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20"
          >
            Get Started — $249 One-Time
          </a>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Close with Confidence
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Built for CRE investors and business owners who want hands-on
              support — whether you&apos;re navigating a complex deal, working
              across asset classes, or simply want experts in your corner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Automated Deal System
              </h3>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Full transaction management platform</li>
                <li>Readiness checklists &amp; document review</li>
                <li>K2 Summit AI chatbot — your CRE co-pilot</li>
                <li>Real-time lender activity tracking</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Preferred Lender Access
              </h3>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Direct submission to vetted lenders</li>
                <li>K2 shops wider network when needed</li>
                <li>$1,500 closing credit at funding</li>
                <li>Faster responses &amp; better terms</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert Support &amp; Community
              </h3>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Monthly live Q&amp;A with K2 experts</li>
                <li>Advanced educational content</li>
                <li>Document review &amp; feedback</li>
                <li>Private borrower community</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DEEP DIVE (moved from homepage)                               */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-50/50 rounded-3xl rotate-2 scale-105" />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
                Expert Guidance Fast Track
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
                For a one-time $249 fee, you get lifetime access to our full
                transaction management system, our Preferred Lender network,
                monthly live Q&amp;A sessions, document review and feedback, and
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
              <a
                href="/membership/certified-borrower"
                className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20"
              >
                Become a K2 Certified Borrower
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '1', text: 'Pay $249 once — get instant lifetime access' },
              { num: '2', text: 'Build & polish your deal with Summit AI & checklists' },
              { num: '3', text: 'Submit to Preferred Lenders (or K2 shops broader)' },
              { num: '4', text: 'Close your deal — collect $1,500 credit' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold mb-4">
                  {step.num}
                </div>
                <p className="text-gray-700 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/membership/certified-borrower"
              className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20"
            >
              Become a Certified Borrower
            </a>
          </div>
        </div>
      </section>

      {/* Fee Transparency */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              How We Earn — Full Transparency
            </h3>
            <p className="text-gray-600 mb-4">
              K2 Commercial Finance receives a flat success fee only when you
              close a loan through one of our Preferred Lenders:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li>2% on loans under $500,000</li>
              <li>1.5% on loans $500,000 – $1,000,000</li>
              <li>1% on loans above $1,000,000</li>
            </ul>
            <p className="text-sm text-gray-500 italic">
              This fee is paid by the lender — not by you. It&apos;s standard
              in the industry and fully disclosed upfront, so there are never
              any surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Our Members Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &ldquo;K2&apos;s vetting gave me confidence in the
                lenders — closed my deal faster than expected.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">— Michael R., First-Time CRE Borrower</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &ldquo;Vetted lenders plus the closing credit made it worth
                every dollar.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">— Sarah L., Small Business Owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lender / Vendor Inquiry */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-4">
            Are you a lender or vendor interested in joining the K2 network?
          </p>
          <Link
            href="/partnership"
            className="inline-block text-primary font-semibold text-sm border border-primary rounded-lg px-6 py-2.5 hover:bg-primary hover:text-white transition"
          >
            Inquire About Becoming a Preferred Lender or Vendor
          </Link>
        </div>
      </section>
    </main>
  );
}
