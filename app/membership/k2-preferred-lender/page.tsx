import type { Metadata } from 'next';
import {
  Hero,
  DealFlow,
  Underwriting,
  Tools,
  BottomCTA,
} from '@/components/membership-lender';

export const metadata: Metadata = {
  title: 'K2 Preferred Lender Membership — K2 Commercial Finance',
  description:
    'Join the K2 Preferred Lender Network to access pre-qualified small commercial and SBA borrowers, build your lender profile, and receive structured deal flow.',
  openGraph: {
    title: 'K2 Preferred Lender Membership — K2 Commercial Finance',
    description:
      'Get direct access to educated, documented, and lender-ready borrowers through the K2 Preferred Lender Network.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K2 Preferred Lender Membership',
    description:
      'Join the K2 network and receive structured, qualified borrower submissions matched to your lending criteria.',
  },
};

export default function K2PreferredLenderPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DealFlow />
      <Underwriting />
      <Tools />
      <BottomCTA />
    </div>
  );
}
