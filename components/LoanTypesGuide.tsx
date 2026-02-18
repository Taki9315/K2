'use client';

import { useState } from 'react';
import { ChevronDown, Lightbulb, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type LoanProgram = {
  name: string;
  subtitle: string;
  description: string;
  lenderLooksFor: string[];
  pitfalls: string[];
  prepTip: string;
};

const LOAN_PROGRAMS: LoanProgram[] = [
  {
    name: 'Conventional / Bank Loans',
    subtitle: 'Traditional financing for stabilized properties',
    description:
      'The most common CRE loan type. Banks and credit unions offer competitive rates for properties with strong cash flow and experienced sponsors.',
    lenderLooksFor: [
      'DSCR above 1.25x',
      'Strong borrower credit (680+)',
      'Stabilized occupancy (85%+)',
      'Borrower net worth ≥ loan amount',
    ],
    pitfalls: [
      'Lengthy approval process (30–60 days)',
      'Strict documentation requirements',
      'Personal guarantee usually required',
    ],
    prepTip:
      'Organize 3 years of tax returns, a current rent roll, and trailing 12-month financials before you approach any bank.',
  },
  {
    name: 'SBA 504 & 7(a) Loans',
    subtitle: 'Government-backed loans for small businesses',
    description:
      'SBA loans offer lower down payments (as low as 10%) and longer terms. Ideal for owner-occupied properties and small businesses that qualify.',
    lenderLooksFor: [
      'Owner-occupancy of 51%+ (504)',
      'Business plan & projections',
      'Good personal credit (650+)',
      'Demonstrated cash flow or business viability',
    ],
    pitfalls: [
      'Extensive paperwork & slow processing',
      'Must meet SBA size standards',
      'Cannot be used for investment-only properties',
    ],
    prepTip:
      'A well-structured business plan is non-negotiable for SBA. Use a tool like LivePlan to build a lender-ready plan quickly.',
  },
  {
    name: 'CMBS (Commercial Mortgage-Backed Securities)',
    subtitle: 'Non-recourse financing for larger deals',
    description:
      'CMBS loans are securitized and sold to investors. They offer non-recourse terms and are ideal for stabilized properties over $2M.',
    lenderLooksFor: [
      'Strong property cash flow (DSCR 1.20x+)',
      'Property in major or secondary market',
      'Stabilized occupancy',
      'Institutional-quality reporting',
    ],
    pitfalls: [
      'Defeasance or yield maintenance for early payoff',
      'Less flexibility to modify terms',
      'Stricter reserve requirements',
    ],
    prepTip:
      'CMBS underwriting focuses on the property, not you. Make your NOI and occupancy story bulletproof before applying.',
  },
  {
    name: 'Bridge Loans',
    subtitle: 'Short-term financing for transitional properties',
    description:
      'Bridge loans cover 12–36 month terms for properties in transition — value-add, lease-up, or repositioning plays before permanent financing.',
    lenderLooksFor: [
      'Clear business plan for stabilization',
      'Sponsor experience with similar projects',
      'Realistic renovation budget & timeline',
      'Defined exit strategy (refi or sale)',
    ],
    pitfalls: [
      'Higher interest rates (7–12%+)',
      'Short maturity with extension fees',
      'Cost overrun risk can erode returns',
    ],
    prepTip:
      'Bridge lenders fund your plan, not your current numbers. Present a detailed scope, budget, and projected stabilized NOI.',
  },
  {
    name: 'Agency (Fannie Mae / Freddie Mac)',
    subtitle: 'Best-in-class multifamily financing',
    description:
      'Agency loans offer the lowest rates and longest terms for qualifying multifamily properties (5+ units). Non-recourse with flexible structures.',
    lenderLooksFor: [
      'Multifamily property with 5+ units',
      'Stabilized occupancy (90%+)',
      'Strong market fundamentals',
      'Experienced multifamily sponsor',
    ],
    pitfalls: [
      'Strict property condition requirements',
      'Minimum loan amounts ($1M+ typically)',
      'Supplemental loan restrictions',
    ],
    prepTip:
      'Agency lenders are relationship-driven. Having your package professionally prepared signals you are a serious borrower worth competing for.',
  },
  {
    name: 'Construction Loans',
    subtitle: 'Ground-up and major renovation financing',
    description:
      'Construction loans fund new development projects with draw schedules tied to build milestones. Typically convert to permanent financing upon completion.',
    lenderLooksFor: [
      'Detailed construction budget & timeline',
      'General contractor with track record',
      'Pre-leasing or absorption projections',
      'Sponsor equity contribution (20–35%)',
    ],
    pitfalls: [
      'Interest reserve calculations can surprise you',
      'Change orders eat into contingency fast',
      'Delays trigger costly extensions',
    ],
    prepTip:
      'The more thorough your construction budget and timeline, the better your rate and terms. Include a 10% contingency minimum.',
  },
];

function CollapsibleProgram({ program }: { program: LoanProgram }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {program.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{program.subtitle}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-400 transition-transform flex-shrink-0',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {program.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                What Lenders Look For
              </h4>
              <ul className="space-y-1.5">
                {program.lenderLooksFor.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                Common Pitfalls
              </h4>
              <ul className="space-y-1.5">
                {program.pitfalls.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                Prep Tip
              </p>
              <p className="text-sm text-gray-700">{program.prepTip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function LoanTypesGuide() {
  return (
    <div className="space-y-3">
      {LOAN_PROGRAMS.map((program) => (
        <CollapsibleProgram key={program.name} program={program} />
      ))}

      <div className="text-center pt-4">
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <BookOpen className="h-4 w-4" />
          Detailed program breakdowns available in the Borrower Preparation Workbook
        </p>
      </div>
    </div>
  );
}
