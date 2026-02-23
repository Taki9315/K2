'use client';

import { useState } from 'react';
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
  /** When true the dialog opens and the trigger is hidden (controlled). */
  defaultOpen?: boolean;
  /** Auto-execute this prompt when the dialog opens. */
  initialPrompt?: string;
  /** Task ID for the auto-executed prompt. */
  initialTaskId?: string;
  /** Callback when dialog closes (for controlled usage). */
  onClose?: () => void;
};

export function AssistantDialog({
  triggerLabel = 'PrepCoach',
  triggerClassName,
  triggerVariant = 'outline',
  triggerSize = 'default',
  showIcon = true,
  defaultOpen = false,
  initialPrompt,
  initialTaskId,
  onClose,
}: AssistantDialogProps) {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(defaultOpen);

  if (loading || !user) {
    return null;
  }

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!defaultOpen && (
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
      )}

      <DialogContent className="w-[95vw] max-w-5xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>PrepCoach</DialogTitle>
          <DialogDescription>
            Your AI-powered preparation coach — ask questions, build your loan
            package, and get lender-ready.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[78vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          <AssistantWizard
            initialPrompt={initialPrompt}
            initialTaskId={initialTaskId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
