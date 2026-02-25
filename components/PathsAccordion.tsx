'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Headphones,
  Star,
  DollarSign,
  ChevronDown,
} from 'lucide-react';

type PathItem = {
  step: number;
  icon: typeof BookOpen;
  title: string;
  idealFor: string;
  bullets: string[];
  commitment: string;
  cta: { label: string; href: string };
  feeTransparency?: {
    title: string;
    text: string;
  };
};

const PATHS: PathItem[] = [
  {
    step: 1,
    icon: BookOpen,
    title: 'Learn Borrowing Tips and Strategies for Free',
    idealFor: `you're exploring or building basics.`,
    bullets: [
      'Free videos & articles - no signup needed',
      'Learn loan programs, pitfalls, prep essentials',
      'Decide if financing fits without pressure',
    ],
    commitment: '$0 - just your time and curiosity.',
    cta: { label: 'Browse Free Educational Content', href: '/content' },
  },
  {
    step: 2,
    icon: FileCheck,
    title: 'Success Kit',
    idealFor: `you're ready to prepare and pursue on your own.`,
    bullets: [
      '$15 one-time (50+ pages, 15+ worksheets/templates)',
      'Identify best loan program, organize docs lenders love, compare options, avoid deal-killers',
      'Document Vault, checklists, lifetime access, instant download',
    ],
    commitment: '$15 one-time. No subscriptions, no upsells.',
    cta: { label: 'Get the Kit - Only $15', href: '/workbook' },
  },
  {
    step: 3,
    icon: Headphones,
    title: 'Expert Guidance Fast Track — K2 Certified Borrower',
    idealFor: 'faster results, complex deals, or any asset class',
    bullets: [
      '$249 one-time lifetime access',
      'Automated transaction system + direct Preferred Lender access',
      'Monthly Q&A, advanced videos, document review, private community',
      '$1,500 closing credit from any Preferred Lender you close with',
    ],
    feeTransparency: {
      title: 'How We Earn - Full Transparency',
      text: 'K2 earns a flat lender-paid success fee only on closed loans (2% under $500k, 1.5% $500k–$1M, 1% above $1M) – fully disclosed, no surprises, your success first.',
    },
    commitment:
      '$249 one-time - with real payback potential through your closing credit.',
    cta: {
      label: 'Become Certified - $249 + Credit',
      href: '/membership/certified-borrower',
    },
  },
];

export function PathsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {PATHS.map((item, index) => {
        const isFeatured = item.step === 3;
        const isOpen = openIndex === index;

        return (
          <Card
            key={item.step}
            className={`relative flex flex-col rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full ${
              isFeatured
                ? 'border-2 border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20'
                : 'border border-slate-200 hover:border-primary/30'
            }`}
          >
            {isFeatured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  <Star className="h-3.5 w-3.5 fill-white" />
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="pb-4 flex-shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-white text-lg font-bold shadow-sm ${
                    isFeatured ? 'bg-primary' : 'bg-slate-800'
                  }`}
                >
                  {item.step}
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    isFeatured
                      ? 'bg-primary/10 text-primary'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
              </div>
              <CardTitle className="text-xl leading-snug">
                {item.title}
              </CardTitle>
              <p className="text-sm text-primary/90 mt-3 leading-relaxed">
                <span className="font-semibold">Best if:</span> {item.idealFor}
              </p>

              {/* Accordion toggle */}
              <button
                onClick={() => toggle(index)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                {isOpen ? 'Less' : 'More'}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </CardHeader>

            {/* Expandable content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <CardContent className="flex-1 flex flex-col min-h-0 pt-0">
                <div className="flex-1 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                      What You Get
                    </p>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {item.feeTransparency && (
                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 text-sm">
                      <p className="font-semibold text-gray-900 mb-2">
                        {item.feeTransparency.title}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {item.feeTransparency.text}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-6 flex-shrink-0 space-y-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      {item.commitment}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${
                      isFeatured ? 'shadow-md shadow-primary/20' : ''
                    }`}
                    variant={isFeatured ? 'default' : 'outline'}
                  >
                    <Link href={item.cta.href}>
                      {item.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
