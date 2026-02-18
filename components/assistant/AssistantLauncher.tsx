'use client';

import { useState } from 'react';
import { ChevronDown, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { AssistantWizard } from '@/components/assistant/AssistantWizard';

export function AssistantLauncher() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading || !user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div
          className={cn(
            'flex flex-col overflow-hidden rounded-2xl border shadow-2xl bg-white',
            'w-[92vw] sm:w-[420px]',
            'h-[80vh] max-h-[720px]',
            'animate-in fade-in slide-in-from-bottom-4 duration-200'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">
                  Live Chat
                </h2>
                <p className="text-[11px] text-white/60">
                  K2 Deal Intake Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4">
            <AssistantWizard compact />
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all',
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95'
        )}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
