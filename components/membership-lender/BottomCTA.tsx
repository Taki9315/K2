import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  {
    value: '2,400+',
    description: 'Borrowers and sponsors actively sourcing deals',
  },
  {
    value: '94%',
    description: 'Client retention across the K2 network',
  },
  {
    value: '$5.1B+',
    description: 'Total deal volume processed through K2',
  },
];

export function BottomCTA() {
  return (
    <section id="apply" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl">
              Ready to see more qualified deals?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone-500">
              Join the lenders who are already using K2 to increase deal flow,
              speed up underwriting, and close with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
              >
                Request a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/partnership"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="space-y-10 lg:pt-2">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="border-t border-stone-200 pt-6 first:border-0 first:pt-0"
              >
                <p className="text-4xl font-bold text-emerald-600 sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-stone-500">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
