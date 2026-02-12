'use client';

import { AssistantDialog } from '@/components/assistant/AssistantDialog';

export function AssistantLauncher() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AssistantDialog
        triggerLabel="Loan Assistant"
        triggerVariant="default"
        triggerClassName="rounded-full px-5 shadow-lg"
      />
    </div>
  );
}
