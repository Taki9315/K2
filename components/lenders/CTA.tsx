'use client';

import { useState } from 'react';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  companyName: '',
  contactName: '',
  email: '',
  message: '',
};

export function CTA() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Preferred Lender Application:', formData);
    setSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <section id="apply" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-xl sm:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Join the K2 Preferred Lender Network
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-300">
              Tell us about your lending programs and we will be in touch to
              discuss how K2 can deliver qualified borrowers to your team.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 rounded-xl border border-blue-400/20 bg-blue-500/10 p-6 text-center">
              <p className="text-lg font-semibold text-white">
                Thank you for your interest.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Our team will review your submission and reach out shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm font-medium text-blue-400 underline underline-offset-4 transition-colors hover:text-blue-300"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="companyName"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Capital"
                    className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactName"
                    className="mb-1.5 block text-sm font-medium text-slate-300"
                  >
                    Contact Name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@acmecapital.com"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your lending programs, coverage areas, and what types of deals you are looking for..."
                  className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-auto"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
