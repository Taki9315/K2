import type { Metadata } from 'next';
import { Hero, Benefits, Steps, Features, Trust, CTA } from '@/components/lenders';

export const metadata: Metadata = {
  title: 'Preferred Lender Network — K2 Commercial Finance',
  description:
    'Join the K2 Preferred Lender Network. Access pre-qualified small commercial and SBA borrowers, structured deal flow, and faster closings.',
};

export default function PreferredLendersPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Benefits />
      <Steps />
      <Features />
      <Trust />
      <CTA />
      <div className="h-16 bg-white sm:h-24" aria-hidden="true" />
    </div>
  );
}
