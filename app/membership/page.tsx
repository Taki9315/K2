import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building2, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const membershipPages = [
  {
    title: 'K2 Preferred Lender',
    description:
      'A lender-focused page for partners, referral teams, and institutions seeking qualified borrower opportunities.',
    href: '/membership/k2_preferred_lender',
    icon: Building2,
  },
  {
    title: 'Certified Borrower',
    description:
      'A borrower-focused page that explains certification, readiness milestones, and a faster path to funding.',
    href: '/membership/certified-borrower',
    icon: BadgeCheck,
  },
  {
    title: 'K2 Preferred Vendor',
    description:
      'A vendor-focused page for service providers seeking qualified referrals and lasting client relationships through the K2 network.',
    href: '/membership/preferred-vendor',
    icon: Wrench,
  },
];

export default function MembershipPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Membership
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the experience that matches your role.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPages.map((page) => (
              <Card key={page.title} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <page.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <CardTitle className="text-2xl">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{page.description}</p>
                  <Button asChild>
                    <Link href={page.href}>
                      View Page
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
