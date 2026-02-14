'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { supabase } from '@/lib/supabase';
import { Building2, BarChart3, Users } from 'lucide-react';

// Placeholder – replace with your video URL when ready
const CONTACT_VIDEO_URL =
  'https://bigvu.tv/pages/kenkaplan/unlock-your-small-business-loan-successnwjvx1us';
const WHO_WE_ARE_IMAGE =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80";
const FAQ_IMAGE =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80";
const LENDER_STATS = [
  { value: '23+', label: 'MARKETS' },
  { value: '$970MM+', label: 'EQUITY INVESTED' },
  { value: '$5.1B', label: 'TOTAL CAPITALIZATION' },
  { value: '160+', label: 'PROPERTIES ACQUIRED' },
  { value: '29,000+', label: 'UNITS ACQUIRED' },
  { value: '700+', label: 'LENDER RELATIONSHIPS' },
  { value: '2,400+', label: 'FUNDED BORROWERS' },
  { value: '94%', label: 'CLIENT RETENTION' },
  { value: '48H', label: 'AVG RESPONSE TIME' },
  { value: '120+', label: 'INDUSTRY PARTNERS' },
  { value: '$42B+', label: 'NETWORK CAPACITY' },
  { value: '4.9/5', label: 'CLIENT RATING' },
];
const LENDER_COLUMNS = [
  LENDER_STATS.filter((_, i) => i % 3 === 0),
  LENDER_STATS.filter((_, i) => i % 3 === 1),
  LENDER_STATS.filter((_, i) => i % 3 === 2),
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [fileLabel, setFileLabel] = useState('Upload File');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ');
      const messageWithMeta = [
        formData.message,
        formData.company && `Company: ${formData.company}`,
        formData.phone && `Phone: ${formData.phone}`,
      ].filter(Boolean).join('\n');

      const { error: submitError } = await supabase
        .from('contact_inquiries')
        .insert({
          type: 'general',
          name: fullName || '—',
          email: formData.email,
          message: messageWithMeta || '—',
        });

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      setFileLabel('Upload File');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileLabel(file.name);
  };

  return (
    <div className="flex flex-col">
      {/* Section 1: Video + Form (Photo 1) */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Video + CTA + Preferred Network logo */}
            <div className="space-y-6">
              <div className="bg-black rounded-xl overflow-hidden shadow-xl">
                <div className="px-4 py-2 bg-black text-white text-sm font-medium border-b border-white/10">
                  Partner with K2 Commercial Finance Video
                </div>
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={CONTACT_VIDEO_URL}
                    title="Partner with K2 Commercial Finance Video"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <p className="px-4 py-2 text-sm text-white/70 bg-black border-t border-white/10">
                  Partner with K2 Commercial Finance Video by K2 Commercial Finance.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 pt-2 text-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                  asChild
                >
                  <Link href="/about">Learn More & Meet the Team</Link>
                </Button>

                <div className="w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                    Preferred Network
                  </h3>
                  <div className="mx-auto w-[58%] min-w-[220px] max-w-[360px] bg-white rounded-xl p-4 shadow-md border border-primary/30">
                    <Image
                      src="/assets/Network_Logo.png"
                      alt="Preferred Network"
                      width={500}
                      height={300}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Heading + Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Maximize Your Financing Success
              </h2>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Partner with a team that delivers more than just capital—we drive results.
                From borrower education and preparation to competitive terms and ongoing
                support, we deliver outcomes that create lasting value.
              </p>
              <p className="text-neutral-700 mb-8 leading-relaxed">
                Share your information today and discover how K2 Commercial Finance can
                support your business financing goals.
              </p>

              <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {success && (
                    <Alert>
                      <AlertDescription>
                        Thank you for your message! We&apos;ll get back to you soon.
                      </AlertDescription>
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-black">
                        *First Name (required)
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="bg-white border-black/20 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-black">
                        *Last Name (required)
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="bg-white border-black/20 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black">
                        *Email (required)
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white border-black/20 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-black">
                        *Phone Number (required)
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white border-black/20 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-black">
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white border-black/20 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-black">
                      Tell us more about your financing needs or business
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your portfolio or property."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white border-black/20 resize-none focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-black">
                      Submit your RFP to K2 Commercial Finance:
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <button
                      type="button"
                      onClick={handleFileClick}
                      className="text-sm text-black underline hover:text-primary"
                    >
                      {fileLabel}
                    </button>
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Who We Are / What Sets Us Apart */}
      <section className="py-20 bg-primary/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-black/10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${WHO_WE_ARE_IMAGE}')` }}
                aria-label="K2 Commercial Finance team meeting"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Who We Are</h2>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                K2 Commercial Finance is an education-first financing platform built to
                help borrowers and investors make better decisions. We bring a lender&apos;s
                perspective to the process—driving clarity, preparation, and measurable
                results.
              </p>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Our team combines real lending experience with a commitment to
                transparency. We&apos;ve supported businesses across multiple markets with
                practical guidance on credit, cash flow, and loan readiness.
              </p>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                From first-time applicants to experienced borrowers, we help you prepare
                with the precision that leads to better terms and faster approvals.
              </p>

              <h2 className="text-3xl font-bold text-black mb-6 mt-10">
                What Sets Us Apart
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Education-first approach',
                    text: 'We focus on helping you understand what lenders look for and how to position your business before you apply.',
                  },
                  {
                    title: 'Practical resources',
                    text: 'Workbooks, checklists, and content based on real lending criteria—no theory, just actionable steps.',
                  },
                  {
                    title: 'Ongoing support',
                    text: 'Membership and resources designed to support you through the entire financing journey.',
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <span className="font-semibold text-black">{item.title}:</span>{' '}
                    <span className="text-neutral-700">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/contact">Request an Intro Meeting</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: FAQs */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${FAQ_IMAGE}')` }}
                aria-label="Client meeting and consultation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">FAQs</h2>
              <Accordion type="single" collapsible className="w-full text-white">
                {[
                  {
                    q: 'What makes K2 different from other financing education resources?',
                    a: 'We focus on practical, lender-based guidance—what underwriters actually look for—backed by real experience. Our workbook and content are built to improve your readiness and terms, not just general advice.',
                  },
                  {
                    q: 'Who is the workbook and membership for?',
                    a: 'Entrepreneurs and business owners preparing for loans, those who have been rejected and want to understand why, and anyone who wants to navigate SBA or commercial lending with confidence.',
                  },
                  {
                    q: 'How does the membership work?',
                    a: 'Members get access to monthly Q&A sessions, exclusive content, and direct support to help you prepare documents and applications effectively.',
                  },
                  {
                    q: 'Do you provide loans or funding?',
                    a: 'We provide education and preparation resources. We help you get ready to approach lenders and improve your chances of approval and better terms.',
                  },
                  {
                    q: 'How do I get started?',
                    a: 'Start with our free content or the Borrower Preparation Workbook for a step-by-step guide. For ongoing support, consider our membership program.',
                  },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-white/20">
                    <AccordionTrigger className="text-left text-white hover:text-primary py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/75">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Best Lender Networks + Our Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Best Lender Networks
          </h2>
          <p className="text-center text-neutral-600 mb-12 max-w-3xl mx-auto">
            Our network performance is backed by proven outcomes across markets,
            borrower profiles, and lending programs.
          </p>

          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-16">
            {LENDER_COLUMNS.map((column, colIndex) => (
              <div
                key={colIndex}
                className="hex-vertical-track h-[560px] rounded-2xl border border-primary/20 bg-primary/[0.04] p-4"
              >
                <div className={`${colIndex === 1 ? 'hex-flow-down' : 'hex-flow-up'} space-y-6`}>
                  {[...column, ...column].map((stat, i) => (
                    <div key={`${stat.label}-${i}`} className="hex-card mx-auto">
                      <div className="hex-card-inner">
                        <div className="text-xl md:text-2xl font-bold text-black leading-none">
                          {stat.value}
                        </div>
                        <div className="mt-2 text-[11px] font-semibold tracking-wide text-neutral-700">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden mb-16">
            {LENDER_STATS.map((stat) => (
              <div key={stat.label} className="hex-card mx-auto">
                <div className="hex-card-inner">
                  <div className="text-xl font-bold text-black leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-semibold tracking-wide text-neutral-700">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-black mb-10 text-center">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-black/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Preparation & Documentation Support
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                We help you build credit narratives, cash flow documentation, and
                application packages that meet lender expectations—so you present your
                business in the best light.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-black/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Lender Expectations & Better Terms
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Understand how lenders evaluate applications and what drives approvals
                and pricing. Position yourself for competitive terms and faster
                decisions.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-black/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Ongoing Education & Member Support
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                From workbooks to live Q&A and member resources, we support you through
                the full financing journey with clear, actionable guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
