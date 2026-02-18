'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from '@/components/assistant/MessageBubble';

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  message: string;
};

type ChatWindowProps = {
  messages: ChatMessage[];
};

export function ChatWindow({ messages }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className="max-h-[52vh] min-h-[200px] flex-1 overflow-y-auto rounded-xl border bg-slate-50/60 p-4 sm:p-6">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            message={message.message}
          />
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
