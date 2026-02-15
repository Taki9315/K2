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
import { Wrench, ShieldCheck, Handshake } from 'lucide-react';

// Placeholder – replace with your video URL when ready
const CONTACT_VIDEO_URL =
  'https://bigvu.tv/pages/kenkaplan/unlock-your-small-business-loan-successnwjvx1us';
const WHO_WE_ARE_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80";
const FAQ_IMAGE =
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80";
const VENDOR_STATS = [
  { value: '23+', label: 'MARKETS SERVED' },
  { value: '350+', label: 'ACTIVE VENDORS' },
  { value: '$1.2B+', label: 'VENDOR VOLUME' },
  { value: '160+', label: 'PROPERTIES SUPPORTED' },
  { value: '29,000+', label: 'UNITS MANAGED' },
  { value: '500+', label: 'VENDOR PARTNERSHIPS' },
  { value: '1,800+', label: 'PROJECTS COMPLETED' },
  { value: '96%', label: 'VENDOR SATISFACTION' },
  { value: '24H', label: 'AVG RESPONSE TIME' },
  { value: '80+', label: 'SERVICE CATEGORIES' },
  { value: '$28B+', label: 'NETWORK CAPACITY' },
  { value: '4.8/5', label: 'PARTNER RATING' },
];
const VENDOR_COLUMNS = [
  VENDOR_STATS.filter((_, i) => i % 3 === 0),
  VENDOR_STATS.filter((_, i) => i % 3 === 1),
  VENDOR_STATS.filter((_, i) => i % 3 === 2),
];

export default function PreferredVendorPage() {
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
          type: 'vendor',
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
      {/* Section 1: Video + Form */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Video + CTA + Preferred Network logo */}
            <div className="space-y-6">
              <div className="bg-black rounded-xl overflow-hidden shadow-xl">
                <div className="px-4 py-2 bg-black text-white text-sm font-medium border-b border-white/10">
                  Join the K2 Preferred Vendor Network
                </div>
                <div className="aspect-video bg-black relative">
                  <iframe
                    src={CONTACT_VIDEO_URL}
                    title="Join the K2 Preferred Vendor Network"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <p className="px-4 py-2 text-sm text-white/70 bg-black border-t border-white/10">
                  Become a K2 Preferred Vendor — learn how our network works.
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
                Grow Your Business with K2 Referrals
              </h2>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Join a curated network of trusted vendors serving commercial real
                estate borrowers and investors. As a K2 Preferred Vendor you gain
                direct exposure to qualified deal flow and lasting client
                relationships.
              </p>
              <p className="text-neutral-700 mb-8 leading-relaxed">
                Share your information today and discover how the K2 Preferred
                Vendor program can expand your reach and revenue.
              </p>

              <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {success && (
                    <Alert>
                      <AlertDescription>
                        Thank you for your interest! We&apos;ll review your application and get back to you soon.
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
                      Tell us about the services you provide
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Describe your services, specialties, and service areas."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white border-black/20 resize-none focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-black">
                      Attach your company overview or capabilities deck:
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
                    {loading ? 'Sending...' : 'Apply Now'}
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
                aria-label="K2 Commercial Finance vendor collaboration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Why Join the Preferred Vendor Network?</h2>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                K2 Commercial Finance connects borrowers and investors with
                best-in-class service providers. Our Preferred Vendor program
                gives you a direct channel to qualified clients who are actively
                pursuing commercial real estate transactions.
              </p>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Whether you provide appraisals, environmental reports, insurance,
                legal counsel, construction management, or other essential
                services, being a Preferred Vendor positions you as a trusted
                partner in every deal.
              </p>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                We vet every vendor in our network so borrowers and lenders can
                move faster with confidence—and your pipeline stays full with
                high-quality referrals.
              </p>

              <h2 className="text-3xl font-bold text-black mb-6 mt-10">
                What Sets Us Apart
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    title: 'Curated network',
                    text: 'Only vetted, qualified vendors are included—ensuring credibility and trust for every referral.',
                  },
                  {
                    title: 'Direct deal access',
                    text: 'Get connected to borrowers and investors at the point of need, not through cold outreach.',
                  },
                  {
                    title: 'Ongoing visibility',
                    text: 'Your services are featured within the K2 ecosystem, keeping you top-of-mind for every transaction.',
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
                aria-label="Vendor partnership consultation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">FAQs</h2>
              <Accordion type="single" collapsible className="w-full text-white">
                {[
                  {
                    q: 'What types of vendors can join the Preferred Vendor network?',
                    a: 'We welcome appraisers, environmental consultants, insurance providers, attorneys, title companies, construction managers, property inspectors, and other professionals that serve commercial real estate transactions.',
                  },
                  {
                    q: 'Is there a cost to become a Preferred Vendor?',
                    a: 'Our vendor program is structured to align interests. Contact us to learn about the current partnership terms and any associated fees.',
                  },
                  {
                    q: 'How are vendors matched with clients?',
                    a: 'We match vendors based on service category, geography, deal type, and track record. Our goal is to connect you with clients where your expertise is the best fit.',
                  },
                  {
                    q: 'What is the vetting process?',
                    a: 'We review your credentials, client references, service history, and licensing to ensure quality and reliability for our borrower and lender network.',
                  },
                  {
                    q: 'How do I get started?',
                    a: 'Fill out the application form on this page with your contact details and a description of your services. Our team will review and follow up within 48 hours.',
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

      {/* Section 4: Vendor Network Stats + Our Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-center">
            Preferred Vendor Network
          </h2>
          <p className="text-center text-neutral-600 mb-12 max-w-3xl mx-auto">
            Our vendor network powers the full lifecycle of commercial real
            estate deals—from due diligence to closing and beyond.
          </p>

          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-16">
            {VENDOR_COLUMNS.map((column, colIndex) => (
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
            {VENDOR_STATS.map((stat) => (
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
                <Wrench className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Full-Service Vendor Coverage
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                From appraisals and environmental assessments to insurance, legal,
                and construction management—we connect borrowers with the right
                professionals at every stage.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-black/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Vetted Quality & Reliability
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Every Preferred Vendor is reviewed for credentials, track record,
                and responsiveness—so borrowers and lenders can move forward with
                confidence.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-black/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Handshake className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-black mb-3">
                Built-In Deal Flow & Partnerships
              </h3>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Preferred Vendors gain ongoing exposure to active deals and
                client referrals through the K2 ecosystem—growing your business
                alongside ours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
