'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  Building2,
  Wrench,
  MapPin,
  DollarSign,
  Globe,
  Search,
  Shield,
  Star,
  ArrowRight,
  Lock,
  Users,
  Handshake,
} from 'lucide-react';

type PartnerCard = {
  id: string;
  partner_type: 'lender' | 'vendor';
  slug: string;
  company_name: string;
  logo_url: string | null;
  contact_picture_url: string | null;
  tagline: string | null;
  contact_name: string | null;
  lender_type: string | null;
  service_type: string | null;
  min_loan: number | null;
  max_loan: number | null;
  states_served: string[] | null;
  service_areas: string | null;
  highlights: { icon: string; label: string }[];
  featured: boolean;
};

const LENDER_TYPE_LABELS: Record<string, string> = {
  bank: 'Bank',
  credit_union: 'Credit Union',
  cdfi: 'CDFI',
  sba_lender: 'SBA Lender',
  private_lender: 'Private / Direct Lender',
  hard_money: 'Hard Money',
  bridge_lender: 'Bridge Lender',
  life_company: 'Life Company',
  agency: 'Agency Lender',
  other: 'Other',
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  appraisal: 'Appraisal',
  environmental: 'Environmental',
  insurance: 'Insurance',
  legal: 'Legal / Attorney',
  title: 'Title Services',
  construction_mgmt: 'Construction Mgmt',
  property_inspection: 'Inspection',
  property_mgmt: 'Property Mgmt',
  accounting: 'Accounting / CPA',
  architecture: 'Architecture',
  surveying: 'Surveying',
  other: 'Other',
};

function formatCurrency(num: number): string {
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

export default function DashboardResourcesPage() {
  const { user, loading, hasMembership } = useAuth();
  const router = useRouter();
  const [partners, setPartners] = useState<PartnerCard[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<'all' | 'lender' | 'vendor'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchPartners();
  }, [user]);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_profiles')
        .select(
          'id, partner_type, slug, company_name, logo_url, contact_picture_url, tagline, contact_name, lender_type, service_type, min_loan, max_loan, states_served, service_areas, highlights, featured'
        )
        .eq('is_published', true)
        .order('featured', { ascending: false })
        .order('company_name', { ascending: true });

      if (error) throw error;
      setPartners((data as PartnerCard[]) || []);
    } catch (err) {
      console.error('Error fetching partners:', err);
    } finally {
      setFetching(false);
    }
  };

  const filtered = partners
    .filter((p) => filter === 'all' || p.partner_type === filter)
    .filter(
      (p) =>
        !search ||
        p.company_name.toLowerCase().includes(search.toLowerCase()) ||
        p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
        p.contact_name?.toLowerCase().includes(search.toLowerCase())
    );

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-primary/90">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-slate-400 text-sm">
            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-white">Partner Resources</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            K2 Partner Resources
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Browse our vetted network of preferred lenders and trusted vendors.
            Click any partner to view their full profile, documents, and contact form.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex gap-2">
              {[
                { key: 'all' as const, label: 'All Partners', icon: Users },
                { key: 'lender' as const, label: 'Lenders', icon: Building2 },
                { key: 'vendor' as const, label: 'Vendors', icon: Wrench },
              ].map((tab) => (
                <Button
                  key={tab.key}
                  variant={filter === tab.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(tab.key)}
                  className="gap-1.5"
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                  <span className="text-xs opacity-70 ml-1">
                    (
                    {tab.key === 'all'
                      ? partners.length
                      : partners.filter((p) => p.partner_type === tab.key).length}
                    )
                  </span>
                </Button>
              ))}
            </div>
            <div className="relative sm:ml-auto w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {fetching ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading partners...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Handshake className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {search ? 'No partners match your search' : 'No partners available yet'}
              </h3>
              <p className="text-muted-foreground">
                {search
                  ? 'Try a different search term.'
                  : 'Partners will appear here once published by the admin.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/${partner.partner_type}/${partner.slug}`}
                  className="group"
                >
                  <Card className="h-full border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all duration-200 overflow-hidden">
                    {/* Card header with logo / picture */}
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 p-6 pb-4">
                      {partner.featured && (
                        <Badge className="absolute top-3 right-3 bg-yellow-500/90 text-white border-0 text-[10px]">
                          <Star className="h-3 w-3 mr-0.5 fill-white" />
                          Featured
                        </Badge>
                      )}

                      <div className="flex items-center gap-4">
                        {/* Logo or picture */}
                        {partner.logo_url ? (
                          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                            <img
                              src={partner.logo_url}
                              alt={partner.company_name}
                              className="w-full h-full object-contain p-1.5"
                            />
                          </div>
                        ) : partner.contact_picture_url ? (
                          <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-white/30">
                            <img
                              src={partner.contact_picture_url}
                              alt={partner.contact_name || partner.company_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center">
                            {partner.partner_type === 'lender' ? (
                              <Building2 className="h-7 w-7 text-white/50" />
                            ) : (
                              <Wrench className="h-7 w-7 text-white/50" />
                            )}
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white truncate group-hover:text-primary transition">
                            {partner.company_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-white/15 text-white border-0"
                            >
                              {partner.partner_type === 'lender' ? 'Lender' : 'Vendor'}
                            </Badge>
                            <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">
                              <Shield className="h-2.5 w-2.5 mr-0.5" />
                              K2 Preferred
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-1">
                      {/* Tagline */}
                      {partner.tagline && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {partner.tagline}
                        </p>
                      )}

                      {/* Details row */}
                      <div className="space-y-1.5 text-xs text-gray-500 mb-4">
                        {partner.partner_type === 'lender' && partner.lender_type && (
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>{LENDER_TYPE_LABELS[partner.lender_type] || partner.lender_type}</span>
                          </div>
                        )}
                        {partner.partner_type === 'vendor' && partner.service_type && (
                          <div className="flex items-center gap-1.5">
                            <Handshake className="h-3.5 w-3.5" />
                            <span>{SERVICE_TYPE_LABELS[partner.service_type] || partner.service_type}</span>
                          </div>
                        )}
                        {partner.partner_type === 'lender' &&
                          partner.min_loan != null &&
                          partner.max_loan != null && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="h-3.5 w-3.5" />
                              <span>
                                {formatCurrency(partner.min_loan)} – {formatCurrency(partner.max_loan)}
                              </span>
                            </div>
                          )}
                        {partner.states_served && partner.states_served.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{partner.states_served.join(', ')}</span>
                          </div>
                        )}
                        {partner.partner_type === 'vendor' && partner.service_areas && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{partner.service_areas}</span>
                          </div>
                        )}
                      </div>

                      {/* Highlight badges */}
                      {partner.highlights && partner.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {partner.highlights.slice(0, 3).map((h, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                            >
                              {h.label}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto pt-3 border-t border-slate-100">
                        <span className="text-sm font-medium text-primary group-hover:underline flex items-center gap-1">
                          View Profile
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA for non-members */}
      {!hasMembership && (
        <section className="py-12 bg-white border-t">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Lock className="h-10 w-10 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unlock Full Partner Access
            </h2>
            <p className="text-gray-600 mb-6">
              Become a K2 Certified Borrower to access partner documents, videos,
              and direct contact forms.
            </p>
            <Button size="lg" asChild>
              <Link href="/membership/certified-borrower">
                Become a Certified Borrower
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
