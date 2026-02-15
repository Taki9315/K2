import { TrendingUp, PackageCheck, Zap, Eye } from 'lucide-react';

interface BenefitCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Qualified Deal Flow',
    description:
      'Receive submissions from borrowers who have completed structured preparation — credit-reviewed, cash-flow-analyzed, and documentation-ready.',
  },
  {
    icon: <PackageCheck className="h-6 w-6" />,
    title: 'Pre-Packaged Borrowers',
    description:
      'Every borrower on K2 works through our education process. You get organized packages with financials, narratives, and supporting documents.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Faster Closings',
    description:
      'Skip the back-and-forth. Borrowers arrive informed about your process and requirements, reducing friction and accelerating underwriting.',
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Direct Visibility',
    description:
      'Your lending programs, requirements, and recent transactions are showcased directly to an engaged community of active borrowers.',
  },
];

export function Benefits() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Why Join
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for lenders who value quality over quantity
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            The K2 network is designed to deliver borrowers who respect your time
            and meet your criteria.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
