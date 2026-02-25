'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AssistantDialog } from '@/components/assistant/AssistantDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileText,
  DollarSign,
  BarChart3,
  Phone,
  Compass,
  ChevronDown,
  ArrowRight,
  Bot,
  Table,
  FileSpreadsheet,
  Eye,
  Upload,
  CheckCircle2,
  Sparkles,
  Rocket,
  Shield,
  Zap,
  Users,
  Search,
  Clock,
  Award,
  Info,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  TASK DEFINITIONS — inputs + prompt builder                          */
/* ------------------------------------------------------------------ */

type TaskField = {
  key: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'number';
};

type TaskTemplate = {
  id: string;
  taskId: string;          // maps to PREPCOACH_TASKS / TASK_SYSTEM_PROMPTS
  step: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;     // educational blurb shown to user
  fields: TaskField[];
  buildPrompt: (values: Record<string, string>) => string;
};

const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'executive-summary',
    taskId: 'executive-summary',
    step: 1,
    title: 'Preparing Your Executive Summary',
    subtitle:
      'Create a lender-ready 1-page Executive Summary for your commercial loan request.',
    icon: <FileText className="h-6 w-6" />,
    description:
      'PrepCoach will guide you through building a compelling Executive Summary — ' +
      'the single most important document in your loan package. Fill in your deal ' +
      'basics below so PrepCoach can jump right into drafting.',
    fields: [
      { key: 'propertyType', label: 'Property Type', placeholder: 'e.g., multi-family, retail strip, self-storage' },
      { key: 'price', label: 'Purchase / Refinance Price', placeholder: '$750,000', type: 'text' },
      { key: 'loanAmount', label: 'Loan Amount Requested', placeholder: '$525,000', type: 'text' },
      { key: 'experience', label: 'Your Experience', placeholder: 'e.g., 5 years owning 3 similar properties' },
      { key: 'strengths', label: 'Key Deal Strengths', placeholder: 'e.g., below-market rents with upside, strong location' },
    ],
    buildPrompt: (v) =>
      `Help me write a strong 1-page Executive Summary for my commercial loan request.\n\n` +
      `My deal basics:\n` +
      `- Property type: ${v.propertyType || '(not specified)'}\n` +
      `- Purchase/refinance price: ${v.price || '(not specified)'}\n` +
      `- Loan amount requested: ${v.loanAmount || '(not specified)'}\n` +
      `- My experience: ${v.experience || '(not specified)'}\n` +
      `- Key strengths: ${v.strengths || '(not specified)'}\n\n` +
      `Walk me through the ideal structure, what lenders care about most, specific wording that works, ` +
      `common mistakes to avoid, and then output a clean draft I can use.`,
  },
  {
    id: 'personal-financial-statement',
    taskId: 'pfs',
    step: 2,
    title: 'Completing Your Personal Financial Statement',
    subtitle:
      'Build a professional PFS that lenders actually want to see — accurate, organized, no fluff.',
    icon: <DollarSign className="h-6 w-6" />,
    description:
      'PrepCoach will walk you through every section of your Personal Financial ' +
      'Statement — assets, liabilities, net worth, and contingent liabilities. ' +
      'Provide what you know below and PrepCoach will fill in the gaps.',
    fields: [
      { key: 'liquidAssets', label: 'Estimated Liquid Assets', placeholder: 'e.g., $150,000 in savings/checking', type: 'text' },
      { key: 'realEstateOwned', label: 'Real Estate Owned', placeholder: 'e.g., 2 rental properties worth ~$500K total' },
      { key: 'totalDebts', label: 'Estimated Total Debts', placeholder: 'e.g., $320K in mortgages, $15K credit cards' },
    ],
    buildPrompt: (v) =>
      `Help me complete a professional Personal Financial Statement (PFS).\n\n` +
      `What I know so far:\n` +
      `- Liquid assets: ${v.liquidAssets || '(I need help figuring this out)'}\n` +
      `- Real estate owned: ${v.realEstateOwned || '(I need help figuring this out)'}\n` +
      `- Total debts: ${v.totalDebts || '(I need help figuring this out)'}\n\n` +
      `Guide me through each category one at a time, then produce a clean printable PFS summary.`,
  },
  {
    id: 'dscr-calculator',
    taskId: 'dscr',
    step: 3,
    title: 'Calculating Your DSCR',
    subtitle:
      'Know exactly where you stand on Debt Service Coverage Ratio before approaching lenders.',
    icon: <BarChart3 className="h-6 w-6" />,
    description:
      'DSCR is the #1 metric lenders check. PrepCoach will walk you through the ' +
      'full calculation and tell you exactly where you stand. Enter your numbers below.',
    fields: [
      { key: 'grossRent', label: 'Annual Gross Rental Income', placeholder: '$96,000', type: 'text' },
      { key: 'expenses', label: 'Annual Operating Expenses', placeholder: '$32,000', type: 'text' },
      { key: 'loanAmount', label: 'Loan Amount', placeholder: '$500,000', type: 'text' },
      { key: 'interestRate', label: 'Estimated Interest Rate', placeholder: '7%', type: 'text' },
    ],
    buildPrompt: (v) =>
      `Walk me through calculating DSCR for my deal.\n\n` +
      `My numbers:\n` +
      `- Annual gross rental income: ${v.grossRent || '(help me figure this out)'}\n` +
      `- Annual operating expenses: ${v.expenses || '(help me figure this out)'}\n` +
      `- Loan amount: ${v.loanAmount || '(help me figure this out)'}\n` +
      `- Estimated interest rate: ${v.interestRate || '(help me figure this out)'}\n\n` +
      `Show the formula, calculate my DSCR, explain what lenders look for (1.20x–1.35x+), ` +
      `and suggest improvements if I'm below target.`,
  },
  {
    id: 'lender-scripts',
    taskId: 'lender-scripts',
    step: 4,
    title: 'Phone & Email Scripts for Lenders',
    subtitle:
      'Professional, concise scripts so you contact lenders without sounding desperate.',
    icon: <Phone className="h-6 w-6" />,
    description:
      'PrepCoach will create phone scripts, email templates, and voicemail versions ' +
      'customized to your deal. Fill in your deal snapshot below.',
    fields: [
      { key: 'propertyInfo', label: 'Property Type & Location', placeholder: 'e.g., 12-unit apartment, Austin TX' },
      { key: 'loanRequest', label: 'Loan Request', placeholder: 'e.g., $1.2M for purchase' },
      { key: 'dscr', label: 'Your DSCR (if known)', placeholder: 'e.g., 1.35x' },
      { key: 'experience', label: 'Your Credit / Experience', placeholder: 'e.g., 750 FICO, 8 years experience' },
    ],
    buildPrompt: (v) =>
      `Help me create professional phone scripts and email templates to contact lenders.\n\n` +
      `My deal snapshot:\n` +
      `- Property: ${v.propertyInfo || '(not specified yet)'}\n` +
      `- Loan request: ${v.loanRequest || '(not specified yet)'}\n` +
      `- DSCR: ${v.dscr || '(not calculated yet)'}\n` +
      `- Credit/experience: ${v.experience || '(not specified yet)'}\n\n` +
      `I need a 30–45 second phone script, a follow-up email template, a voicemail version, ` +
      `and tips on tone, timing, and follow-up cadence.`,
  },
  {
    id: 'onboarding',
    taskId: 'onboarding',
    step: 5,
    title: 'General PrepCoach Coaching',
    subtitle:
      "Not sure where to start? PrepCoach will guide you to the right next step.",
    icon: <Compass className="h-6 w-6" />,
    description:
      "If you're not sure which task to tackle first, start here. Tell PrepCoach " +
      "a bit about your situation and it will recommend your best next step.",
    fields: [
      { key: 'situation', label: 'Where Are You Right Now?', placeholder: 'e.g., Looking at a 6-unit property, first-time investor' },
    ],
    buildPrompt: (v) =>
      `I'm looking for guidance on getting prepared for a commercial loan.\n\n` +
      `My situation: ${v.situation || "I'm not sure where to start — help me figure out my next step."}\n\n` +
      `Based on where I am, what should I tackle first?`,
  },
];

/* ------------------------------------------------------------------ */
/*  EXCEL TIPS                                                          */
/* ------------------------------------------------------------------ */

type ExcelTip = {
  id: string;
  number: number;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

const EXCEL_TIPS: ExcelTip[] = [
  {
    id: 'template',
    number: 1,
    title: 'Start with a Clean, Standardized Template',
    icon: <Table className="h-5 w-5" />,
    content: (
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          Use a consistent column structure every time — lenders expect this for
          quick scanning.
        </p>
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            Recommended columns (left to right):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Unit # / Suite</li>
            <li>Tenant Name (or &quot;Vacant&quot;)</li>
            <li>Occupied? (Yes/No)</li>
            <li>Sq Ft / Beds-Baths</li>
            <li>Monthly Base Rent</li>
            <li>Annual Base Rent (=Monthly×12)</li>
            <li>Rent per Sq Ft (=Annual/Sq Ft)</li>
            <li>Lease Start Date &amp; End Date</li>
            <li>Months Remaining (=End Date - TODAY())</li>
            <li>Renewal Options (e.g., &quot;2×5 yrs&quot;)</li>
            <li>Concessions/Free Rent (months/$)</li>
            <li>Security Deposit</li>
            <li>Notes/Red Flags (e.g., &quot;Delinquent 30 days&quot;)</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-2">
            Add summary rows at top or bottom:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Total Units, Total Sq Ft</li>
            <li>
              Gross Potential Rent (sum of Annual Base Rent for occupied + market
              rent for vacant)
            </li>
            <li>Current Collected Rent</li>
            <li>Vacancy %, Economic Occupancy</li>
          </ul>
        </div>
        <p className="text-xs text-gray-500 italic">
          Tip: Download free CRE rent roll templates as starters — customize to
          your property type (multi-family vs retail vs self-storage).
        </p>
      </div>
    ),
  },
  {
    id: 'formatting',
    number: 2,
    title: 'Formatting for Readability & Professionalism',
    icon: <Eye className="h-5 w-5" />,
    content: (
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <ul className="space-y-3">
          <li>
            <span className="font-semibold text-gray-900">Freeze panes:</span>{' '}
            Freeze the top row(s) and first column (View → Freeze Panes) so
            headers and unit numbers stay visible when scrolling.
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              Consistent formats:
            </span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Currency: $#,##0 for rents/deposits (no decimals unless needed)</li>
              <li>Dates: MM/DD/YYYY (short date format)</li>
              <li>Percentages: 0% for vacancy/occupancy</li>
              <li>Numbers: No leading/trailing spaces; consistent rounding</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              Conditional formatting:
            </span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span className="text-red-600 font-medium">Red</span> for leases
                expiring &lt;12 months
              </li>
              <li>
                <span className="text-yellow-600 font-medium">Yellow</span> for
                below-market rents or delinquencies
              </li>
              <li>
                <span className="text-green-600 font-medium">Green</span> for
                long-term tenants (&gt;3 years remaining)
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-gray-900">Bold</span> totals/subtotals
            and use borders/gridlines sparingly — keep it clean, not cluttered.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Hide helper columns</span>{' '}
            if you use them for calcs (right-click → Hide), but leave formulas
            intact for audit.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'formulas',
    number: 3,
    title: 'Build Formulas That Auto-Update & Prove Accuracy',
    icon: <FileSpreadsheet className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <ul className="space-y-3">
          <li>
            Use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">SUMIF/SUMIFS</code> for
            rollups (e.g.,{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
              =SUMIFS(AnnualRent, Occupancy, &quot;Yes&quot;)
            </code>{' '}
            for Current Collected Rent).
          </li>
          <li>
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">DATEDIF</code> or{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">=EndDate - TODAY()</code> for
            months remaining.
          </li>
          <li>
            For rollover risk: PivotTable or{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">COUNTIFS</code> to group
            expirations by year (% expiring in next 12/24 months).
          </li>
          <li>
            Stabilized rent projection: Add a &quot;Market Rent&quot; column and formula
            for upside:{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
              IF(CurrentRent &lt; MarketRent, MarketRent - CurrentRent, 0)
            </code>
          </li>
          <li>
            Link to other sheets: Pull totals into your NOI/DSCR tab for
            one-click updates.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'export',
    number: 4,
    title: 'Export & Sharing Best Practices',
    icon: <Upload className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <ul className="space-y-3">
          <li>
            <span className="font-semibold text-gray-900">Save as PDF for submission</span>{' '}
            (File → Save As → PDF): Lenders prefer non-editable PDFs — preserves
            formatting, prevents accidental changes.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Export to CSV if needed</span>{' '}
            for data import — but avoid for lender submission (loses
            formulas/formatting).
          </li>
          <li>
            <span className="font-semibold text-gray-900">Protect the sheet</span>{' '}
            (Review → Protect Sheet): Allow viewing but lock editing to prevent
            tampering.
          </li>
          <li>
            <span className="font-semibold text-gray-900">File naming:</span>{' '}
            Clear and dated, e.g.,{' '}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">
              PropertyName_RentRoll_YYYY-MM-DD.xlsx
            </code>
          </li>
          <li>
            <span className="font-semibold text-gray-900">
              File size &amp; cleanliness:
            </span>{' '}
            Delete blank rows/columns, remove unused sheets, clear old comments.
          </li>
          <li>
            <span className="font-semibold text-gray-900">Version control:</span>{' '}
            Add a &quot;Last Updated&quot; cell and notes tab explaining
            assumptions/sources.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'integration',
    number: 5,
    title: 'PrepCoach Integration Tips',
    icon: <Bot className="h-5 w-5" />,
    content: (
      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
        <ul className="space-y-3">
          <li>
            After analysis in PrepCoach, copy outputs (tables, summaries, calcs)
            directly into Excel.
          </li>
          <li>
            Use PrepCoach to generate paragraphs (e.g., &quot;Stabilized occupancy 94%
            with minimal rollover risk...&quot;) and paste into a &quot;Summary&quot; cell or
            separate Notes sheet.
          </li>
          <li>
            For secure data room upload: Export a &quot;Lender View&quot; version —
            remove sensitive borrower info if needed, keep rent roll core.
          </li>
          <li>
            If using Google Sheets for collaboration, export to Excel (.xlsx)
            via File → Download — formulas usually carry over fine.
          </li>
        </ul>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  VALUE PROPOSITIONS                                                  */
/* ------------------------------------------------------------------ */

const VALUE_PROPS = [
  {
    icon: FileText,
    title: 'Step-by-Step Guidance on Key Prep Tasks',
    text: 'Walks you through executive summaries, personal financial statements, and DSCR calculations — ensuring your package is complete, error-free, and built exactly to what lenders want.',
  },
  {
    icon: Phone,
    title: 'Custom Scripts for Lender Outreach',
    text: 'Tailored phone scripts and email templates for your specific deal — so you contact lenders professionally, build instant credibility, and move quickly to real conversations.',
  },
  {
    icon: Shield,
    title: 'Secure Data Room for Easy, Safe Sharing',
    text: 'Upload polished docs to our encrypted data room and grant targeted access to preferred lenders — cutting email chaos, protecting your info, and making collaboration seamless.',
  },
  {
    icon: Zap,
    title: 'Time-Saving Automation with Expert Insights',
    text: 'Automates calculations, organizes documents, and flags issues early — slashing prep time in half while delivering insider tips that prevent common deal-killers.',
  },
  {
    icon: Award,
    title: 'Higher Approval Rates and Better Terms',
    text: 'Certifies you as a low-risk, high-quality borrower — leading to faster responses, stronger "yes" decisions, and more favorable rates from lenders who value preparation.',
  },
  {
    icon: Users,
    title: "Exclusive Access to K2's Expert Community",
    text: 'Connects you directly to financing and CRE pros who prefer working with ready borrowers — a high-touch network built on mutual respect and real results.',
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Alternative to Consultants',
    text: 'Skip expensive $5K+ advisors — PrepCoach gives personalized, always-on coaching at a fraction of the cost, empowering you to handle more deals yourself.',
  },
  {
    icon: Search,
    title: 'Spot & Fix Red Flags Before Lenders Do',
    text: 'Analyzes your rent roll, financials, and package for hidden issues (rollover risk, weak DSCR, etc.) and provides fixes before they tank your deal.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Build a Professional, Lender-Ready Package Fast',
    text: 'Generates polished outputs (summaries, tables, paragraphs) ready for your data room or submission — saving hours of formatting.',
  },
  {
    icon: Clock,
    title: 'Ongoing Support for Every Deal',
    text: 'Available in your member dashboard anytime, PrepCoach scales with you — whether prepping one property or building a portfolio.',
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function PrepCoachPage() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'excel'>('prompts');

  return (
    <div className="flex flex-col">
      {/* ============================================================ */}
      {/*  HERO — Meet PrepCoach                                        */}
      {/* ============================================================ */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Your Personal AI Coach for CRE Deals
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Unlock Faster CRE Financing with{' '}
              <span className="text-primary">K2 PrepCoach</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
              Tired of killer opportunities slipping away because the financing
              process is a mess? In the $150K–$5M commercial space, unprepared
              borrowers face constant rejections and wasted time.
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-4">
              K2 PrepCoach changes that. This proprietary AI agent acts as your
              24/7 personal coach. Built on decades of real CRE lending
              expertise, it guides you through every step — so you show up
              prepared, confident, and lender-ready.
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto mb-10">
              No fluff. Just practical, step-by-step support that turns
              frustration into fast approvals and better terms.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6 shadow-lg shadow-primary/20">
              <Link href="/membership/certified-borrower">
                Enroll Now &amp; Get Immediate Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/workbook">
                Grab the Free Workbook to Preview
                <Bot className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Learn More pop-up trigger */}
          <div className="text-center mt-6">
            <LearnMoreDialog />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY PREPCOACH                                                */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-80 h-80 rounded-full bg-emerald-50 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Zap className="h-4 w-4" />
              Why Serious Investors Choose PrepCoach
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Massive Value at Every Step
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From deal prep to lender outreach to closing — PrepCoach delivers
              the edge that separates funded deals from rejected ones.
            </p>
          </div>

          {/* Top row: 2 featured cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {VALUE_PROPS.slice(0, 2).map((vp, i) => (
              <div
                key={vp.title}
                className={`relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                  i === 0
                    ? 'bg-gradient-to-br from-primary/5 to-emerald-50/50 border-primary/20'
                    : 'bg-gradient-to-br from-slate-50 to-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                    i === 0 ? 'bg-primary text-white' : 'bg-white text-primary border border-slate-200'
                  }`}>
                    <vp.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {vp.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {vp.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {VALUE_PROPS.slice(2, 5).map((vp) => (
              <div
                key={vp.title}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <vp.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {vp.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {vp.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom: 2-column + 3-column mixed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {VALUE_PROPS.slice(5, 7).map((vp) => (
              <div
                key={vp.title}
                className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <vp.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {vp.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {vp.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUE_PROPS.slice(7).map((vp) => (
              <div
                key={vp.title}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <vp.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {vp.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {vp.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab switcher */}
      <section className="bg-white border-b sticky top-24 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'prompts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Bot className="inline h-4 w-4 mr-1.5 -mt-0.5" />
              Prompt Templates
            </button>
            <button
              onClick={() => setActiveTab('excel')}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === 'excel'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <FileSpreadsheet className="inline h-4 w-4 mr-1.5 -mt-0.5" />
              Excel Export Tips
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      {activeTab === 'prompts' ? <PromptsSection /> : <ExcelTipsSection />}

      {/* Bottom CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-6">
            <Bot className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Stop Losing Deals?
          </h2>
          <p className="text-slate-300 mb-4 leading-relaxed max-w-xl mx-auto">
            Your next commercial deal deserves better preparation. Unlock
            PrepCoach today as part of the K2 Financing Acceleration Program.
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
            Dive into PrepCoach inside your member dashboard. Use the prompts
            above to prepare your documents, then upload everything to your
            secure data room for lender review.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/membership/certified-borrower">
                Enroll Now &amp; Get Immediate Access
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-slate-900">
              <Link href="/workbook">
                Grab the Free Workbook to Preview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROMPTS TAB                                                         */
/* ------------------------------------------------------------------ */

function PromptsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState<
    Record<string, Record<string, string>>
  >({});
  const [launchTask, setLaunchTask] = useState<{
    taskId: string;
    prompt: string;
  } | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  const updateField = (templateId: string, key: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
  };

  const handleLaunch = (template: TaskTemplate) => {
    const values = fieldValues[template.id] ?? {};
    const prompt = template.buildPrompt(values);
    setLaunchTask({ taskId: template.taskId, prompt });
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            PrepCoach Tasks
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Each task below shows you exactly what PrepCoach will work on. Fill
            in your deal details, then hit{' '}
            <strong>Launch PrepCoach</strong> — PrepCoach will take your info
            and guide you step-by-step to a polished deliverable.
          </p>
        </div>

        <div className="space-y-4">
          {TASK_TEMPLATES.map((template) => {
            const isOpen = openId === template.id;
            const values = fieldValues[template.id] ?? {};
            const filledCount = template.fields.filter(
              (f) => (values[f.key] ?? '').trim().length > 0
            ).length;

            return (
              <Card
                key={template.id}
                className={`border-2 transition-all duration-200 ${
                  isOpen
                    ? 'border-primary/40 shadow-lg'
                    : 'border-slate-200 hover:border-primary/20 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggle(template.id)}
                  className="w-full text-left"
                >
                  <CardContent className="flex items-center gap-4 p-5 md:p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {template.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">
                          Task {template.step}
                        </span>
                        {filledCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <CheckCircle2 className="h-3 w-3" />
                            {filledCount}/{template.fields.length} filled
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {template.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {template.subtitle}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </CardContent>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-[2000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-slate-100 px-5 pb-6 pt-5 md:px-6">
                    {/* Educational description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {template.description}
                    </p>

                    {/* Input fields */}
                    {template.fields.length > 0 && (
                      <div className="space-y-4 mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Your Details
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {template.fields.map((field) => (
                            <div key={field.key} className="space-y-1.5">
                              <Label
                                htmlFor={`${template.id}-${field.key}`}
                                className="text-sm font-medium text-gray-700"
                              >
                                {field.label}
                              </Label>
                              <Input
                                id={`${template.id}-${field.key}`}
                                placeholder={field.placeholder}
                                value={values[field.key] ?? ''}
                                onChange={(e) =>
                                  updateField(
                                    template.id,
                                    field.key,
                                    e.target.value
                                  )
                                }
                                className="bg-slate-50 border-slate-200 focus:bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Launch button */}
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => handleLaunch(template)}
                        className="gap-2 shadow-md shadow-primary/20"
                      >
                        <Rocket className="h-4 w-4" />
                        Launch PrepCoach
                      </Button>
                      <span className="text-xs text-gray-400">
                        {template.fields.length > 0
                          ? 'Fields are optional — PrepCoach will ask for anything missing'
                          : 'PrepCoach will guide you interactively'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Controlled dialog — opens when a task is launched */}
      {launchTask && (
        <AssistantDialog
          defaultOpen
          initialPrompt={launchTask.prompt}
          initialTaskId={launchTask.taskId}
          onClose={() => setLaunchTask(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXCEL TIPS TAB                                                      */
/* ------------------------------------------------------------------ */

function ExcelTipsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Excel Export Tips for Rent Roll Analysis
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Clean, consistent, lender-friendly formatting that makes your data
            easy to review, audit, and trust. Lenders hate messy files — a
            polished Excel export shows you&apos;re prepared and respects their
            time.
          </p>
        </div>

        <div className="space-y-4">
          {EXCEL_TIPS.map((tip) => {
            const isOpen = openId === tip.id;

            return (
              <Card
                key={tip.id}
                className={`border-2 transition-all duration-200 ${
                  isOpen
                    ? 'border-primary/40 shadow-lg'
                    : 'border-slate-200 hover:border-primary/20 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggle(tip.id)}
                  className="w-full text-left"
                >
                  <CardContent className="flex items-center gap-4 p-5 md:p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      {tip.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tip.number}. {tip.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </CardContent>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                    {tip.content}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LEARN MORE DIALOG                                                   */
/* ------------------------------------------------------------------ */

function LearnMoreDialog() {
  const DIALOG_ITEMS = [
    {
      icon: FileText,
      title: 'Step-by-Step Guidance on Key Prep Tasks',
      text: 'PrepCoach walks you through must-have items like executive summaries, personal financial statements, and DSCR calculations — ensuring your package is complete, error-free, and built exactly to what lenders want.',
    },
    {
      icon: Phone,
      title: 'Custom Scripts for Lender Outreach',
      text: 'Get tailored phone scripts and email templates for your specific deal — so you contact lenders professionally, build instant credibility, and move quickly to real conversations instead of getting ghosted.',
    },
    {
      icon: Shield,
      title: 'Secure Data Room for Easy, Safe Sharing',
      text: 'Upload polished docs to our encrypted data room and grant targeted access to preferred lenders — cutting email chaos, protecting your info, and making collaboration seamless and professional.',
    },
    {
      icon: Zap,
      title: 'Time-Saving Automation with Expert Insights',
      text: 'Automates calculations, organizes documents, and flags issues early — slashing prep time in half while delivering insider tips that prevent common deal-killers and keep momentum high.',
    },
    {
      icon: Award,
      title: 'Higher Approval Rates and Better Terms',
      text: 'PrepCoach certifies you as a low-risk, high-quality borrower — leading to faster responses, stronger "yes" decisions, and more favorable rates/terms from lenders who value preparation over junk submissions.',
    },
    {
      icon: Users,
      title: "Exclusive Access to K2's Expert Community",
      text: 'As a K2 proprietary tool, PrepCoach connects you directly to our financing and CRE pros who prefer working with ready borrowers — creating a high-touch network built on mutual respect and real results.',
    },
    {
      icon: DollarSign,
      title: 'Cost-Effective Alternative to Consultants',
      text: 'Skip expensive $5K+ advisors — PrepCoach gives personalized, always-on coaching at a fraction of the cost, empowering you to handle more deals yourself while still getting pro-level guidance.',
    },
    {
      icon: Search,
      title: 'Spot & Fix Red Flags Before Lenders Do',
      text: 'Analyzes your rent roll, financials, and package for hidden issues (rollover risk, weak DSCR, etc.) and provides fixes — helping you strengthen weak spots and avoid surprises that tank deals.',
    },
    {
      icon: FileSpreadsheet,
      title: 'Build a Professional, Lender-Ready Package Fast',
      text: 'Generates polished outputs (summaries, tables, paragraphs) ready for your data room or submission — saving hours of formatting and ensuring your materials look sharp and trustworthy from the start.',
    },
    {
      icon: Clock,
      title: 'Ongoing Support for Every Deal',
      text: "Available in your member dashboard anytime, PrepCoach scales with you — whether you're prepping one property or building a portfolio — so you close more deals efficiently over time.",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group">
          <Info className="h-4 w-4 group-hover:scale-110 transition-transform" />
          Learn more about what PrepCoach can do
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0 gap-0 rounded-2xl">
        {/* Gradient header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 pt-8 pb-10 rounded-t-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent rounded-t-2xl" />
          <div className="relative">
            <DialogHeader>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary-foreground/80 mb-4 w-fit">
                <Bot className="h-3.5 w-3.5" />
                Proprietary AI Agent
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Unlock Faster CRE Financing with K2 PrepCoach
              </DialogTitle>
              <p className="text-base text-slate-300 mt-3 leading-relaxed">
                Your Personal AI Coach for Crushing Commercial Real Estate Deals
              </p>
            </DialogHeader>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-8">
          {/* Intro text */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Tired of killer opportunities slipping away because the financing
              process is a mess? In the $150K–$5M commercial space — where big
              banks drop the ball — unprepared borrowers face constant
              rejections, revisions, and wasted time.
            </p>
            <p className="text-lg font-semibold text-primary">
              K2 PrepCoach changes that.
            </p>
            <p>
              This proprietary AI agent, exclusive to K2 Commercial Finance
              members, acts as your 24/7 personal coach. Built on decades of
              real CRE lending expertise, it guides you through every step —
              especially financing — so you show up prepared, confident, and
              lender-ready.
            </p>
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
              <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm italic text-gray-500">
                No fluff. Just practical, step-by-step support that turns
                frustration into fast approvals and better terms.
              </p>
            </div>
          </div>

          {/* Section heading */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Why PrepCoach Delivers Massive Value
            </h3>
            <p className="text-sm text-gray-500">to Serious Investors</p>
          </div>

          {/* Value prop cards - 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIALOG_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`group rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${
                  i === 0
                    ? 'border-primary/30 bg-primary/5 sm:col-span-2'
                    : 'border-slate-200 bg-white hover:border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                    i === 0
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA footer */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center">
            <p className="text-white font-semibold mb-1">
              Ready to stop losing deals and start financing them right?
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Unlock PrepCoach today as part of the K2 Financing Acceleration
              Program.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="shadow-lg shadow-primary/30">
                <Link href="/membership/certified-borrower">
                  Enroll Now &amp; Get Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/20 text-white bg-white/10 hover:bg-white hover:text-slate-900"
              >
                <Link href="/workbook">
                  Free Workbook Preview
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">
              Your next commercial deal deserves better preparation. Let&apos;s
              make it happen.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
