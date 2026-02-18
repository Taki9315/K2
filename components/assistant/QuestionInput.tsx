'use client';

import { useEffect, useState } from 'react';
import { Loader2, Send, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  type AssistantQuestion,
  type AnswerValue,
} from '@/lib/assistant/questions';

type QuestionInputProps = {
  question: AssistantQuestion;
  disabled?: boolean;
  compact?: boolean;
  onSubmit: (value: AnswerValue) => Promise<void> | void;
  onSkip?: () => void;
};

export function QuestionInput({
  question,
  disabled = false,
  compact = false,
  onSubmit,
  onSkip,
}: QuestionInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setInputValue('');
  }, [question.id]);

  const submitChoice = async (choice: string) => {
    if (disabled || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(choice);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled || submitting) return;

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    let parsedValue: AnswerValue = trimmedValue;
    if (question.type === 'number') {
      const cleaned = trimmedValue.replace(/[$,%\s]/g, '');
      const numericValue = Number(cleaned);
      if (Number.isNaN(numericValue)) return;
      parsedValue = numericValue;
    }

    setSubmitting(true);
    try {
      await onSubmit(parsedValue);
      setInputValue('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (disabled || submitting) return;
    onSkip?.();
  };

  if (question.type === 'choice' && question.options?.length) {
    const count = question.options.length;
    const cols = compact
      ? 'grid-cols-2'
      : count > 6
        ? 'grid-cols-2 sm:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2';

    return (
      <div className="space-y-2">
        <div className={`grid gap-2 ${cols}`}>
          {question.options.map((option) => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className="h-auto min-h-[2.5rem] justify-start whitespace-normal text-left py-2 text-xs sm:text-sm"
              onClick={() => submitChoice(option)}
              disabled={disabled || submitting}
            >
              {option}
            </Button>
          ))}
        </div>
        {question.optional && onSkip && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            disabled={disabled || submitting}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            <SkipForward className="mr-1 h-3 w-3" />
            Skip this question
          </Button>
        )}
      </div>
    );
  }

  const prefix = question.format === 'currency' ? '$' : undefined;
  const suffix = question.format === 'percent' ? '%' : undefined;

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        {prefix && (
          <span className="flex items-center text-sm font-medium text-slate-500 pl-1">
            {prefix}
          </span>
        )}
        <Input
          type={question.type === 'number' ? 'number' : 'text'}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={question.placeholder ?? 'Type your answer'}
          min={question.type === 'number' ? question.min : undefined}
          max={question.type === 'number' ? question.max : undefined}
          step={question.type === 'number' ? 'any' : undefined}
          disabled={disabled || submitting}
        />
        {suffix && (
          <span className="flex items-center text-sm font-medium text-slate-500 pr-1">
            {suffix}
          </span>
        )}
        <Button type="submit" disabled={disabled || submitting}>
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
      {question.optional && onSkip && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          disabled={disabled || submitting}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          <SkipForward className="mr-1 h-3 w-3" />
          Skip this question
        </Button>
      )}
    </div>
  );
}
