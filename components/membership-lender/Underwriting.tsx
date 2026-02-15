import {
  FolderLock,
  FileText,
  LayoutDashboard,
  Sparkles,
  MapPin,
} from 'lucide-react';

function UnderwritingMockUI() {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-800">
            123 North Main Street, Los Angeles, CA
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
          <p className="text-sm font-semibold text-stone-800">
            Table of Contents
          </p>
          <div className="mt-4 space-y-0 divide-y divide-stone-100">
            {[
              { num: '01', title: 'Executive Summary', page: 3 },
              { num: '02', title: 'Property Overview', page: 5 },
              { num: '03', title: 'Market Analysis', page: 8 },
              { num: '04', title: 'Financial Projections', page: 12 },
              { num: '05', title: 'Sponsor Information', page: 16 },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-emerald-600">
                    {item.num}
                  </span>
                  <span className="text-sm text-stone-700">{item.title}</span>
                </div>
                <span className="text-xs text-stone-400">{item.page}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 overflow-x-auto">
            {[
              'Cover Page',
              'Table of Contents',
              'Meet the Team',
              'Property Overview',
              'Financial Summary',
            ].map((tab, i) => (
              <span
                key={tab}
                className={`shrink-0 rounded-lg border px-3 py-2 text-[11px] font-medium ${
                  i === 1
                    ? 'border-emerald-600 bg-emerald-700 text-white'
                    : 'border-stone-100 bg-stone-50 text-stone-400'
                }`}
              >
                {tab}
              </span>
            ))}
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

          <div className="mt-6 flex justify-end">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
              <Sparkles className="h-4 w-4 text-white" />
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
                <span className={`h-6 w-6 rounded-full ${person.color}`} />
                <div>
                  <p className="font-medium text-stone-700">{person.name}</p>
                  <p className="text-[10px] text-stone-400">{person.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-stone-400">
            <MapPin className="h-3 w-3" />
            <span>Los Angeles, CA</span>
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
    icon: <FolderLock className="h-5 w-5" />,
    title: 'Secure document storage and sharing',
    description:
      'Request, access and collaborate on diligence materials through secure, permissioned data rooms instead of messy email chains.',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Credit memos in minutes',
    description:
      'Generate internal credit memos in minutes using structured deal data and documents. No re-entering data and no formatting headaches.',
  },
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: 'Automated pipeline management',
    description:
      'Track active deals, stages, and next steps automatically so nothing stalls or slips through the cracks.',
  },
];

export function Underwriting() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <UnderwritingMockUI />

          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              Speed up underwriting and diligence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              Remove friction from the most time-consuming parts of your
              day-to-day workflows.
            </p>
          </div>
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
