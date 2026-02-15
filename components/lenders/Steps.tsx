import { BookOpen, ShieldCheck, Send, Handshake } from 'lucide-react';

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Borrowers Prepare Packages',
    description:
      'Borrowers work through the K2 education platform — building credit narratives, organizing financials, and completing structured workbooks.',
  },
  {
    number: '02',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Deals Are Certified & Organized',
    description:
      'Each submission is reviewed for completeness, accuracy, and lender readiness before it enters the network.',
  },
  {
    number: '03',
    icon: <Send className="h-5 w-5" />,
    title: 'Lenders Receive Structured Submissions',
    description:
      'You receive clean, well-documented packages matched to your lending criteria — no cold calls, no unqualified leads.',
  },
  {
    number: '04',
    icon: <Handshake className="h-5 w-5" />,
    title: 'Close Faster',
    description:
      'With informed borrowers and complete documentation from day one, your team moves straight to underwriting and decision.',
  },
];

export function Steps() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Process
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            A streamlined process that respects your workflow and delivers
            borrower-ready packages.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 sm:left-8 md:block" />

          <div className="space-y-10 md:space-y-12">
            {steps.map((step) => (
              <div key={step.number} className="relative flex gap-6 sm:gap-8">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-600 shadow-sm sm:h-16 sm:w-16">
                  {step.icon}
                </div>
                <div className="pt-1 sm:pt-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
