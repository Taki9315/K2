type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.round((current / safeTotal) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
        <span>Completion</span>
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
