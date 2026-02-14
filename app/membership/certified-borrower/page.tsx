import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const pillars = [
  {
    title: 'Borrower Intake, Simplified',
    description:
      'Upload your key files once and organize financing details in a consistent structure lenders can review quickly.',
    icon: Workflow,
  },
  {
    title: 'Guided Milestones',
    description:
      'Follow step-by-step readiness tasks so nothing critical is missed before you submit your request.',
    icon: Clock3,
  },
  {
    title: 'Preferred Borrower Status',
    description:
      'Demonstrate document quality, deal clarity, and response readiness to stand out with lenders.',
    icon: BadgeCheck,
  },
];

const showcaseSections = [
  {
    title: 'AI-assisted preparation workflow',
    description:
      'Use a practical checklist to prepare financial narratives, validate missing fields, and improve lender-facing quality before outreach.',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80',
    highlights: [
      {
        title: 'Readiness Checklist',
        description: 'Know exactly what to complete at each stage of financing prep.',
      },
      {
        title: 'Fewer Gaps',
        description: 'Catch missing details before lenders ask for revisions.',
      },
      {
        title: 'Faster Turnaround',
        description: 'Submit financing requests with stronger first-pass quality.',
      },
    ],
  },
  {
    title: 'Built-in trust and security',
    description:
      'Your borrower data remains protected with role-based access controls and secure document handling for every stakeholder.',
    image:
      'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=80',
    highlights: [
      {
        title: 'Permissioned Access',
        description: 'Only the right people can view sensitive borrower information.',
      },
      {
        title: 'Audit-Friendly Process',
        description: 'Track document updates and submission progress with clarity.',
      },
      {
        title: 'Confidential by Design',
        description: 'Share information securely throughout the financing process.',
      },
    ],
  },
  {
    title: 'Upload once. Reuse everywhere.',
    description:
      'Your profile, documents, and deal details stay organized in one borrower workspace, reducing repeated data entry and back-and-forth.',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
    highlights: [
      {
        title: 'Centralized Deal Package',
        description: 'Store rent roll, operating statements, and entity docs in one place.',
      },
      {
        title: 'Cleaner Submissions',
        description: 'Present the same complete story across every lender conversation.',
      },
      {
        title: 'Less Friction',
        description: 'Cut repetitive requests and reduce avoidable delays in review.',
      },
    ],
  },
];

export default function CertifiedBorrowerPage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-5">
              <Sparkles className="h-4 w-4" />
              Preferred Borrower
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Become a Preferred Borrower. Get lender-ready faster.
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Preferred Borrower helps you prepare complete financing packages,
              reduce underwriting friction, and present a more credible borrower
              profile from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Preferred Borrower
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="hover:bg-primary hover:text-primary-foreground">
                <Link href="/lender">View Lender Expectations</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { label: 'Single borrower workspace', value: '1 Platform' },
                { label: 'Guided prep milestones', value: 'Step-by-step' },
                { label: 'Submission confidence', value: 'Higher Quality' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((item) => (
              <Card key={item.title} className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {showcaseSections.map((section, index) => (
            <div key={section.title} className="rounded-xl border-2 border-slate-200 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className={`lg:col-span-3 ${index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}>
                  <div className="relative min-h-[300px] h-full">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-2 bg-slate-50 p-8 ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}`}>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{section.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white border-t border-slate-200">
                {section.highlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-semibold text-gray-900 mb-2">{highlight.title}</p>
                    <p className="text-sm text-gray-600">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border-2 border-slate-200 p-8 lg:p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preferred Borrower Workflow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Create borrower profile and define funding goals',
                'Upload financials, entity docs, and supporting materials',
                'Complete readiness tasks and narrative review',
                'Publish your preferred borrower submission package',
              ].map((step) => (
                <div key={step} className="flex items-start">
                  <FileCheck2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What You Gain</h3>
              <ul className="space-y-3">
                {[
                  'A structured process that improves first-pass deal quality',
                  'Clear lender-facing materials with less back-and-forth',
                  'A trusted signal of preparation and responsiveness',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full text-sm font-semibold mb-5">
            <ShieldCheck className="h-4 w-4" />
            Preferred Borrower Program
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Ready to present your deal with confidence?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join the Preferred Borrower experience to prepare faster, submit
            cleaner packages, and improve lender conversations from the start.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground">
            <Link href="/signup">
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
