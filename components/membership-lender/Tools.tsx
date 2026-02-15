import {
  ArrowRight,
  Send,
  Building2,
  BarChart3,
  FileText,
  MapPin,
  Bell,
  TrendingUp,
} from 'lucide-react';

function BorrowerMatchingMini() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-6">
      <div className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-center shadow-sm">
        <Send className="mx-auto h-6 w-6 text-emerald-500" />
        <p className="mt-2 text-[11px] font-semibold text-stone-700">
          Reaching out to lenders
        </p>
        <p className="text-[10px] text-stone-400">
          Contacting matched lenders
        </p>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-stone-400">
        <span className="rounded border border-stone-200 bg-stone-50 px-2 py-1">
          Negotiation
        </span>
        <span className="rounded border border-stone-200 bg-stone-50 px-2 py-1">
          Review
        </span>
      </div>
    </div>
  );
}

function PipelineMini() {
  return (
    <div className="flex items-start gap-3 px-4 py-6">
      <div className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-stone-800">Juniper...</span>
          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
            98%
          </span>
        </div>
        <p className="text-[10px] text-stone-400">Private Lender</p>
        <div className="mt-2 flex items-center gap-1 text-[10px] text-stone-400">
          <MapPin className="h-3 w-3" />
          CA, San Francisco
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {['Multifamily', 'Office', 'Industrial'].map((t) => (
            <span
              key={t}
              className="rounded border border-stone-100 bg-stone-50 px-1.5 py-0.5 text-[9px] text-stone-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactMini() {
  return (
    <div className="px-4 py-6">
      <div className="rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-semibold text-purple-700">
            Generating deck...
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-semibold text-stone-700">
            Financial Analysis
          </span>
        </div>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-8 w-3 rounded-sm ${
                i <= 3 ? 'bg-purple-400' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DealFlowMini() {
  return (
    <div className="px-4 py-6">
      <div className="mb-2 flex items-center gap-1">
        <Bell className="h-3 w-3 text-red-500" />
        <span className="text-[10px] font-semibold text-red-600">
          New deals incoming
        </span>
      </div>
      <div className="space-y-1.5">
        {[
          { name: 'Harbor Point Plaza', amount: '$12M' },
          { name: 'Riverside Commons', amount: '$8.5M' },
          { name: 'Gateway Industrial Park', amount: '$15M' },
          { name: 'Beacon Hill Tower', amount: '$22M' },
        ].map((deal) => (
          <div
            key={deal.name}
            className="flex items-center justify-between rounded-lg border border-stone-100 bg-white px-3 py-2 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-3 w-3 text-stone-400" />
              <span className="text-[11px] font-medium text-stone-700">
                {deal.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-[11px] font-semibold text-stone-800">
                {deal.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Tool {
  title: string;
  description: string;
  preview: React.ReactNode;
}

const tools: Tool[] = [
  {
    title: 'Borrower matching',
    description:
      'Understand why a borrower or deal is being matched to you based on real-time data and deal context.',
    preview: <BorrowerMatchingMini />,
  },
  {
    title: 'Pipeline management',
    description:
      'A live pipeline that stays current without manual updates. See what\'s new and what needs attention.',
    preview: <PipelineMini />,
  },
  {
    title: 'Contact management',
    description:
      'All sponsor, broker, and internal deal relationships in one place with full history and context.',
    preview: <ContactMini />,
  },
  {
    title: 'Credit memo creation',
    description:
      'Turn deal documents and data into structured credit memos quickly, with consistent formatting.',
    preview: <DealFlowMini />,
  },
];

export function Tools() {
  return (
    <section className="bg-[#FAF9F6] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Flexible tools that fit the way you lend
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="flex min-h-[180px] items-center justify-center border-b border-stone-100 bg-stone-50">
                {tool.preview}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-stone-500">
                  {tool.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-900">
                  {tool.description}
                </p>
                <div className="mt-4">
                  <ArrowRight className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
