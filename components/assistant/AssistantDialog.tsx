'use client';

import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { AssistantWizard } from '@/components/assistant/AssistantWizard';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type AssistantDialogProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  triggerVariant?: ButtonProps['variant'];
  triggerSize?: ButtonProps['size'];
  showIcon?: boolean;
};

export function AssistantDialog({
  triggerLabel = 'Loan Assistant',
  triggerClassName,
  triggerVariant = 'outline',
  triggerSize = 'default',
  showIcon = true,
}: AssistantDialogProps) {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={cn(triggerClassName)}
        >
          {showIcon && <Bot className="mr-2 h-4 w-4" />}
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-5xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Loan Assistant</DialogTitle>
          <DialogDescription>
            Complete a guided intake, generate your package summary, and export a
            PDF.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[78vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <AssistantWizard />
        </div>
      </DialogContent>
    </Dialog>
  );
}
