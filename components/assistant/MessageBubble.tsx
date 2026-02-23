import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type MessageBubbleProps = {
  role: 'assistant' | 'user';
  message: string;
};

export function MessageBubble({ role, message }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm transition-all',
          isUser
            ? 'border-primary/30 bg-primary text-primary-foreground'
            : 'border-slate-200 bg-white text-slate-800'
        )}
      >
        <div className="mb-1 flex items-center gap-2 text-xs font-medium">
          {isUser ? (
            <>
              <User className="h-3.5 w-3.5" />
              You
            </>
          ) : (
            <>
              <Bot className="h-3.5 w-3.5" />
              PrepCoach
            </>
          )}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}
