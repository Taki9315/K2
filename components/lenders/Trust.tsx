import { Shield } from 'lucide-react';

export function Trust() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Shield className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          An Education-First Borrower Community
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          K2 is not a lead marketplace. Our borrowers go through a structured
          education process designed to align them with lender expectations before
          they ever submit a request. The result is a relationship-driven network
          where lenders receive prepared, respectful, and informed applicants — not
          cold inquiries. When you join K2, you join a community that values
          transparency, preparation, and long-term partnerships.
        </p>
      </div>
    </section>
  );
}
