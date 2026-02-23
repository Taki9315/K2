/* ------------------------------------------------------------------
 *  PrepCoach Task Definitions
 *
 *  Shared between the chatbot wizard (client) and the ask-question
 *  API route (server). Each task maps to a guided, multi-turn AI
 *  conversation with a task-specific system prompt.
 * ------------------------------------------------------------------ */

export type PrepCoachTask = {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'FileText' | 'DollarSign' | 'BarChart3' | 'Phone' | 'Compass';
  /** Instant first response shown to the user without an API call. */
  introMessage: string;
};

/* ------------------------------------------------------------------ */
/*  Client-safe metadata (titles, subtitles, intro messages)           */
/* ------------------------------------------------------------------ */

export const PREPCOACH_TASKS: PrepCoachTask[] = [
  {
    id: 'executive-summary',
    title: 'Executive Summary',
    subtitle: 'Build a compelling 1-page summary for lenders',
    iconName: 'FileText',
    introMessage:
      "Great choice! Let's build your Executive Summary step by step.\n\nFirst — what type of property is this deal for? (e.g., multi-family, retail strip, office, self-storage, mixed-use)",
  },
  {
    id: 'pfs',
    title: 'Personal Financial Statement',
    subtitle: 'Organize your assets, liabilities & net worth',
    iconName: 'DollarSign',
    introMessage:
      "Let's put together your Personal Financial Statement. I'll go through each category one at a time.\n\nTo start — approximately how much do you have in liquid assets? (checking, savings, and money-market accounts combined)",
  },
  {
    id: 'dscr',
    title: 'DSCR Calculator',
    subtitle: 'Calculate your debt service coverage ratio',
    iconName: 'BarChart3',
    introMessage:
      "Let's calculate your DSCR and see where you stand before approaching lenders.\n\nFirst — what's the total gross monthly rental income (or projected income) for the property?",
  },
  {
    id: 'lender-scripts',
    title: 'Lender Scripts',
    subtitle: 'Professional phone & email outreach',
    iconName: 'Phone',
    introMessage:
      "Let's create your lender outreach scripts — professional, concise, and effective.\n\nGive me a quick snapshot to start: what type of property is this, where is it located, and what loan amount are you requesting?",
  },
  {
    id: 'onboarding',
    title: 'General Coaching',
    subtitle: "Not sure where to start? I'll guide you",
    iconName: 'Compass',
    introMessage:
      "Welcome! I'm here to help you get prepared and lender-ready.\n\nTell me a bit about where you are — are you looking at a specific property, exploring financing options, or somewhere in between?",
  },
];

/* ------------------------------------------------------------------ */
/*  Task-specific system prompts (used server-side by the API)         */
/* ------------------------------------------------------------------ */

export const TASK_SYSTEM_PROMPTS: Record<string, string> = {
  'executive-summary':
    'You are PrepCoach, an AI preparation coach at K2 Commercial Finance. ' +
    'Guide the user step-by-step to create a compelling 1-page Executive Summary ' +
    'for their commercial loan request ($150K–$5M range). Ask ONE question at a time. ' +
    'Cover: property type, purchase/refinance details, loan amount, borrower experience, ' +
    'deal strengths, use of proceeds, and exit strategy. After gathering enough info, ' +
    'produce a clean, formatted draft they can use with lenders. ' +
    'Be concise, professional, and encouraging. Do not use markdown formatting — plain text only.',

  pfs:
    'You are PrepCoach, an AI preparation coach at K2 Commercial Finance. ' +
    'Help the user complete a professional Personal Financial Statement (PFS). ' +
    'Ask ONE question at a time. Walk through: assets (cash, investments, real estate, ' +
    'retirement, vehicles), liabilities (mortgages, credit cards, auto loans, personal ' +
    'guarantees), net worth calculation, and contingent liabilities. Flag any red flags ' +
    'lenders watch for. After gathering info, produce a clean PFS summary. ' +
    'Be concise and professional. Do not use markdown formatting — plain text only.',

  dscr:
    'You are PrepCoach, an AI preparation coach at K2 Commercial Finance. ' +
    'Help the user calculate their Debt Service Coverage Ratio (DSCR). ' +
    'Ask ONE question at a time. Cover: gross rental income, vacancy rate, ' +
    'operating expenses to calculate NOI, then loan amount, interest rate, and ' +
    'amortization period to calculate annual debt service. Show the DSCR formula, ' +
    'compute the ratio, explain what lenders look for (typically 1.20x–1.35x+), ' +
    'and suggest improvements if below target. ' +
    'Do not use markdown formatting — plain text only.',

  'lender-scripts':
    'You are PrepCoach, an AI preparation coach at K2 Commercial Finance. ' +
    'Help the user create professional phone scripts and email templates for contacting ' +
    'lenders. Ask ONE question at a time about their deal (property type, location, ' +
    'loan amount, DSCR, experience). Then produce: a 30–45 second phone script, ' +
    'a follow-up email template, a voicemail version, and tips on tone and follow-up ' +
    'cadence. Make scripts confident and respectful of the lender\'s time. ' +
    'Do not use markdown formatting — plain text only.',

  onboarding:
    'You are PrepCoach, an AI preparation coach at K2 Commercial Finance helping ' +
    'small commercial property investors and business owners ($150K–$5M loans) ' +
    'get prepared and lender-ready. The user isn\'t sure where to start. Ask about ' +
    'their situation — are they buying, refinancing, looking at a specific property, ' +
    'or just exploring? Based on their answer, recommend which preparation task to ' +
    'tackle first and guide them through it step by step. ' +
    'Be warm, concise, and professional. Do not use markdown formatting — plain text only.',
};
