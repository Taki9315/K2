'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 500, suffix: '+', label: 'Borrowers Prepared' },
  { value: 100, suffix: 'M+', label: 'In Deals Supported' },
  { value: 200, suffix: '+', label: '5-Star Reviews' },
  { value: 50, suffix: '+', label: 'Pages of Frameworks' },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let frame: number;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, started, duration]);

  return count;
}

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, started);
  const prefix = stat.label.includes('Deals') ? '$' : '';

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="text-sm text-white/70 mt-2 font-medium">{stat.label}</p>
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} started={started} />
      ))}
    </div>
  );
}
