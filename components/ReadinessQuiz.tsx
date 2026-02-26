'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  BookOpen,
  Play,
  RotateCcw,
  Clock,
  Zap,
  Target,
} from 'lucide-react';
import Link from 'next/link';

/* ── Questions ──────────────────────────────────────────────────────── */

type QuizQuestion = {
  id: string;
  question: string;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1_urgent',
    question:
      'Do you plan to pursue commercial real estate financing (purchase, refinance, or expansion) in the next 6 months?',
  },
  {
    id: 'q2_active_deal',
    question:
      'Are you actively looking at specific properties or deals right now, with intent to move forward soon?',
  },
  {
    id: 'q3_prepared',
    question:
      'Do you feel fully prepared to package your deal and approach lenders today (strong financials, rent roll, DSCR, etc.)?',
  },
  {
    id: 'q4_diy_willing',
    question:
      'Are you comfortable investing a few weeks/months of your own time to learn and prepare your financing package step-by-step on your own?',
  },
  {
    id: 'q5_rejected',
    question:
      'Have you previously applied for commercial financing and been turned down, or do you suspect your current setup would get rejected?',
  },
  {
    id: 'q6_long_term',
    question:
      'Are you planning to seek financing more than 12 months from now (or just exploring/learning for the future)?',
  },
  {
    id: 'q7_expert_access',
    question:
      'Do you want direct access to a team of CRE/financing experts, preferred lender connections, and tools like a secure data room to share polished packages?',
  },
];

/* ── Result types ───────────────────────────────────────────────────── */

type PathType = 'certified' | 'kit' | 'free';

type QuizResult = {
  path: PathType;
  headline: string;
  subheadline: string;
  body: string;
  bullets: string[];
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
};

/* ── Scoring logic ──────────────────────────────────────────────────── */

function computeResult(answers: Record<string, boolean>): QuizResult {
  const yes = (id: string) => answers[id] === true;

  // Tiebreaker: Q1 Yes (under 6 months) → always Certified
  if (yes('q1_urgent')) return RESULTS.certified;

  // Count urgency/gap signals for Certified
  let certifiedSignals = 0;
  if (yes('q2_active_deal')) certifiedSignals++;
  if (!yes('q3_prepared')) certifiedSignals++; // not prepared = gap
  if (yes('q5_rejected')) certifiedSignals++;
  if (yes('q7_expert_access')) certifiedSignals++;

  // 3+ signals → Certified
  if (certifiedSignals >= 3) return RESULTS.certified;

  // Free path: Q6 Yes (12+ months / exploring) and low urgency
  if (yes('q6_long_term') && !yes('q2_active_deal')) return RESULTS.free;

  // Kit path: DIY willing + moderate timeline
  if (yes('q4_diy_willing')) return RESULTS.kit;

  // Not DIY willing + expert access desired → Certified
  if (!yes('q4_diy_willing') && yes('q7_expert_access')) return RESULTS.certified;

  // Fallback for mixed answers → Kit
  return RESULTS.kit;
}

/* ── Result copy ────────────────────────────────────────────────────── */

const RESULTS: Record<PathType, QuizResult> = {
  certified: {
    path: 'certified',
    headline: 'Your Financing Readiness: Time-Sensitive',
    subheadline: 'Go Certified Borrower',
    body: "Based on your answers, you're in the window where speed and expert support matter most — planning financing in under 6 months, actively eyeing deals, or wanting direct access to pros and lenders. You don't have time for trial-and-error; one misstep could cost you the property.",
    bullets: [
      'Immediate access to K2 PrepCoach for step-by-step package building and red-flag fixes',
      'Secure data room to upload/share polished docs with preferred lenders',
      'Direct support from our CRE/financing experts who work best with prepared borrowers',
      'Priority lender connections and community network for faster approvals and better terms',
      'Full toolkit to position your deal as low-risk and fundable — no more rejections or weak offers',
    ],
    cta: {
      label: 'Become a Certified Borrower Now – Unlock Everything',
      href: '/membership/certified-borrower',
    },
    secondary: {
      label: 'Learn More About Certification Benefits',
      href: '/membership',
    },
  },
  kit: {
    path: 'kit',
    headline: 'Your Financing Readiness: Strong Foundation',
    subheadline: 'Start with the Success Kit',
    body: "Your answers show solid awareness and time on your side — you're willing to invest effort in learning the process yourself, but not rushing into action tomorrow. You're not a beginner, but you're not fully lender-ready yet either. The Financing Success Kit is the perfect fit: affordable, self-paced tools to master preparation on your terms.",
    bullets: [
      'Downloadable workbook with templates, checklists, and proven frameworks',
      'Basic PrepCoach access for key tasks like executive summaries, PFS, DSCR calcs, and lender scripts',
      'Step-by-step guidance to build a professional package without spending weeks guessing',
      'Confidence to approach lenders knowing your materials are strong and complete',
      'Foundation to upgrade to Certified later if your timeline accelerates',
    ],
    cta: {
      label: 'Get the Success Kit for $15 – Start Prepping Now',
      href: '/workbook',
    },
    secondary: {
      label: 'Preview Free Workbook Sample',
      href: '/content',
    },
  },
  free: {
    path: 'free',
    headline: 'Your Financing Readiness: Building Basics',
    subheadline: 'Start Free',
    body: "You're exploring commercial financing for the longer term (12+ months out) or just getting oriented — no immediate deals or pressure. Smart move: start with knowledge before committing time or money. Dive into our free educational resources to build a solid understanding at your own pace.",
    bullets: [
      'Public videos and articles on CRE financing basics, common pitfalls, and lender expectations',
      'Insights into the $150K–$5M market and why preparation wins',
      'No-pressure way to learn what makes a deal fundable',
      'Clear next steps when you\'re ready to move faster (Kit or Certified)',
    ],
    cta: {
      label: 'Access Free Videos & Articles Now',
      href: '/content',
    },
    secondary: {
      label: 'Take the Quiz Again Later If Things Change',
      href: '#',
    },
  },
};

/* ── Component ──────────────────────────────────────────────────────── */

export function ReadinessQuiz() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const started = step >= 0;
  const currentQ =
    step >= 0 && step < QUIZ_QUESTIONS.length ? QUIZ_QUESTIONS[step] : null;
  const progress = started
    ? Math.round(((step + 1) / QUIZ_QUESTIONS.length) * 100)
    : 0;

  const handleAnswer = (answer: boolean) => {
    if (!currentQ) return;
    const next = { ...answers, [currentQ.id]: answer };
    setAnswers(next);

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResult(computeResult(next));
      setStep(QUIZ_QUESTIONS.length);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(-1);
    setAnswers({});
    setResult(null);
  };

  /* ── Intro screen ───────────────────────────────────── */
  if (!started) {
    return (
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          How Ready Are You for Financing?
        </h3>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Answer 7 quick yes/no questions and get a personalized recommendation —
          whether you need expert support now, a DIY toolkit, or free resources
          to start learning.
        </p>
        <Button
          size="lg"
          onClick={() => setStep(0)}
          className="text-lg px-8 py-6"
        >
          Take the 2-Minute Quiz
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  /* ── Result screen ──────────────────────────────────── */
  if (result) {
    const pathIcon =
      result.path === 'certified' ? (
        <Shield className="h-10 w-10 text-primary" />
      ) : result.path === 'kit' ? (
        <Target className="h-10 w-10 text-amber-500" />
      ) : (
        <Play className="h-10 w-10 text-green-500" />
      );

    const accentColor =
      result.path === 'certified'
        ? 'border-primary/40 bg-primary/5'
        : result.path === 'kit'
          ? 'border-amber-400/40 bg-amber-50'
          : 'border-green-400/40 bg-green-50';

    const badgeColor =
      result.path === 'certified'
        ? 'bg-primary/10 text-primary'
        : result.path === 'kit'
          ? 'bg-amber-100 text-amber-800'
          : 'bg-green-100 text-green-800';

    // Build a readiness summary bar
    const yesCount = Object.values(answers).filter(Boolean).length;
    const readinessLabel =
      result.path === 'certified'
        ? 'High Urgency'
        : result.path === 'kit'
          ? 'Moderate Readiness'
          : 'Early Stage';

    return (
      <div className="space-y-6">
        {/* Score summary bar */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
            style={{ background: result.path === 'certified' ? '#f0f4ff' : result.path === 'kit' ? '#fef9ee' : '#f0fdf4' }}
          >
            <Clock className="h-4 w-4" />
            Your Readiness Score: {yesCount}/7 — {readinessLabel}
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            {pathIcon}
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {result.headline}
              </h3>
              <span className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-bold ${badgeColor}`}>
                {result.subheadline}
              </span>
            </div>
          </div>
        </div>

        {/* Body + bullets */}
        <Card className={`${accentColor} border`}>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-5 leading-relaxed">
              {result.body}
            </p>

            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              What you&apos;ll get:
            </h4>
            <ul className="space-y-2.5">
              {result.bullets.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {result.path === 'certified' && (
              <p className="mt-5 text-sm font-medium text-gray-800 bg-white/60 rounded-lg p-3 border border-primary/20">
                Don&apos;t let urgency turn into lost opportunities. Get expert-backed preparation now and close faster.
              </p>
            )}
            {result.path === 'kit' && (
              <p className="mt-5 text-sm font-medium text-gray-800 bg-white/60 rounded-lg p-3 border border-amber-300/30">
                Take control of your prep today — build skills that pay off on every future deal.
              </p>
            )}
            {result.path === 'free' && (
              <p className="mt-5 text-sm font-medium text-gray-800 bg-white/60 rounded-lg p-3 border border-green-300/30">
                Knowledge is power — get the free foundation and decide your path when the timing feels right.
              </p>
            )}
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="flex flex-col gap-3 justify-center pt-2">
          <Button size="lg" asChild className="text-sm w-full">
            <Link href={result.cta.href}>
              {result.cta.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <div className="flex gap-3 justify-center">
            {result.secondary.href === '#' ? (
              <Button size="lg" variant="outline" onClick={handleReset} className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                {result.secondary.label}
              </Button>
            ) : (
              <Button size="lg" variant="outline" asChild className="flex-1">
                <Link href={result.secondary.href}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  {result.secondary.label}
                </Link>
              </Button>
            )}
            {result.secondary.href !== '#' && (
              <Button size="lg" variant="ghost" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Question screen ────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Question {step + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span>{progress}% complete</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      {currentQ && (
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6 leading-snug">
            {currentQ.question}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-14 text-base font-semibold hover:bg-primary/5 hover:border-primary/40 transition-all"
              onClick={() => handleAnswer(true)}
            >
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              Yes
            </Button>
            <Button
              variant="outline"
              className="h-14 text-base font-semibold hover:bg-red-50 hover:border-red-300 transition-all"
              onClick={() => handleAnswer(false)}
            >
              <span className="mr-2 inline-flex items-center justify-center h-5 w-5 rounded-full border-2 border-red-400 text-red-400 text-xs font-bold">✕</span>
              No
            </Button>
          </div>
        </div>
      )}

      {/* Back button */}
      {step > 0 && (
        <Button variant="ghost" size="sm" onClick={handleBack}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Previous question
        </Button>
      )}
    </div>
  );
}
