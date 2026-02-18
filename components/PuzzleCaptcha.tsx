'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Puzzle } from 'lucide-react';

type PuzzleCaptchaProps = {
  onVerified: () => void;
};

const TRACK_WIDTH = 280;
const PIECE_SIZE = 44;
const TOLERANCE = 6;

function randomTarget() {
  return Math.floor(Math.random() * (TRACK_WIDTH - PIECE_SIZE - 80)) + 60;
}

export function PuzzleCaptcha({ onVerified }: PuzzleCaptchaProps) {
  const [target] = useState(randomTarget);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.max(0, Math.min(v, TRACK_WIDTH - PIECE_SIZE));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (verified) return;
      setFailed(false);
      setDragging(true);
      startX.current = e.clientX;
      startOffset.current = offset;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [offset, verified]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || verified) return;
      const dx = e.clientX - startX.current;
      setOffset(clamp(startOffset.current + dx));
    },
    [dragging, verified]
  );

  const handlePointerUp = useCallback(() => {
    if (!dragging || verified) return;
    setDragging(false);

    if (Math.abs(offset - target) <= TOLERANCE) {
      setVerified(true);
      setOffset(target);
      onVerified();
    } else {
      setFailed(true);
      setTimeout(() => {
        setOffset(0);
        setFailed(false);
      }, 400);
    }
  }, [dragging, verified, offset, target, onVerified]);

  useEffect(() => {
    if (verified) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setOffset((o) => clamp(o + 8));
      if (e.key === 'ArrowLeft') setOffset((o) => clamp(o - 8));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [verified]);

  if (verified) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
        <CheckCircle2 className="h-5 w-5" />
        Verified — you&apos;re human!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-600">
        Drag the puzzle piece to the matching slot to verify you&apos;re a real person.
      </p>

      {/* Track */}
      <div className="relative select-none">
        <div
          ref={trackRef}
          className="relative mx-auto overflow-hidden rounded-lg border-2 border-slate-200 bg-gradient-to-r from-slate-100 via-primary/5 to-slate-100"
          style={{ width: TRACK_WIDTH, height: 56 }}
        >
          {/* Target slot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md border-2 border-dashed border-primary/40 bg-primary/10"
            style={{
              left: target,
              width: PIECE_SIZE,
              height: PIECE_SIZE,
            }}
          >
            <Puzzle className="h-5 w-5 text-primary/30" />
          </div>

          {/* Draggable piece */}
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={offset}
            aria-valuemin={0}
            aria-valuemax={TRACK_WIDTH - PIECE_SIZE}
            aria-label="Drag puzzle piece to matching slot"
            className={`absolute top-1/2 -translate-y-1/2 flex cursor-grab items-center justify-center rounded-md border-2 shadow-md transition-colors active:cursor-grabbing ${
              failed
                ? 'border-red-400 bg-red-100 transition-all duration-300'
                : 'border-primary bg-white hover:bg-primary/5'
            }`}
            style={{
              left: offset,
              width: PIECE_SIZE,
              height: PIECE_SIZE,
              transition: dragging ? 'none' : 'left 0.3s ease',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <Puzzle className={`h-5 w-5 ${failed ? 'text-red-500' : 'text-primary'}`} />
          </div>
        </div>

        {failed && (
          <p className="mt-1 text-center text-xs text-red-500">
            Not quite — try again!
          </p>
        )}
      </div>
    </div>
  );
}
