'use client';

import { useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  type AssistantQuestion,
  type AnswerValue,
} from '@/lib/assistant/questions';

type QuestionInputProps = {
  question: AssistantQuestion;
  disabled?: boolean;
  onSubmit: (value: AnswerValue) => Promise<void> | void;
};

export function QuestionInput({
  question,
  disabled = false,
  onSubmit,
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
      const numericValue = Number(trimmedValue);
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

  if (question.type === 'choice' && question.options?.length) {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {question.options.map((option) => (
          <Button
            key={option}
            type="button"
            variant="outline"
            className="justify-start text-left"
            onClick={() => submitChoice(option)}
            disabled={disabled || submitting}
          >
            {option}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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
      <Button type="submit" disabled={disabled || submitting}>
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
