// app/membership-sample/page.tsx
// SAMPLE PAGE — Grok-generated layout for client review
// View at: /membership-sample
// The site's Navigation and Footer are already provided by layout.tsx

export default function MembershipSample() {
  return (
    <main className="bg-white">
      {/* Hero Section – Educational Hook */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join the K2 CRE Community
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-8">
            Elite Expertise | Exceptional Outcomes – A Vetted Network for
            Investors, Lenders, and Professionals
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Build lasting connections in commercial real estate. We rigorously
            vet every Preferred Lender and Vendor to ensure quality,
            transparency, and borrower-first results. Whether you&apos;re an
            investor seeking funding, a lender looking for qualified deals, or a
            vendor offering CRE services, start here.
          </p>
          <a
            href="#roles"
            className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition"
          >
            Choose Your Role
          </a>
        </div>
      </section>

      {/* Why Vetted Community – Educational Emphasis */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why a Vetted CRE Network Matters
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              In CRE, the wrong partner can cost you time, money, and
              opportunities. K2 vets every participant to create a trusted
              ecosystem—drawing from 20+ years of experience closing $250k–$5M
              deals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Rigorous Vetting Process
              </h3>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Background checks on experience and track record</li>
                <li>Reference reviews from past clients/deals</li>
                <li>Alignment with K2&apos;s borrower-first standards</li>
                <li>Ongoing performance monitoring</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Benefits for Everyone
              </h3>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>
                  Investors: Access pre-vetted lenders/vendors for faster,
                  better deals
                </li>
                <li>Lenders: Qualified borrower referrals, no tire-kickers</li>
                <li>
                  Vendors: Targeted leads in CRE niches like appraisals, legal,
                  brokerage
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Transparency First
              </h3>
              <p className="text-gray-600">
                K2 earns only on success: Lender-paid fees (2% under $500k,
                1.5% $500k–$1M, 1% above) with full disclosure. No hidden
                costs—your outcomes drive ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Role – Expanded Hub */}
      <section id="roles" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Choose the Experience That Matches Your Role
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Every member starts with education. Then, access vetted tools and
              connections tailored to you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Certified Borrower */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Certified Borrower (Investor)
              </h3>
              <p className="text-gray-600 mb-6">
                For CRE investors seeking funding: Get certified, access
                education, and connect to vetted lenders/vendors for faster
                closes and better terms.
              </p>
              <ul className="text-gray-600 mb-6 list-disc pl-5 space-y-2">
                <li>
                  One-time $150: Automated tools, Q&amp;A, document review
                </li>
                <li>$1,500 closing credit from Preferred Lenders</li>
                <li>Private community for peer insights</li>
              </ul>
              <a
                href="/membership/certified-borrower"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Learn More &amp; Join
              </a>
            </div>

            {/* K2 Preferred Lender */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                K2 Preferred Lender
              </h3>
              <p className="text-gray-600 mb-6">
                For lenders/institutions: Join our vetted network to receive
                qualified, prepared borrower referrals. We check your expertise
                to maintain quality.
              </p>
              <ul className="text-gray-600 mb-6 list-disc pl-5 space-y-2">
                <li>Selective approval: Showcase your programs</li>
                <li>Direct access to certified borrowers</li>
                <li>Referral tracking &amp; co-marketing</li>
              </ul>
              <a
                href="/membership/preferred-lender"
                className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Request to Join
              </a>
            </div>

            {/* K2 Preferred Vendor */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                K2 Preferred Vendor
              </h3>
              <p className="text-gray-600 mb-6">
                For CRE pros (appraisers, attorneys, brokers): Get vetted for
                our directory and receive targeted referrals from our investor
                community.
              </p>
              <ul className="text-gray-600 mb-6 list-disc pl-5 space-y-2">
                <li>Rigorous vetting for credibility</li>
                <li>Exposure to qualified clients</li>
                <li>Networking events &amp; resources</li>
              </ul>
              <a
                href="/membership/preferred-vendor"
                className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition"
              >
                Request to Join
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join – Tease Internal Access */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Join the Network?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Borrowers: Start with certification. Lenders/Vendors: Submit a
            request—we&apos;ll review and grant access to your private dashboard
            if approved.
          </p>
          <a
            href="/partnership"
            className="inline-block bg-green-700 text-white font-bold py-4 px-10 rounded-lg hover:bg-green-800 transition"
          >
            Inquire Now
          </a>
        </div>
      </section>

      {/* Testimonials – Build Trust */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &ldquo;K2&apos;s vetting gave me confidence in the
                lenders—closed my deal faster than expected.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">— CRE Investor</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &ldquo;As a Preferred Lender, the leads are qualified and
                ready—real time-saver.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">
                — Commercial Lender
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &ldquo;Vetting process was thorough, but worth it for the
                quality referrals.&rdquo;
              </p>
              <p className="font-semibold text-gray-900">— CRE Vendor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Note: The site's shared Footer is rendered automatically by layout.tsx */}
    </main>
  );
}
