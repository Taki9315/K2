import { Check } from 'lucide-react';

const leftFeatures: string[] = [
  'Dedicated lender profile page',
  'Upload tear sheets and loan programs',
  'Share documentation requirements',
  'Post recent transactions',
];

const rightFeatures: string[] = [
  'Long-form interview video',
  'Articles and backlinks',
  'Direct borrower inquiries',
  'Community credibility',
];

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span className="text-slate-700">{text}</span>
    </li>
  );
}

export function Features() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Lender Benefits
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What Lenders Get
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Everything you need to showcase your lending programs and connect
            with qualified borrowers.
          </p>
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
            <ul className="space-y-5">
              {leftFeatures.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>
            <ul className="space-y-5">
              {rightFeatures.map((feature) => (
                <FeatureItem key={feature} text={feature} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
