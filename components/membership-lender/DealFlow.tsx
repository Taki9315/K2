import { CircleDot, FileBox, Zap, CheckCircle2 } from 'lucide-react';

function DealMockUI() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-800">
            555 19th Street, San Francisco, CA
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            New
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600"
          >
            Contact Sponsor
          </button>
          <button
            type="button"
            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
          >
            I&apos;m interested
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px]">
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'LTV', value: '75%' },
              { label: 'DSCR', value: '1.33x' },
              { label: 'Cap Rate', value: '6.25%' },
              { label: 'NOI', value: '$1.87M' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg bg-stone-800 px-4 py-3"
              >
                <p className="text-[10px] font-medium uppercase tracking-wide text-stone-400">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-lg font-bold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 overflow-x-auto">
            {['Cover Page', 'Table of Contents', 'Meet the Team', 'Property Overview'].map(
              (tab, i) => (
                <span
                  key={tab}
                  className={`shrink-0 rounded-lg border px-3 py-2 text-[11px] font-medium ${
                    i === 0
                      ? 'border-stone-300 bg-white text-stone-800'
                      : 'border-stone-100 bg-stone-50 text-stone-400'
                  }`}
                >
                  {tab}
                </span>
              )
            )}
          </div>

          <div className="mt-4 border-t border-stone-100 pt-4">
            <p className="text-xs font-semibold text-stone-800">
              Financials &amp; Documents
            </p>
            <div className="mt-2 grid grid-cols-2 text-[11px] text-stone-400">
              <span>Document Type</span>
              <span className="text-right">Date Uploaded</span>
            </div>
          </div>
        </div>

        <div className="hidden border-l border-stone-100 bg-stone-50 p-4 text-xs lg:block">
          <p className="font-semibold text-stone-500">
            Loan Request Information
          </p>
          <div className="mt-3 space-y-2">
            {[
              { label: 'Loan Type', value: 'Permanent' },
              { label: 'Transaction', value: 'Acquisition' },
              { label: 'Asset', value: 'Specialty - Urgent Care' },
              { label: 'Total Loan Amount', value: '$22.5M' },
              { label: 'LTV', value: '75%' },
              { label: 'Purchase Price', value: '$29M' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-stone-400">{item.label}</span>
                <span className="font-medium text-stone-700">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 font-semibold text-stone-500">Deal Team</p>
          <div className="mt-2 space-y-2">
            {[
              { name: 'Mark Rogers', role: 'Loan Originator', color: 'bg-amber-400' },
              { name: 'Ellen Tiger', role: 'Loan Originator', color: 'bg-blue-400' },
            ].map((person) => (
              <div key={person.name} className="flex items-center gap-2">
                <span
                  className={`h-6 w-6 rounded-full ${person.color}`}
                />
                <div>
                  <p className="font-medium text-stone-700">{person.name}</p>
                  <p className="text-[10px] text-stone-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
        <div className="rounded-2xl border border-stone-200 bg-white px-8 py-6 text-center shadow-2xl">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
          <p className="mt-3 text-sm font-bold text-stone-800">
            Interest Registered!
          </p>
          <p className="mt-1 max-w-[220px] text-[11px] text-stone-500">
            We&apos;ve let the sponsor know you&apos;re interested in this deal. They&apos;ll
            be in touch soon!
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            Deal added to your pipeline
          </div>
        </div>
      </div>
    </div>
  );
}

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    icon: <CircleDot className="h-5 w-5" />,
    title: 'More qualified opportunities',
    description:
      'K2\'s matching engine connects you with the right borrowers and sponsors, so you spend less time screening deals and more time quoting them.',
  },
  {
    icon: <FileBox className="h-5 w-5" />,
    title: 'Clear, consistent deal materials',
    description:
      'Standardized, clearly formatted deal packages mean faster evaluation and fewer follow-up questions.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Zero tech required',
    description:
      'No new systems to learn. Engage with deals through clean materials, secure links, and email — K2 works fully behind the scenes.',
  },
];

export function DealFlow() {
  return (
    <section className="bg-[#FAF9F6] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              Increase deal flow without increasing noise
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              Get matched with active, qualified borrowers looking to finance
              deals that fit your specific lending criteria.
            </p>
          </div>

          <DealMockUI />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {benefits.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-stone-200 bg-white px-6 py-7"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                {card.icon}
              </div>
              <h3 className="text-base font-semibold text-stone-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
