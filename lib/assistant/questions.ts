export type QuestionType = 'choice' | 'number' | 'text';

export type AnswerValue = string | number;

export type Answers = Record<string, AnswerValue>;

export type AssistantQuestion = {
  id: string;
  message: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  next?: (answers: Answers) => string | null;
};

export const questions: AssistantQuestion[] = [
  {
    id: 'borrower_type',
    message: 'What type of borrower are you?',
    type: 'choice',
    options: ['Individual', 'LLC', 'Corporation'],
  },
  {
    id: 'property_type',
    message: 'What property type is this request for?',
    type: 'choice',
    options: ['Multifamily', 'Office', 'Retail', 'Industrial'],
  },
  {
    id: 'loan_amount',
    message: 'What loan amount do you need?',
    type: 'number',
    min: 10000,
    placeholder: 'Enter requested amount in USD',
  },
  {
    id: 'credit_score',
    message: 'What is your credit score?',
    type: 'number',
    min: 300,
    max: 850,
    next: (answers) =>
      answers.borrower_type === 'Individual'
        ? 'annual_income'
        : 'business_revenue',
  },
  {
    id: 'annual_income',
    message: 'What is your annual income?',
    type: 'number',
    min: 0,
    placeholder: 'Annual personal income in USD',
    next: () => 'closing_timeline',
  },
  {
    id: 'business_revenue',
    message: 'What is your annual business revenue?',
    type: 'number',
    min: 0,
    placeholder: 'Annual business revenue in USD',
    next: () => 'closing_timeline',
  },
  {
    id: 'closing_timeline',
    message: 'How soon do you need to close?',
    type: 'choice',
    options: ['0-30 days', '31-60 days', '61-90 days', '90+ days'],
    next: () => 'additional_notes',
  },
  {
    id: 'additional_notes',
    message:
      'Any additional context we should include in your package summary?',
    type: 'text',
    placeholder: 'Optional notes (business plan, collateral, tenant profile...)',
  },
];

const questionMap = new Map(questions.map((question) => [question.id, question]));

export const FIRST_QUESTION_ID = questions[0]?.id ?? '';

function getDefaultNextQuestionId(currentQuestionId: string): string | null {
  const currentIndex = questions.findIndex(
    (question) => question.id === currentQuestionId
  );

  if (currentIndex === -1 || currentIndex >= questions.length - 1) {
    return null;
  }

  return questions[currentIndex + 1].id;
}

export function getQuestionById(questionId: string): AssistantQuestion | null {
  return questionMap.get(questionId) ?? null;
}

export function getNextQuestionId(
  currentQuestionId: string,
  answers: Answers
): string | null {
  const currentQuestion = getQuestionById(currentQuestionId);
  if (!currentQuestion) return null;

  if (currentQuestion.next) {
    return currentQuestion.next(answers);
  }

  return getDefaultNextQuestionId(currentQuestionId);
}

export function getQuestionFlow(answers: Answers): string[] {
  const visited = new Set<string>();
  const flow: string[] = [];
  let currentId: string | null = FIRST_QUESTION_ID;
  let safety = 0;

  while (currentId && safety < questions.length + 5) {
    if (visited.has(currentId)) break;

    visited.add(currentId);
    flow.push(currentId);

    currentId = getNextQuestionId(currentId, answers);
    safety += 1;
  }

  return flow;
}

export function formatAnswerForDisplay(
  questionId: string,
  answer: AnswerValue
): string {
  if (questionId === 'loan_amount') {
    const numericValue = Number(answer);
    if (!Number.isNaN(numericValue)) {
      return `$${numericValue.toLocaleString()}`;
    }
  }

  if (questionId === 'annual_income' || questionId === 'business_revenue') {
    const numericValue = Number(answer);
    if (!Number.isNaN(numericValue)) {
      return `$${numericValue.toLocaleString()} / year`;
    }
  }

  return String(answer);
}

export function buildDocumentChecklist(answers: Answers): string[] {
  const checklist = [
    'Completed personal financial statement',
    'Last 2 years of tax returns',
    'Most recent 3 months of bank statements',
    'Property rent roll and operating statement',
  ];

  if (answers.borrower_type === 'LLC' || answers.borrower_type === 'Corporation') {
    checklist.push('Articles of organization/incorporation');
    checklist.push('Business debt schedule');
  } else {
    checklist.push('Government-issued photo ID');
  }

  if (answers.property_type === 'Multifamily') {
    checklist.push('Current rent roll by unit');
  }

  if (answers.property_type === 'Office' || answers.property_type === 'Retail') {
    checklist.push('Major tenant lease summary');
  }

  return checklist;
}

export function formatAnswersForPrompt(answers: Answers): string {
  const flow = getQuestionFlow(answers);

  return flow
    .map((questionId) => {
      const question = getQuestionById(questionId);
      if (!question) return null;
      const rawAnswer = answers[questionId];
      if (rawAnswer === undefined || rawAnswer === null) return null;

      return `- ${question.message} ${formatAnswerForDisplay(
        questionId,
        rawAnswer
      )}`;
    })
    .filter(Boolean)
    .join('\n');
}
