import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  Video,
  MessageSquare,
  FileCheck,
  Calendar,
  Award,
  ArrowRight,
} from 'lucide-react';

const MEMBER_BENEFITS = [
  {
    title: 'Monthly Live Q&A',
    description:
      "Join monthly live sessions with lending experts. Ask questions, get personalized guidance, and learn from others' situations.",
    icon: Calendar,
    image:
      'https://images.unsplash.com/photo-1758518727734-98f0a55983b6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Exclusive Video Library',
    description:
      'Access our growing library of advanced training videos, case studies, and deep-dive tutorials not available elsewhere.',
    icon: Video,
    image:
      'https://images.pexels.com/photos/6801643/pexels-photo-6801643.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Private Community',
    description:
      'Connect with other borrowers, share experiences, get feedback, and build relationships with like-minded entrepreneurs.',
    icon: MessageSquare,
    image:
      'https://images.unsplash.com/photo-1758518729711-1cbacd55efdb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Document Review',
    description:
      'Submit your financial documents, business plans, and applications for expert review and actionable feedback.',
    icon: FileCheck,
    image:
      'https://images.pexels.com/photos/8729952/pexels-photo-8729952.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Workbook Included',
    description:
      'Get immediate access to the complete Borrower Preparation Workbook as part of your membership.',
    icon: Award,
    image:
      'https://images.pexels.com/photos/7947656/pexels-photo-7947656.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    title: 'Priority Support',
    description:
      'Get faster responses to questions via email and priority access to new features and resources.',
    icon: Users,
    image:
      'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export default function MembershipPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                MOST COMPREHENSIVE
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Financing Acceleration Program
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Go beyond the basics. Get ongoing support, expert guidance, and
                exclusive resources as you navigate your financing journey.
              </p>
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-gray-900">$97</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Cancel anytime. No long-term contracts.
              </p>
              <Button size="lg" asChild className="text-lg px-8 py-6 w-full sm:w-auto">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-slate-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Everything Included
              </h3>
              <ul className="space-y-4">
                {[
                  'Borrower Preparation Workbook',
                  'Monthly live Q&A sessions',
                  'Private member community',
                  'Exclusive video library',
                  'Document review and feedback',
                  'Early access to new content',
                  'Email support priority',
                  'Member-only resources',
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Member Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive support throughout your entire financing journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMBER_BENEFITS.map((benefit) => (
              <Card key={benefit.title} className="border-2 overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url('${benefit.image}')` }}
                    aria-label={benefit.title}
                  />
                  <div className="p-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Accelerate Your Financing Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join our community of informed borrowers and get the support you
            need to succeed.
          </p>
          <div className="flex items-baseline gap-3 justify-center mb-8">
            <span className="text-5xl font-bold">$97</span>
            <span className="text-slate-300">/month</span>
          </div>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="text-lg px-8 py-6"
          >
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-slate-400 mt-4">
            Cancel anytime. No long-term commitment.
          </p>
        </div>
      </section>
    </div>
  );
}
