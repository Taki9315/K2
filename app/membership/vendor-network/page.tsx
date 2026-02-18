'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { PuzzleCaptcha } from '@/components/PuzzleCaptcha';
import { supabase } from '@/lib/supabase';
import {
  Wrench,
  CheckCircle2,
  Handshake,
  Target,
  BarChart3,
  ArrowRight,
  Send,
} from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Target,
    title: 'Qualified Referrals',
    text: 'Connect with commercial property owners and investors who are actively transacting and need your services now.',
  },
  {
    icon: Handshake,
    title: 'Lasting Relationships',
    text: 'Become a trusted go-to provider within a network built on quality referrals and repeat business.',
  },
  {
    icon: BarChart3,
    title: 'Grow Your Revenue',
    text: 'Tap into a steady stream of clients through the K2 ecosystem — not cold calls, but warm introductions.',
  },
];

export default function VendorNetworkPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: '',
  });
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaPassed) {
      setError('Please complete the puzzle verification first.');
      return;
    }
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const fullName = [formData.firstName, formData.lastName]
        .filter(Boolean)
        .join(' ');

      const messageParts = [
        formData.message,
        formData.company && `Company: ${formData.company}`,
        formData.phone && `Phone: ${formData.phone}`,
        formData.serviceType && `Service Type: ${formData.serviceType}`,
      ].filter(Boolean);

      const { error: submitError } = await supabase
        .from('contact_inquiries')
        .insert({
          type: 'vendor_network',
          name: fullName || '—',
          email: formData.email,
          message: messageParts.join('\n') || '—',
        });

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        message: '',
      });
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit inquiry'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 md:py-28 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium mb-6">
            <Wrench className="h-4 w-4" />
            Preferred Vendor Network
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Join the K2 CRE Preferred Vendor Network
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connect with commercial real estate borrowers and property owners
            who need your services. The K2 network delivers warm, qualified
            referrals — not cold leads.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Vendors Join the K2 Network
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our borrowers and property owners need service providers they can
              trust. Position your business in front of decision-makers who are
              ready to act.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6 px-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <h.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {h.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network overview + Inquiry form */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: description */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How It Works
              </h2>
              <p className="text-gray-600 leading-relaxed">
                K2 Commercial Finance works with commercial real estate borrowers
                and investors at every stage of the transaction. From attorneys
                and appraisers to environmental consultants and property managers
                — our clients need the services you provide.
              </p>
              <ul className="space-y-4">
                {[
                  'Your business is presented to borrowers at the point of need',
                  'Referrals come from an active deal pipeline — not a stale directory',
                  'Service categories span the full CRE transaction lifecycle',
                  'Network members receive priority visibility in our ecosystem',
                  'Full vendor benefits, listing details, and fee structure shared after approval',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl border-2 border-primary/20 bg-white p-6 mt-8">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src="/assets/Network_Logo.png"
                    alt="K2 Preferred Network"
                    width={160}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Approved vendors receive full access to the Preferred Vendor
                  portal including referral details, listing placement, and
                  direct communication with the K2 team.
                </p>
              </div>
            </div>

            {/* Right: Inquiry form */}
            <div>
              <Card className="border-2 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Request Network Access
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Submit your inquiry and a K2 representative will follow up
                    with full network details.
                  </p>

                  {success ? (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                      <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 mb-3" />
                      <h4 className="text-lg font-semibold text-green-800 mb-1">
                        Inquiry Received
                      </h4>
                      <p className="text-sm text-green-700">
                        Thank you for your interest in the K2 Preferred Vendor
                        Network. We&apos;ll review your inquiry and follow up shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="serviceType">
                          Service Type
                        </Label>
                        <Input
                          id="serviceType"
                          name="serviceType"
                          placeholder="e.g. Appraisal, Environmental, Legal, Property Management"
                          value={formData.serviceType}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell us about your services or any questions..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <PuzzleCaptcha onVerified={() => setCaptchaPassed(true)} />

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={loading || !captchaPassed}
                      >
                        {loading ? (
                          'Submitting...'
                        ) : (
                          <>
                            Submit Inquiry
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Not a Vendor? Explore Other Programs
          </h2>
          <p className="text-slate-300 mb-8">
            Whether you&apos;re a borrower looking to get funded or a lender
            looking for qualified deal flow, K2 has a program for you.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/membership/certified-borrower">
                Certified Borrower
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/membership/lender-network">Lender Network</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
