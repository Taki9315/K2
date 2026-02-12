'use client';

import { useMemo, useState } from 'react';
import { PDFDocument, StandardFonts, type PDFFont, rgb } from 'pdf-lib';
import { AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  buildDocumentChecklist,
  formatAnswerForDisplay,
  getNextQuestionId,
  getQuestionById,
  getQuestionFlow,
  type Answers,
  type AnswerValue,
} from '@/lib/assistant/questions';

type SubmissionResponse = {
  submission: {
    id: string;
  };
};

const createMessageId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

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
    const candidateWidth = font.widthOfTextAtSize(candidate, fontSize);

    if (candidateWidth <= maxWidth) {
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

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    if (body.error) return body.error;
  } catch {
    // Ignore JSON parse errors and use fallback.
  }

  return `Request failed with status ${response.status}`;
}

export function AssistantWizard() {
  const { user } = useAuth();
  const firstQuestion = getQuestionById(FIRST_QUESTION_ID);

  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    FIRST_QUESTION_ID
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    firstQuestion
      ? [
          {
            id: createMessageId(),
            role: 'assistant',
            message: firstQuestion.message,
          },
        ]
      : []
  );
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [summaryText, setSummaryText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isSavingSubmission, setIsSavingSubmission] = useState(false);
  const [submissionSaved, setSubmissionSaved] = useState(false);

  const currentQuestion = currentQuestionId
    ? getQuestionById(currentQuestionId)
    : null;
  const questionFlow = useMemo(() => getQuestionFlow(answers), [answers]);
  const totalQuestions = Math.max(questionFlow.length, 1);
  const completedQuestions = questionFlow.filter(
    (questionId) => answers[questionId] !== undefined
  ).length;
  const checklist = useMemo(() => buildDocumentChecklist(answers), [answers]);

  const getAccessToken = async (): Promise<string> => {
    if (!user) {
      throw new Error('Please sign in to continue.');
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error('Your session expired. Please sign in again.');
    }

    return session.access_token;
  };

  const createSubmission = async (
    answersJson: Answers,
    summary: string | null = null
  ): Promise<string> => {
    const accessToken = await getAccessToken();
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        answersJson,
        summaryText: summary,
      }),
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }

    const data = (await response.json()) as SubmissionResponse;
    return data.submission.id;
  };

  const updateSubmission = async (
    id: string,
    payload: { answersJson?: Answers; summaryText?: string | null }
  ) => {
    const accessToken = await getAccessToken();
    const response = await fetch(`/api/submissions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }
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

      const createdSubmissionId = await createSubmission(answersToSave);
      setSubmissionId(createdSubmissionId);
      setSubmissionSaved(true);
      return createdSubmissionId;
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : 'Failed to save answers';
      setError(message);
      setSubmissionSaved(false);
      return null;
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleAnswerSubmit = async (answer: AnswerValue) => {
    if (!currentQuestion) return;

    let normalizedAnswer: AnswerValue = answer;
    if (currentQuestion.type === 'number') {
      const numericAnswer = Number(answer);
      if (Number.isNaN(numericAnswer)) {
        setError('Please enter a valid number.');
        return;
      }

      if (
        currentQuestion.min !== undefined &&
        numericAnswer < currentQuestion.min
      ) {
        setError(`Value must be at least ${currentQuestion.min}.`);
        return;
      }

      if (
        currentQuestion.max !== undefined &&
        numericAnswer > currentQuestion.max
      ) {
        setError(`Value must be no more than ${currentQuestion.max}.`);
        return;
      }

      normalizedAnswer = numericAnswer;
    } else {
      const textAnswer = String(answer).trim();
      if (!textAnswer) {
        setError('Please provide an answer.');
        return;
      }

      normalizedAnswer = textAnswer;
    }

    setError(null);
    setSubmissionSaved(false);

    const nextAnswers: Answers = {
      ...answers,
      [currentQuestion.id]: normalizedAnswer,
    };
    const nextQuestionId = getNextQuestionId(currentQuestion.id, nextAnswers);
    const nextQuestion = nextQuestionId ? getQuestionById(nextQuestionId) : null;

    setAnswers(nextAnswers);
    setCurrentQuestionId(nextQuestionId ?? null);
    setMessages((previousMessages) => {
      const updatedMessages: ChatMessage[] = [
        ...previousMessages,
        {
          id: createMessageId(),
          role: 'user',
          message: formatAnswerForDisplay(currentQuestion.id, normalizedAnswer),
        },
      ];

      if (nextQuestion) {
        updatedMessages.push({
          id: createMessageId(),
          role: 'assistant',
          message: nextQuestion.message,
        });
      } else {
        updatedMessages.push({
          id: createMessageId(),
          role: 'assistant',
          message:
            'Great, your intake is complete. Click "Generate Package" to create your loan summary.',
        });
      }

      return updatedMessages;
    });

    if (!nextQuestionId) {
      await saveDraftAnswers(nextAnswers);
    }
  };

  const handleGenerateSummary = async () => {
    if (currentQuestionId) return;

    setError(null);
    setIsGeneratingSummary(true);

    try {
      let activeSubmissionId = submissionId;
      if (!activeSubmissionId) {
        activeSubmissionId = await saveDraftAnswers(answers);
      }

      const accessToken = await getAccessToken();
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      const data = (await response.json()) as { summary?: string };
      if (!data.summary) {
        throw new Error('No summary was returned.');
      }

      setSummaryText(data.summary);
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: createMessageId(),
          role: 'assistant',
          message:
            'Your package summary is ready. Review it below, download the PDF, and save your submission.',
        },
      ]);
      if (activeSubmissionId) {
        setSubmissionId(activeSubmissionId);
      }
      setSubmissionSaved(false);
    } catch (generateError) {
      const message =
        generateError instanceof Error
          ? generateError.message
          : 'Failed to generate summary';
      setError(message);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleSaveSubmission = async () => {
    setError(null);
    setIsSavingSubmission(true);

    try {
      let activeSubmissionId = submissionId;

      if (!activeSubmissionId) {
        activeSubmissionId = await createSubmission(answers, summaryText || null);
        setSubmissionId(activeSubmissionId);
      } else {
        await updateSubmission(activeSubmissionId, {
          answersJson: answers,
          summaryText: summaryText || null,
        });
      }

      setSubmissionSaved(true);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : 'Failed to save submission';
      setError(message);
      setSubmissionSaved(false);
    } finally {
      setIsSavingSubmission(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!summaryText) {
      setError('Generate a package summary before downloading PDF.');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pageSize: [number, number] = [612, 792];
      const margin = 48;
      const contentWidth = pageSize[0] - margin * 2;
      const bodyFontSize = 11;
      const bodyLineHeight = 16;

      let page = pdfDoc.addPage(pageSize);
      let y = pageSize[1] - margin;

      const ensureSpace = (requiredHeight: number) => {
        if (y - requiredHeight > margin) return;
        page = pdfDoc.addPage(pageSize);
        y = pageSize[1] - margin;
      };

      const drawWrapped = (
        text: string,
        {
          font,
          size,
          color = rgb(0.12, 0.12, 0.12),
          lineHeight = bodyLineHeight,
        }: {
          font: PDFFont;
          size: number;
          color?: ReturnType<typeof rgb>;
          lineHeight?: number;
        }
      ) => {
        const lines = splitTextIntoLines(text, font, size, contentWidth);
        lines.forEach((line) => {
          ensureSpace(lineHeight);
          page.drawText(line, {
            x: margin,
            y,
            size,
            font,
            color,
          });
          y -= lineHeight;
        });
      };

      drawWrapped('Commercial Loan Package Summary', {
        font: fontBold,
        size: 18,
        color: rgb(0.06, 0.45, 0.28),
        lineHeight: 24,
      });

      drawWrapped(`Generated: ${new Date().toLocaleString()}`, {
        font: fontRegular,
        size: 10,
        color: rgb(0.4, 0.4, 0.4),
        lineHeight: 16,
      });
      y -= 8;

      drawWrapped('Borrower Snapshot', {
        font: fontBold,
        size: 13,
        lineHeight: 20,
      });

      getQuestionFlow(answers).forEach((questionId) => {
        const question = getQuestionById(questionId);
        const value = answers[questionId];
        if (!question || value === undefined) return;

        drawWrapped(
          `- ${question.message} ${formatAnswerForDisplay(questionId, value)}`,
          {
            font: fontRegular,
            size: bodyFontSize,
          }
        );
      });

      y -= 8;
      drawWrapped('AI Loan Summary', {
        font: fontBold,
        size: 13,
        lineHeight: 20,
      });

      summaryText.split('\n').forEach((paragraph) => {
        const line = paragraph.trim();
        drawWrapped(line || ' ', {
          font: fontRegular,
          size: bodyFontSize,
        });
      });

      y -= 8;
      drawWrapped('Document Checklist', {
        font: fontBold,
        size: 13,
        lineHeight: 20,
      });

      checklist.forEach((item) => {
        drawWrapped(`- ${item}`, {
          font: fontRegular,
          size: bodyFontSize,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `loan-package-${new Date().toISOString().slice(0, 10)}.pdf`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (pdfError) {
      const message =
        pdfError instanceof Error ? pdfError.message : 'Failed to create PDF';
      setError(message);
    }
  };

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
            <CardTitle className="text-xl">Intake Conversation</CardTitle>
            <CardDescription>
              One question at a time. Your answers are saved automatically.
            </CardDescription>
          </div>
          <ProgressBar current={completedQuestions} total={totalQuestions} />
        </CardHeader>

        <CardContent className="space-y-4">
          <ChatWindow messages={messages} />

          {currentQuestion ? (
            <QuestionInput
              question={currentQuestion}
              onSubmit={handleAnswerSubmit}
              disabled={isSavingDraft || isGeneratingSummary}
            />
          ) : (
            <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-600">
                Intake complete. Generate your package summary now.
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
                    Generate Package
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
