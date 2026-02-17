export type QuestionType = 'choice' | 'number' | 'text';

export type AnswerValue = string | number;

export type Answers = Record<string, AnswerValue>;

export type QuestionFormat = 'currency' | 'percent';

export type AssistantQuestion = {
  id: string;
  message: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  optional?: boolean;
  format?: QuestionFormat;
  next?: (answers: Answers) => string | null;
};

/* ------------------------------------------------------------------ */
/*  Section intro messages — shown once when the flow enters a section */
/* ------------------------------------------------------------------ */

export const SECTION_INTROS: Record<string, string> = {
  property_type:
    "Great — let's get your deal entered. We'll start with the property details.",
  current_noi:
    "Now let's look at the property financials.",
  net_worth:
    "Next, I need some information about the borrower / sponsor.",
  overall_strategy:
    "Almost there — tell me about your strategy for this property.",
  primary_goal:
    "Let's capture your goals and any challenges.",
  contact_name:
    "Last step — your contact information so we can follow up.",
};

/* ------------------------------------------------------------------ */
/*  Questions                                                          */
/* ------------------------------------------------------------------ */

const PROPERTY_TYPES_WITH_FOLLOWUP = [
  'Mobile Home Park (MHP)',
  'RV Park',
  'Multifamily',
  'Automotive',
] as const;

export const questions: AssistantQuestion[] = [
  /* ============================================================== */
  /*  SECTION 1 — DEAL BASICS                                       */
  /* ============================================================== */

  {
    id: 'property_type',
    message: 'What type of property is this transaction for?',
    type: 'choice',
    options: [
      'Mobile Home Park (MHP)',
      'RV Park',
      'Multifamily',
      'Automotive',
      'Self-Storage',
      'Retail',
      'Office',
      'Industrial',
      'Warehouse',
      'Short-Term Rental (Airbnb)',
      'Funeral Home',
      'Raw Land',
      'Healthcare',
      'Restaurant',
      'Other',
    ],
    next: (a) => {
      switch (a.property_type) {
        case 'Mobile Home Park (MHP)':
          return 'mhp_poh_percent';
        case 'RV Park':
          return 'rv_num_pads';
        case 'Multifamily':
          return 'mf_num_doors';
        case 'Automotive':
          return 'auto_underground_tanks';
        default:
          return 'property_address';
      }
    },
  },

  /* --- MHP sub-questions ----------------------------------------- */
  {
    id: 'mhp_poh_percent',
    message: 'What percentage of homes are park-owned (POH)?',
    type: 'number',
    placeholder: 'e.g. 22',
    min: 0,
    max: 100,
    format: 'percent',
  },
  {
    id: 'mhp_infrastructure',
    message:
      'Are there any infrastructure issues? (water, sewer, electric, roads)',
    type: 'text',
    placeholder: 'Describe any known issues or type "None"',
  },
  {
    id: 'mhp_num_pads',
    message: 'How many total pads does the park have?',
    type: 'number',
    placeholder: 'e.g. 118',
    min: 1,
    next: () => 'property_address',
  },

  /* --- RV Park sub-questions ------------------------------------- */
  {
    id: 'rv_num_pads',
    message: 'How many pads does the RV park have?',
    type: 'number',
    placeholder: 'e.g. 85',
    min: 1,
  },
  {
    id: 'rv_seasonal_revenue',
    message:
      'Do seasonal tenants (over 30-day visits) account for more or less than 50% of revenues?',
    type: 'choice',
    options: ['Less than 50%', 'More than 50%'],
    next: () => 'property_address',
  },

  /* --- Multifamily sub-question ---------------------------------- */
  {
    id: 'mf_num_doors',
    message: 'How many doors (units) does the property have?',
    type: 'number',
    placeholder: 'e.g. 24',
    min: 1,
    next: () => 'property_address',
  },

  /* --- Automotive sub-questions ---------------------------------- */
  {
    id: 'auto_underground_tanks',
    message: 'Are there underground storage tanks on the property?',
    type: 'choice',
    options: ['Yes', 'No'],
    next: (a) =>
      a.auto_underground_tanks === 'Yes'
        ? 'auto_environmental'
        : 'property_address',
  },
  {
    id: 'auto_environmental',
    message: 'Are there any known environmental issues?',
    type: 'choice',
    options: ['Yes', 'No'],
    next: () => 'property_address',
  },

  /* --- Address & County ------------------------------------------ */
  {
    id: 'property_address',
    message: 'What is the full property address? (street, city, state, zip)',
    type: 'text',
    placeholder: '1842 Pine Hollow Road, Lebanon, TN 37087',
  },
  {
    id: 'property_county',
    message: 'Please confirm the county the property is located in.',
    type: 'text',
    placeholder: 'e.g. Wilson County',
  },

  /* --- Owner Occupancy ------------------------------------------- */
  {
    id: 'owner_occupied',
    message: 'Is the property owner-occupied or held for lease to others?',
    type: 'choice',
    options: ['Owner-Occupied', 'Held for Lease'],
    next: (a) =>
      a.owner_occupied === 'Owner-Occupied'
        ? 'owner_occupy_percent'
        : 'deal_type',
  },
  {
    id: 'owner_occupy_percent',
    message:
      'Does the borrowing entity occupy more or less than 50% of the space?',
    type: 'choice',
    options: ['More than 50%', 'Less than 50%'],
  },

  /* --- Deal Type ------------------------------------------------- */
  {
    id: 'deal_type',
    message: 'Is this a purchase or a refinance?',
    type: 'choice',
    options: ['Purchase', 'Refinance'],
    next: (a) =>
      a.deal_type === 'Purchase' ? 'purchase_price' : 'refi_current_balance',
  },

  /* --- Purchase sub-questions ------------------------------------ */
  {
    id: 'purchase_price',
    message: 'What is the purchase price?',
    type: 'number',
    placeholder: 'e.g. 2500000',
    min: 1,
    format: 'currency',
  },
  {
    id: 'under_contract',
    message: 'Is the property currently under contract?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 'down_payment',
    message: 'How much of a down payment can you afford?',
    type: 'number',
    placeholder: 'e.g. 500000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'time_constraints',
    message:
      'Are there specific time constraints you are facing? (e.g., closing deadline, 1031 exchange)',
    type: 'text',
    optional: true,
    placeholder: 'Describe any constraints or skip',
    next: () => 'borrower_type',
  },

  /* --- Refinance sub-questions ----------------------------------- */
  {
    id: 'refi_current_balance',
    message: 'What is the current loan balance?',
    type: 'number',
    placeholder: 'e.g. 2910000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'refi_monthly_payment',
    message: 'What is the current monthly payment?',
    type: 'number',
    placeholder: 'e.g. 19840',
    min: 0,
    format: 'currency',
  },
  {
    id: 'refi_prepay_penalty',
    message:
      'Is there a prepayment penalty? If so, describe it.',
    type: 'text',
    placeholder: 'e.g. Step-down (3-2-1) or None',
  },
  {
    id: 'refi_estimated_value',
    message: 'What is the estimated current property value?',
    type: 'number',
    placeholder: 'e.g. 5750000',
    min: 1,
    format: 'currency',
  },
  {
    id: 'refi_cash_out',
    message: 'How much cash out are you requesting (in $)?',
    type: 'number',
    placeholder: 'e.g. 500000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'refi_balloon',
    message: 'Is there a balloon payment coming due?',
    type: 'choice',
    options: ['Yes', 'No'],
    next: (a) =>
      a.refi_balloon === 'Yes' ? 'refi_balloon_due' : 'borrower_type',
  },
  {
    id: 'refi_balloon_due',
    message: 'When is the balloon payment due?',
    type: 'text',
    placeholder: 'e.g. December 2026',
    next: () => 'borrower_type',
  },

  /* --- Borrower / Entity ----------------------------------------- */
  {
    id: 'borrower_type',
    message: 'Will the borrower be an individual or an entity?',
    type: 'choice',
    options: ['Individual', 'Entity'],
    next: (a) =>
      a.borrower_type === 'Entity'
        ? 'entity_type'
        : 'requested_loan_amount',
  },
  {
    id: 'entity_type',
    message: 'What type of entity?',
    type: 'choice',
    options: ['LLC', 'LP', 'S-Corp', 'C-Corp', 'Trust'],
  },
  {
    id: 'entity_members',
    message: 'How many members / owners does the entity have?',
    type: 'number',
    min: 1,
    placeholder: 'e.g. 3',
  },
  {
    id: 'personal_guarantees',
    message: 'Will there be personal guarantees?',
    type: 'choice',
    options: ['Yes', 'No'],
    next: (a) =>
      a.personal_guarantees === 'Yes'
        ? 'guarantors'
        : 'requested_loan_amount',
  },
  {
    id: 'guarantors',
    message: 'Who will be the guarantor(s)?',
    type: 'text',
    placeholder: 'e.g. John Smith & Maria Smith',
    next: () => 'requested_loan_amount',
  },

  /* --- Loan Amount ----------------------------------------------- */
  {
    id: 'requested_loan_amount',
    message: 'What is the requested loan amount?',
    type: 'number',
    placeholder: 'e.g. 3850000',
    min: 1,
    format: 'currency',
  },

  /* ============================================================== */
  /*  SECTION 2 — PROPERTY FINANCIALS                                */
  /* ============================================================== */

  {
    id: 'current_noi',
    message: 'What is the current Net Operating Income (NOI)?',
    type: 'number',
    placeholder: 'e.g. 412000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'stabilized_noi',
    message:
      'What is the stabilized NOI? (Skip if this is not a value-add deal)',
    type: 'number',
    placeholder: 'e.g. 445000',
    min: 0,
    format: 'currency',
    optional: true,
  },
  {
    id: 'cap_rate',
    message: 'What is the cap rate? (Optional)',
    type: 'number',
    placeholder: 'e.g. 7.0',
    min: 0,
    max: 100,
    format: 'percent',
    optional: true,
  },
  {
    id: 'occupancy',
    message: 'What is the current occupancy rate?',
    type: 'number',
    placeholder: 'e.g. 94',
    min: 0,
    max: 100,
    format: 'percent',
  },

  /* ============================================================== */
  /*  SECTION 3 — SPONSOR PROFILE                                    */
  /* ============================================================== */

  {
    id: 'net_worth',
    message: "What is the sponsor's net worth?",
    type: 'number',
    placeholder: 'e.g. 4200000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'liquidity',
    message: "What is the sponsor's available liquidity (cash + liquid assets)?",
    type: 'number',
    placeholder: 'e.g. 610000',
    min: 0,
    format: 'currency',
  },
  {
    id: 'credit_score',
    message: "What is the sponsor's credit score range?",
    type: 'choice',
    options: [
      'Below 620',
      '620–659',
      '660–699',
      '700–739',
      '740–779',
      '780+',
    ],
  },
  {
    id: 'cre_experience',
    message:
      'Describe the commercial real estate experience. (Years and asset types)',
    type: 'text',
    placeholder: 'e.g. 8 years — owns/operates 3 MHPs totaling 312 pads',
  },

  /* ============================================================== */
  /*  SECTION 3B — BORROWER INTENT & STRATEGY                       */
  /* ============================================================== */

  {
    id: 'overall_strategy',
    message: 'What is your overall strategy for this property?',
    type: 'choice',
    options: [
      'Long-term hold',
      'Short-term hold',
      'Value-add',
      'Reposition',
      'Refinance-and-hold',
      'Other',
    ],
  },
  {
    id: 'capital_improvements',
    message: 'Are you planning any capital improvements?',
    type: 'choice',
    options: ['Yes', 'No'],
    next: (a) =>
      a.capital_improvements === 'Yes'
        ? 'capex_budget'
        : 'financing_reason',
  },
  {
    id: 'capex_budget',
    message: 'What is the estimated capital improvement budget?',
    type: 'number',
    placeholder: 'e.g. 150000',
    min: 0,
    format: 'currency',
    next: () => 'financing_reason',
  },
  {
    id: 'financing_reason',
    message: 'What prompted you to explore financing right now?',
    type: 'text',
    placeholder:
      'e.g. Balloon payment approaching, rate reset, expansion, acquisition opportunity',
  },
  {
    id: 'hold_period',
    message: 'How long do you plan to hold the property?',
    type: 'choice',
    options: ['0–3 years', '3–7 years', '7+ years'],
  },
  {
    id: 'operational_changes',
    message:
      'Do you anticipate any major operational changes in the next 12–24 months?',
    type: 'text',
    placeholder:
      'e.g. New leases, rent increases, renovations, management changes',
    optional: true,
  },

  /* ============================================================== */
  /*  SECTION 4 — GOALS & CHALLENGES                                */
  /* ============================================================== */

  {
    id: 'primary_goal',
    message: 'What is your primary goal for this financing?',
    type: 'text',
    placeholder:
      'e.g. Refinance into a lower rate and pull cash out for improvements',
  },
  {
    id: 'secondary_goals',
    message: 'Any secondary goals?',
    type: 'text',
    placeholder: 'e.g. Extend amortization and improve monthly cash flow',
    optional: true,
  },
  {
    id: 'deal_challenges',
    message:
      'Are there any known challenges with this deal? (Optional)',
    type: 'text',
    placeholder: 'e.g. Septic systems require monitoring, pad infill capex',
    optional: true,
  },
  {
    id: 'timeline',
    message: 'What is your target timeline to close?',
    type: 'choice',
    options: ['30 days', '60 days', '90 days', '120+ days'],
  },

  /* ============================================================== */
  /*  SECTION 5 — CONTACT INFO                                      */
  /* ============================================================== */

  {
    id: 'contact_name',
    message: "What is your full name (or the primary contact's name)?",
    type: 'text',
    placeholder: 'e.g. John Smith',
  },
  {
    id: 'contact_email',
    message: 'What is the best email address to reach you?',
    type: 'text',
    placeholder: 'john@example.com',
  },
  {
    id: 'contact_phone',
    message: 'Phone number? (Optional)',
    type: 'text',
    placeholder: '(267) 555-1234',
    optional: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Lookup helpers                                                     */
/* ------------------------------------------------------------------ */

const questionMap = new Map(
  questions.map((q) => [q.id, q])
);

export const FIRST_QUESTION_ID = questions[0]?.id ?? '';

function getDefaultNextQuestionId(
  currentQuestionId: string
): string | null {
  const idx = questions.findIndex((q) => q.id === currentQuestionId);
  if (idx === -1 || idx >= questions.length - 1) return null;
  return questions[idx + 1].id;
}

export function getQuestionById(
  questionId: string
): AssistantQuestion | null {
  return questionMap.get(questionId) ?? null;
}

export function getNextQuestionId(
  currentQuestionId: string,
  answers: Answers
): string | null {
  const q = getQuestionById(currentQuestionId);
  if (!q) return null;
  if (q.next) return q.next(answers);
  return getDefaultNextQuestionId(currentQuestionId);
}

export function getQuestionFlow(answers: Answers): string[] {
  const visited = new Set<string>();
  const flow: string[] = [];
  let currentId: string | null = FIRST_QUESTION_ID;
  let safety = 0;
  const limit = questions.length + 10;

  while (currentId && safety < limit) {
    if (visited.has(currentId)) break;
    visited.add(currentId);
    flow.push(currentId);
    currentId = getNextQuestionId(currentId, answers);
    safety += 1;
  }

  return flow;
}

/* ------------------------------------------------------------------ */
/*  Display helpers                                                    */
/* ------------------------------------------------------------------ */

export function formatAnswerForDisplay(
  questionId: string,
  answer: AnswerValue
): string {
  const q = getQuestionById(questionId);
  if (!q) return String(answer);

  if (q.format === 'currency') {
    const n = Number(answer);
    if (!Number.isNaN(n)) {
      return `$${n.toLocaleString()}`;
    }
  }

  if (q.format === 'percent') {
    const n = Number(answer);
    if (!Number.isNaN(n)) return `${n}%`;
  }

  return String(answer);
}

export function formatAnswersForPrompt(answers: Answers): string {
  const flow = getQuestionFlow(answers);

  return flow
    .map((qId) => {
      const q = getQuestionById(qId);
      if (!q) return null;
      const raw = answers[qId];
      if (raw === undefined || raw === null) return null;
      return `- ${q.message} ${formatAnswerForDisplay(qId, raw)}`;
    })
    .filter(Boolean)
    .join('\n');
}

/* ------------------------------------------------------------------ */
/*  Auto-calculations                                                  */
/* ------------------------------------------------------------------ */

export function computeLTV(answers: Answers): number | null {
  const loan = Number(answers.requested_loan_amount);
  if (!loan || loan <= 0) return null;

  const value =
    answers.deal_type === 'Purchase'
      ? Number(answers.purchase_price)
      : Number(answers.refi_estimated_value);

  if (!value || value <= 0) return null;
  return Math.round((loan / value) * 1000) / 10;
}

export function computeDSCR(answers: Answers): number | null {
  const noi = Number(answers.current_noi);
  const loan = Number(answers.requested_loan_amount);
  if (!noi || !loan || loan <= 0) return null;

  const monthlyRate = 0.07 / 12;
  const n = 25 * 12;
  const monthlyPayment =
    (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
  const annualDS = monthlyPayment * 12;
  if (annualDS <= 0) return null;

  return Math.round((noi / annualDS) * 100) / 100;
}

export function computeLiquidityPercent(answers: Answers): number | null {
  const liq = Number(answers.liquidity);
  const loan = Number(answers.requested_loan_amount);
  if (liq === undefined || !loan || loan <= 0) return null;
  return Math.round((liq / loan) * 1000) / 10;
}

/* ------------------------------------------------------------------ */
/*  Document checklist (context-aware)                                 */
/* ------------------------------------------------------------------ */

export function buildDocumentChecklist(answers: Answers): string[] {
  const checklist = [
    'Completed personal financial statement',
    'Last 2 years of tax returns (personal)',
    'Most recent 3 months of bank statements',
    'Property operating statements (trailing 12 months)',
    'Current rent roll',
  ];

  if (
    answers.borrower_type === 'Entity'
  ) {
    checklist.push('Entity formation documents (Articles of Organization / Operating Agreement)');
    checklist.push('Last 2 years of business tax returns');
    checklist.push('Business debt schedule');
  } else {
    checklist.push('Government-issued photo ID');
  }

  const pt = String(answers.property_type ?? '');

  if (pt === 'Multifamily') {
    checklist.push('Unit-by-unit rent roll');
    checklist.push('Lease abstracts for major tenants');
  }

  if (pt === 'Mobile Home Park (MHP)') {
    checklist.push('Pad-level rent roll');
    checklist.push('Infrastructure inspection reports (if available)');
    checklist.push('POH inventory list');
  }

  if (pt === 'RV Park') {
    checklist.push('Revenue breakdown: transient vs. seasonal vs. long-term');
  }

  if (['Office', 'Retail', 'Industrial', 'Warehouse'].includes(pt)) {
    checklist.push('Major tenant lease summaries');
    checklist.push('Tenant estoppel certificates (if available)');
  }

  if (answers.deal_type === 'Purchase') {
    checklist.push('Executed purchase agreement');
    checklist.push('Earnest money verification');
  }

  if (answers.deal_type === 'Refinance') {
    checklist.push('Current loan payoff statement');
  }

  if (answers.capital_improvements === 'Yes') {
    checklist.push('Capital improvement budget / scope of work');
  }

  return checklist;
}
