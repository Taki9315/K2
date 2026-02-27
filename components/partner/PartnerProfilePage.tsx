'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Play,
  FileText,
  Download,
  CheckCircle2,
  Send,
  Shield,
  ShieldCheck,
  TrendingUp,
  Zap,
  Clock,
  Scale,
  Lock,
  ArrowLeft,
  Star,
  Handshake,
  Target,
  BarChart3,
  Users,
  BadgeCheck,
} from 'lucide-react';

/* ── Icon map for stored highlight icons ──────────────────────────────── */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Play,
  FileText,
  Download,
  CheckCircle2,
  Send,
  Shield,
  ShieldCheck,
  TrendingUp,
  Zap,
  Clock,
  Scale,
  Lock,
  Star,
  Handshake,
  Target,
  BarChart3,
  Users,
  BadgeCheck,
};

/* ── Types ────────────────────────────────────────────────────────────── */
export type PartnerProfile = {
  id: string;
  partner_type: 'lender' | 'vendor';
  slug: string;
  company_name: string;
  logo_url: string | null;
  tagline: string | null;
  description: string | null;
  contact_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  website_url: string | null;
  lender_type: string | null;
  lending_focus: string | null;
  min_loan: number | null;
  max_loan: number | null;
  property_types: string[] | null;
  states_served: string[] | null;
  service_type: string | null;
  service_areas: string | null;
  contact_picture_url: string | null;
  video_url: string | null;
  documents: { name: string; url: string; description?: string }[];
  highlights: { icon: string; label: string }[];
  is_published: boolean;
  featured: boolean;
  created_at: string;
};

/* ── Format currency ──────────────────────────────────────────────────── */
function formatCurrency(num: number): string {
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

/* ── Lender type display ──────────────────────────────────────────────── */
const LENDER_TYPE_LABELS: Record<string, string> = {
  bank: 'Bank',
  credit_union: 'Credit Union',
  cdfi: 'CDFI',
  sba_lender: 'SBA Lender',
  private_lender: 'Private / Direct Lender',
  hard_money: 'Hard Money Lender',
  bridge_lender: 'Bridge Lender',
  life_company: 'Life Company',
  agency: 'Agency Lender',
  other: 'Other',
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  appraisal: 'Appraisal',
  environmental: 'Environmental Consulting',
  insurance: 'Insurance',
  legal: 'Legal / Attorney',
  title: 'Title Services',
  construction_mgmt: 'Construction Management',
  property_inspection: 'Property Inspection',
  property_mgmt: 'Property Management',
  accounting: 'Accounting / CPA',
  architecture: 'Architecture / Engineering',
  surveying: 'Surveying',
  other: 'Other',
};

/* ══════════════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                       */
/* ══════════════════════════════════════════════════════════════════════ */
export function PartnerProfilePage({ partner }: { partner: PartnerProfile }) {
  const { user, hasMembership } = useAuth();
  const isLender = partner.partner_type === 'lender';
  const backHref = isLender ? '/preferred-lenders' : '/membership';
  const backLabel = isLender ? 'All Preferred Lenders' : 'Back';

  return (
    <div className="flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 md:py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo */}
            {partner.logo_url ? (
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-white flex items-center justify-center overflow-hidden border-2 border-white/20">
                <img
                  src={partner.logo_url}
                  alt={partner.company_name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ) : partner.contact_picture_url ? (
              <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src={partner.contact_picture_url}
                  alt={partner.contact_name || partner.company_name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-white/10 flex items-center justify-center border-2 border-white/20">
                <Building2 className="h-12 w-12 text-white/50" />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {partner.company_name}
                </h1>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <Shield className="h-3 w-3 mr-1" />
                  K2 Preferred {isLender ? 'Lender' : 'Vendor'}
                </Badge>
              </div>

              {partner.tagline && (
                <p className="text-lg text-slate-300 mt-2 leading-relaxed">
                  {partner.tagline}
                </p>
              )}

              {/* Quick details row */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                {isLender && partner.lender_type && (
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {LENDER_TYPE_LABELS[partner.lender_type] || partner.lender_type}
                  </span>
                )}
                {!isLender && partner.service_type && (
                  <span className="flex items-center gap-1.5">
                    <Handshake className="h-4 w-4" />
                    {SERVICE_TYPE_LABELS[partner.service_type] || partner.service_type}
                  </span>
                )}
                {partner.states_served && partner.states_served.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {partner.states_served.join(', ')}
                  </span>
                )}
                {!isLender && partner.service_areas && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {partner.service_areas}
                  </span>
                )}
                {isLender && partner.min_loan != null && partner.max_loan != null && (
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(partner.min_loan)} – {formatCurrency(partner.max_loan)}
                  </span>
                )}
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Highlight badges */}
          {partner.highlights && partner.highlights.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
              {partner.highlights.map((h, i) => {
                const Icon = ICON_MAP[h.icon] || Shield;
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {h.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── About section ─────────────────────────────────────────────── */}
      {partner.description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              About {partner.company_name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {partner.description}
            </p>

            {/* Lender-specific details */}
            {isLender && partner.lending_focus && (
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Lending Focus</h3>
                <p className="text-gray-600">{partner.lending_focus}</p>
              </div>
            )}

            {isLender && partner.property_types && partner.property_types.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Property Types</h3>
                <div className="flex flex-wrap gap-2">
                  {partner.property_types.map((pt) => (
                    <Badge key={pt} variant="secondary" className="text-sm">
                      {pt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Video section (members only) ──────────────────────────────── */}
      {partner.video_url && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Video Introduction
            </h2>
            {hasMembership ? (
              <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-lg">
                <iframe
                  src={partner.video_url}
                  title={`${partner.company_name} video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-slate-200 flex flex-col items-center justify-center text-center p-8">
                <Lock className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Members-Only Video
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  This video is available exclusively to K2 Certified Borrowers.
                </p>
                <Button asChild>
                  <Link href="/membership/certified-borrower">
                    Become a Certified Borrower
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Documents section (members only) ──────────────────────────── */}
      {partner.documents && partner.documents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Documents &amp; Resources
            </h2>
            {hasMembership ? (
              <div className="space-y-4">
                {partner.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 hover:border-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary/20 transition">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 group-hover:text-primary transition">
                        {doc.name}
                      </p>
                      {doc.description && (
                        <p className="text-sm text-gray-500 truncate">
                          {doc.description}
                        </p>
                      )}
                    </div>
                    <Download className="h-5 w-5 text-gray-400 group-hover:text-primary flex-shrink-0 transition" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <Lock className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">
                  Documents are available to K2 Certified Borrowers only.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/membership/certified-borrower">
                    Become a Certified Borrower
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Contact form ──────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: contact info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Contact {partner.company_name}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Interested in working with {partner.company_name}? Fill out the
                form and your message will be sent directly to their team.
              </p>

              <div className="space-y-4">
                {partner.contact_name && (
                  <div className="flex items-center gap-3 text-gray-700">
                    {partner.contact_picture_url ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                        <img
                          src={partner.contact_picture_url}
                          alt={partner.contact_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <Users className="h-5 w-5 text-primary" />
                    )}
                    <span>{partner.contact_name}</span>
                  </div>
                )}
                {partner.contact_phone && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>{partner.contact_phone}</span>
                  </div>
                )}
                {partner.website_url && (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: form */}
            <div>
              {hasMembership ? (
                <ContactForm partner={partner} user={user} />
              ) : (
                <Card className="border-2">
                  <CardContent className="p-8 text-center">
                    <Lock className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Certified Borrowers Only
                    </h3>
                    <p className="text-gray-600 mb-6">
                      The contact form is available exclusively to K2 Certified
                      Borrowers. Become certified to connect directly with our
                      Preferred {isLender ? 'Lenders' : 'Vendors'}.
                    </p>
                    <Button asChild>
                      <Link href="/membership/certified-borrower">
                        Become a Certified Borrower
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Explore More K2 Preferred {isLender ? 'Lenders' : 'Vendors'}
          </h2>
          <p className="text-slate-300 mb-8">
            Our network of vetted {isLender ? 'lenders' : 'vendors'} is here to
            support your commercial real estate goals.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isLender ? (
              <Button size="lg" asChild>
                <Link href="/preferred-lenders">
                  View All Preferred Lenders
                </Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/membership">
                  Explore the K2 Network
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/membership/certified-borrower">
                Become a Certified Borrower
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  CONTACT FORM                                                         */
/* ══════════════════════════════════════════════════════════════════════ */
function ContactForm({
  partner,
  user,
}: {
  partner: PartnerProfile;
  user: { id: string; email?: string; user_metadata?: { full_name?: string } } | null;
}) {
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('partner_contacts')
        .insert({
          partner_id: partner.id,
          user_id: user?.id || null,
          sender_name: formData.name,
          sender_email: formData.email,
          sender_phone: formData.phone || null,
          subject: formData.subject || null,
          message: formData.message,
        });

      if (dbError) throw dbError;

      // Send email via API
      try {
        await fetch('/api/contact-partner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partnerId: partner.id,
            partnerEmail: partner.contact_email,
            partnerName: partner.company_name,
            senderName: formData.name,
            senderEmail: formData.email,
            senderPhone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        });
      } catch {
        /* non-blocking - contact was already saved to DB */
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-1">
            Message Sent
          </h3>
          <p className="text-sm text-green-700">
            Your message has been sent directly to {partner.company_name}.
            They&apos;ll follow up with you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Send a Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="contact-name">Your Name *</Label>
            <Input
              id="contact-name"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email">Your Email *</Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-subject">Subject</Label>
            <Input
              id="contact-subject"
              placeholder="e.g. Financing inquiry, Rate question..."
              value={formData.subject}
              onChange={(e) =>
                setFormData((p) => ({ ...p, subject: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-message">Message *</Label>
            <Textarea
              id="contact-message"
              rows={4}
              placeholder="Tell them about your project or what you need..."
              value={formData.message}
              onChange={(e) =>
                setFormData((p) => ({ ...p, message: e.target.value }))
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
