'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lender interest:', email);
  };

  return (
    <section className="bg-[#FAF9F6] py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            For lenders
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.5rem]">
            See more deals.
            <br />
            Underwrite faster.
            <br />
            Close with confidence.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-500 sm:text-lg">
            K2 helps lenders increase qualified deal flow, evaluate
            opportunities faster, and move through underwriting and diligence
            with less friction.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
