'use client';

import { useMemo, useState } from 'react';
import { PDFDocument, StandardFonts, type PDFFont, rgb } from 'pdf-lib';
import {
  AlertCircle,
  Bot,
  Loader2,
  MessageSquare,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import {
  ChatWindow,
  type ChatMessage,
} from '@/components/assistant/ChatWindow';
import { ProgressBar } from '@/components/assistant/ProgressBar';
import { QuestionInput } from '@/components/assistant/QuestionInput';
import { SummaryView } from '@/components/assistant/SummaryView';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  FIRST_QUESTION_ID,
  SECTION_INTROS,
  buildDocumentChecklist,
  computeDSCR,
  computeLTV,
  computeLiquidityPercent,
  formatAnswerForDisplay,
  getNextQuestionId,
  getQuestionById,
  getQuestionFlow,
  type Answers,
  type AnswerValue,
} from '@/lib/assistant/questions';
import { buildExecutiveSummary } from '@/lib/assistant/summary-template';

type SubmissionResponse = {
  submission: { id: string };
};

type WizardMode = 'greeting' | 'freeform' | 'intake' | 'complete' | 'summary';

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/* ------------------------------------------------------------------ */
/*  PDF helper                                                         */
/* ------------------------------------------------------------------ */

function splitTextIntoLines(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      currentLine = candidate;
      return;
    }
    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }
    lines.push(word);
    currentLine = '';
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    /* ignore */
  }
  return `Request failed with status ${response.status}`;
}

/* ------------------------------------------------------------------ */
/*  Auto-calculation messages                                          */
/* ------------------------------------------------------------------ */

function getAutoMessages(questionId: string, answers: Answers): string[] {
  const msgs: string[] = [];

  if (questionId === 'requested_loan_amount') {
    const ltv = computeLTV(answers);
    if (ltv !== null) {
      msgs.push(`📊 Calculated Loan-to-Value: ${ltv}% LTV`);
    }
  }

  if (questionId === 'occupancy') {
    const dscr = computeDSCR(answers);
    if (dscr !== null) {
      let m = `📊 Estimated DSCR: ${dscr.toFixed(2)}x (based on 7% rate / 25-yr am)`;
      if (dscr < 1.2) {
        m +=
          '\n⚠️ DSCR is below 1.20x — a Bridge or DSCR-Lite program may be more appropriate.';
      }
      msgs.push(m);
    }
  }

  if (questionId === 'liquidity') {
    const pct = computeLiquidityPercent(answers);
    if (pct !== null) {
      let m = `📊 Liquidity as % of loan: ${pct}%`;
      if (pct < 10) {
        m +=
          '\n⚠️ Liquidity is below 10% of the loan amount. SBA or equity-gap options may be worth exploring.';
      }
      msgs.push(m);
    }
  }

  return msgs;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AssistantWizard() {
  const { user } = useAuth();

  const [mode, setMode] = useState<WizardMode>('greeting');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createMessageId(),
      role: 'assistant',
      message:
        "Welcome to K2 Commercial Finance! I'm your deal intake assistant. How can I help you today?",
    },
  ]);
  const [freeformInput, setFreeformInput] = useState('');
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isSavingSubmission, setIsSavingSubmission] = useState(false);
  const [submissionSaved, setSubmissionSaved] = useState(false);
  const [isAskingAI, setIsAskingAI] = useState(false);

  const currentQuestion = currentQuestionId
    ? getQuestionById(currentQuestionId)
    : null;
  const questionFlow = useMemo(() => getQuestionFlow(answers), [answers]);
  const totalQuestions = Math.max(questionFlow.length, 1);
  const completedQuestions = questionFlow.filter(
    (qId) => answers[qId] !== undefined
  ).length;
  const checklist = useMemo(() => buildDocumentChecklist(answers), [answers]);

  /* ---------- Supabase helpers ----------------------------------- */

  const getAccessToken = async (): Promise<string> => {
    if (!user) throw new Error('Please sign in to continue.');
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token)
      throw new Error('Your session expired. Please sign in again.');
    return session.access_token;
  };

  const createSubmission = async (
    answersJson: Answers,
    summary: string | null = null
  ): Promise<string> => {
    const token = await getAccessToken();
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answersJson, summaryText: summary }),
    });
    if (!res.ok) throw new Error(await parseErrorMessage(res));
    const data = (await res.json()) as SubmissionResponse;
    return data.submission.id;
  };

  const updateSubmission = async (
    id: string,
    payload: { answersJson?: Answers; summaryText?: string | null }
  ) => {
    const token = await getAccessToken();
    const res = await fetch(`/api/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await parseErrorMessage(res));
  };

  const saveDraftAnswers = async (answersToSave: Answers) => {
    setIsSavingDraft(true);
    setError(null);
    try {
      if (submissionId) {
        await updateSubmission(submissionId, { answersJson: answersToSave });
        setSubmissionSaved(true);
        return submissionId;
      }
      const id = await createSubmission(answersToSave);
      setSubmissionId(id);
      setSubmissionSaved(true);
      return id;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save answers');
      setSubmissionSaved(false);
      return null;
    } finally {
      setIsSavingDraft(false);
    }
  };

  /* ---------- Push helper to add messages safely ----------------- */

  const pushMessages = (...newMsgs: ChatMessage[]) =>
    setMessages((prev) => [...prev, ...newMsgs]);

  /* ---------- Greeting handlers ---------------------------------- */

  const handleGreetingChoice = (choice: 'freeform' | 'intake') => {
    if (choice === 'freeform') {
      pushMessages(
        {
          id: createMessageId(),
          role: 'user',
          message: 'Ask a Financing Question',
        },
        {
          id: createMessageId(),
          role: 'assistant',
          message:
            'Sure! Type your financing question below and I\'ll do my best to help.',
        }
      );
      setMode('freeform');
    } else {
      const firstQ = getQuestionById(FIRST_QUESTION_ID);
      const introMsgs: ChatMessage[] = [
        {
          id: createMessageId(),
          role: 'user',
          message: 'Start Deal Intake',
        },
      ];

      const sectionIntro = SECTION_INTROS[FIRST_QUESTION_ID];
      if (sectionIntro) {
        introMsgs.push({
          id: createMessageId(),
          role: 'assistant',
          message: sectionIntro,
        });
      }

      if (firstQ) {
        introMsgs.push({
          id: createMessageId(),
          role: 'assistant',
          message: firstQ.message,
        });
      }

      pushMessages(...introMsgs);
      setCurrentQuestionId(FIRST_QUESTION_ID);
      setMode('intake');
    }
  };

  /* ---------- Freeform question handler -------------------------- */

  const handleFreeformSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = freeformInput.trim();
    if (!q || isAskingAI) return;

    pushMessages({
      id: createMessageId(),
      role: 'user',
      message: q,
    });
    setFreeformInput('');
    setIsAskingAI(true);
    setError(null);

    try {
      const token = await getAccessToken();
      const res = await fetch('/api/ask-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) throw new Error(await parseErrorMessage(res));
      const data = (await res.json()) as { answer?: string };
      pushMessages({
        id: createMessageId(),
        role: 'assistant',
        message: data.answer ?? 'Sorry, I could not generate an answer.',
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to get AI response'
      );
    } finally {
      setIsAskingAI(false);
    }
  };

  /* ---------- Intake answer handler ------------------------------ */

  const handleAnswerSubmit = async (answer: AnswerValue) => {
    if (!currentQuestion) return;

    let normalizedAnswer: AnswerValue = answer;
    if (currentQuestion.type === 'number') {
      const num = Number(answer);
      if (Number.isNaN(num)) {
        setError('Please enter a valid number.');
        return;
      }
      if (currentQuestion.min !== undefined && num < currentQuestion.min) {
        setError(`Value must be at least ${currentQuestion.min}.`);
        return;
      }
      if (currentQuestion.max !== undefined && num > currentQuestion.max) {
        setError(`Value must be no more than ${currentQuestion.max}.`);
        return;
      }
      normalizedAnswer = num;
    } else {
      const text = String(answer).trim();
      if (!text) {
        setError('Please provide an answer.');
        return;
      }
      normalizedAnswer = text;
    }

    setError(null);
    setSubmissionSaved(false);

    const nextAnswers: Answers = {
      ...answers,
      [currentQuestion.id]: normalizedAnswer,
    };
    const nextQId = getNextQuestionId(currentQuestion.id, nextAnswers);
    const nextQ = nextQId ? getQuestionById(nextQId) : null;

    setAnswers(nextAnswers);
    setCurrentQuestionId(nextQId ?? null);

    const newMsgs: ChatMessage[] = [
      {
        id: createMessageId(),
        role: 'user',
        message: formatAnswerForDisplay(currentQuestion.id, normalizedAnswer),
      },
    ];

    const autoMsgs = getAutoMessages(currentQuestion.id, nextAnswers);
    autoMsgs.forEach((m) => {
      newMsgs.push({ id: createMessageId(), role: 'assistant', message: m });
    });

    if (nextQ) {
      const sectionIntro = SECTION_INTROS[nextQId!];
      if (sectionIntro) {
        newMsgs.push({
          id: createMessageId(),
          role: 'assistant',
          message: sectionIntro,
        });
      }
      newMsgs.push({
        id: createMessageId(),
        role: 'assistant',
        message: nextQ.message,
      });
    } else {
      newMsgs.push({
        id: createMessageId(),
        role: 'assistant',
        message:
          'Your intake is complete! Click "Generate Executive Summary" to build your deal package.',
      });
      setMode('complete');
    }

    pushMessages(...newMsgs);

    if (!nextQId) {
      await saveDraftAnswers(nextAnswers);
    }
  };

  /* ---------- Skip handler for optional questions ---------------- */

  const handleSkip = () => {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers };
    const nextQId = getNextQuestionId(currentQuestion.id, nextAnswers);
    const nextQ = nextQId ? getQuestionById(nextQId) : null;

    setAnswers(nextAnswers);
    setCurrentQuestionId(nextQId ?? null);

    const newMsgs: ChatMessage[] = [
      { id: createMessageId(), role: 'user', message: 'Skipped' },
    ];

    if (nextQ) {
      const sectionIntro = SECTION_INTROS[nextQId!];
      if (sectionIntro) {
        newMsgs.push({
          id: createMessageId(),
          role: 'assistant',
          message: sectionIntro,
        });
      }
      newMsgs.push({
        id: createMessageId(),
        role: 'assistant',
        message: nextQ.message,
      });
    } else {
      newMsgs.push({
        id: createMessageId(),
        role: 'assistant',
        message:
          'Your intake is complete! Click "Generate Executive Summary" to build your deal package.',
      });
      setMode('complete');
    }

    pushMessages(...newMsgs);
  };

  /* ---------- Generate summary ----------------------------------- */

  const handleGenerateSummary = async () => {
    setError(null);
    setIsGeneratingSummary(true);

    try {
      let activeSubId = submissionId;
      if (!activeSubId) {
        activeSubId = await saveDraftAnswers(answers);
      }

      const token = await getAccessToken();
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error(await parseErrorMessage(res));

      const data = (await res.json()) as {
        programFit?: string;
        k2Notes?: string;
      };

      const programFit =
        data.programFit ?? 'Program fit analysis not available.';
      const k2Notes = data.k2Notes ?? 'Analyst notes not available.';

      const fullSummary = buildExecutiveSummary(answers, programFit, k2Notes);
      setSummaryText(fullSummary);

      pushMessages({
        id: createMessageId(),
        role: 'assistant',
        message:
          'Your Executive Summary is ready! Review it below, download the PDF, or save your submission.',
      });

      if (activeSubId) {
        setSubmissionId(activeSubId);
        await updateSubmission(activeSubId, { summaryText: fullSummary });
      }

      setSubmissionSaved(false);
      setMode('summary');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate summary'
      );
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  /* ---------- Save submission ------------------------------------ */

  const handleSaveSubmission = async () => {
    setError(null);
    setIsSavingSubmission(true);
    try {
      let id = submissionId;
      if (!id) {
        id = await createSubmission(answers, summaryText || null);
        setSubmissionId(id);
      } else {
        await updateSubmission(id, {
          answersJson: answers,
          summaryText: summaryText || null,
        });
      }
      setSubmissionSaved(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save submission'
      );
      setSubmissionSaved(false);
    } finally {
      setIsSavingSubmission(false);
    }
  };

  /* ---------- PDF download --------------------------------------- */

  const handleDownloadPdf = async () => {
    if (!summaryText) {
      setError('Generate the executive summary first.');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pageSize: [number, number] = [612, 792];
      const margin = 48;
      const contentWidth = pageSize[0] - margin * 2;
      const bodyFontSize = 10;
      const bodyLineHeight = 14;

      let page = pdfDoc.addPage(pageSize);
      let y = pageSize[1] - margin;

      const ensureSpace = (h: number) => {
        if (y - h > margin) return;
        page = pdfDoc.addPage(pageSize);
        y = pageSize[1] - margin;
      };

      const drawWrapped = (
        text: string,
        opts: {
          font: PDFFont;
          size: number;
          color?: ReturnType<typeof rgb>;
          lineHeight?: number;
        }
      ) => {
        const lh = opts.lineHeight ?? bodyLineHeight;
        const color = opts.color ?? rgb(0.12, 0.12, 0.12);
        const lines = splitTextIntoLines(text, opts.font, opts.size, contentWidth);
        lines.forEach((line) => {
          ensureSpace(lh);
          page.drawText(line, { x: margin, y, size: opts.size, font: opts.font, color });
          y -= lh;
        });
      };

      const summaryLines = summaryText.split('\n');

      for (const rawLine of summaryLines) {
        const line = rawLine.trimEnd();

        if (line.startsWith('⭐')) {
          drawWrapped(line.replace('⭐ ', ''), {
            font: fontBold,
            size: 16,
            color: rgb(0.06, 0.45, 0.28),
            lineHeight: 22,
          });
          continue;
        }

        if (line.startsWith('---')) {
          ensureSpace(bodyLineHeight);
          page.drawLine({
            start: { x: margin, y: y + 4 },
            end: { x: pageSize[0] - margin, y: y + 4 },
            thickness: 0.5,
            color: rgb(0.7, 0.7, 0.7),
          });
          y -= 6;
          continue;
        }

        if (
          line === line.toUpperCase() &&
          line.length > 3 &&
          !line.startsWith('-') &&
          !line.startsWith('⭐')
        ) {
          y -= 6;
          drawWrapped(line, {
            font: fontBold,
            size: 11,
            lineHeight: 16,
          });
          continue;
        }

        if (line.startsWith('- ')) {
          drawWrapped(line, { font: fontRegular, size: bodyFontSize });
          continue;
        }

        if (line.trim() === '') {
          y -= 6;
          continue;
        }

        drawWrapped(line, { font: fontRegular, size: bodyFontSize });
      }

      y -= 12;
      drawWrapped(`Generated: ${new Date().toLocaleString()}`, {
        font: fontRegular,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `k2-executive-summary-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create PDF');
    }
  };

  /* ---------- Render --------------------------------------------- */

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border-slate-200">
        <CardHeader className="space-y-4">
          <div className="space-y-1">
            <CardTitle className="text-xl">K2 Deal Intake Assistant</CardTitle>
            <CardDescription>
              {mode === 'greeting'
                ? 'Choose an option below to get started.'
                : mode === 'freeform'
                  ? 'Ask any financing question.'
                  : mode === 'intake'
                    ? 'One question at a time. Your answers are saved automatically.'
                    : 'Your intake is complete.'}
            </CardDescription>
          </div>
          {(mode === 'intake' || mode === 'complete') && (
            <ProgressBar current={completedQuestions} total={totalQuestions} />
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <ChatWindow messages={messages} />

          {/* --- Greeting ----------------------------------------- */}
          {mode === 'greeting' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="outline"
                className="justify-start gap-2 py-6 text-left"
                onClick={() => handleGreetingChoice('freeform')}
              >
                <MessageSquare className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Ask a Financing Question</div>
                  <div className="text-xs text-slate-500">
                    Get quick guidance on commercial lending
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="justify-start gap-2 py-6 text-left"
                onClick={() => handleGreetingChoice('intake')}
              >
                <ClipboardList className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold">Start Deal Intake</div>
                  <div className="text-xs text-slate-500">
                    Submit a deal for analysis
                  </div>
                </div>
              </Button>
            </div>
          )}

          {/* --- Freeform ----------------------------------------- */}
          {mode === 'freeform' && (
            <div className="space-y-3">
              <form
                onSubmit={handleFreeformSubmit}
                className="flex gap-2"
              >
                <Input
                  value={freeformInput}
                  onChange={(e) => setFreeformInput(e.target.value)}
                  placeholder="Type your financing question..."
                  disabled={isAskingAI}
                />
                <Button type="submit" disabled={isAskingAI || !freeformInput.trim()}>
                  {isAskingAI ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </Button>
              </form>
              {!isAskingAI && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary"
                  onClick={() => handleGreetingChoice('intake')}
                >
                  <ClipboardList className="mr-1 h-3 w-3" />
                  Switch to Deal Intake
                </Button>
              )}
            </div>
          )}

          {/* --- Intake ------------------------------------------- */}
          {mode === 'intake' && currentQuestion && (
            <QuestionInput
              question={currentQuestion}
              onSubmit={handleAnswerSubmit}
              onSkip={currentQuestion.optional ? handleSkip : undefined}
              disabled={isSavingDraft || isGeneratingSummary}
            />
          )}

          {/* --- Complete (generate) ------------------------------ */}
          {mode === 'complete' && (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">
                Intake complete. Generate your executive summary now.
              </p>
              <Button
                type="button"
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary || isSavingDraft}
              >
                {isGeneratingSummary ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Executive Summary
                  </>
                )}
              </Button>
            </div>
          )}

          {isSavingDraft && (
            <div className="flex items-center text-sm text-slate-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving intake answers...
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- Summary + PDF + Save --------------------------------- */}
      {summaryText && (
        <SummaryView
          summaryText={summaryText}
          checklist={checklist}
          onDownloadPdf={handleDownloadPdf}
          onSaveSubmission={handleSaveSubmission}
          savingSubmission={isSavingSubmission}
          isSaved={submissionSaved}
        />
      )}
    </div>
  );
}
