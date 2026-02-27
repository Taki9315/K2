'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Building2,
  Wrench,
  ArrowLeft,
  Save,
  X,
  ExternalLink,
  Star,
  Upload,
  Inbox,
  Mail,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '@/components/admin/FileUpload';

type InquiryRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string;
  lender_type?: string;
  lending_focus?: string;
  service_type?: string;
  service_areas?: string;
  message: string | null;
  status: 'new' | 'contacted' | 'approved' | 'declined' | 'archived';
  admin_notes: string | null;
  created_at: string;
};

/* ── Types ────────────────────────────────────────────────────────────── */
type PartnerRow = {
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
  updated_at: string;
};

const LENDER_TYPES = [
  { value: '', label: 'Select...' },
  { value: 'bank', label: 'Bank' },
  { value: 'credit_union', label: 'Credit Union' },
  { value: 'cdfi', label: 'CDFI' },
  { value: 'sba_lender', label: 'SBA Lender' },
  { value: 'private_lender', label: 'Private / Direct Lender' },
  { value: 'hard_money', label: 'Hard Money Lender' },
  { value: 'bridge_lender', label: 'Bridge Lender' },
  { value: 'life_company', label: 'Life Company' },
  { value: 'agency', label: 'Agency Lender' },
  { value: 'other', label: 'Other' },
];

const SERVICE_TYPES = [
  { value: '', label: 'Select...' },
  { value: 'appraisal', label: 'Appraisal' },
  { value: 'environmental', label: 'Environmental Consulting' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'legal', label: 'Legal / Attorney' },
  { value: 'title', label: 'Title Services' },
  { value: 'construction_mgmt', label: 'Construction Management' },
  { value: 'property_inspection', label: 'Property Inspection' },
  { value: 'property_mgmt', label: 'Property Management' },
  { value: 'accounting', label: 'Accounting / CPA' },
  { value: 'architecture', label: 'Architecture / Engineering' },
  { value: 'surveying', label: 'Surveying' },
  { value: 'other', label: 'Other' },
];

const ICON_OPTIONS = [
  'Building2', 'Globe', 'Phone', 'DollarSign', 'Shield', 'ShieldCheck',
  'TrendingUp', 'Zap', 'Clock', 'Scale', 'Star', 'Handshake',
  'Target', 'BarChart3', 'Users', 'BadgeCheck', 'FileText', 'CheckCircle2',
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  MAIN ADMIN PAGE                                                      */
/* ══════════════════════════════════════════════════════════════════════ */
export default function AdminPartnersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<PartnerRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'lender' | 'vendor'>('all');
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'partners' | 'inquiries'>('partners');
  const [lenderInquiries, setLenderInquiries] = useState<InquiryRow[]>([]);
  const [vendorInquiries, setVendorInquiries] = useState<InquiryRow[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'lender' | 'vendor'>('all');
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  const [tableError, setTableError] = useState(false);

  const checkAdmin = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    if (data?.role === 'admin') {
      setIsAdmin(true);
    } else {
      router.push('/');
    }
  }, [user, router]);

  const fetchPartners = useCallback(async () => {
    const { data, error } = await supabase
      .from('partner_profiles')
      .select('*')
      .order('partner_type', { ascending: true })
      .order('company_name', { ascending: true });

    if (error && error.message.includes('does not exist')) {
      setTableError(true);
      setLoading(false);
      return;
    }
    if (!error && data) {
      setPartners(data as PartnerRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) {
      checkAdmin();
    }
  }, [user, authLoading, checkAdmin, router]);

  const fetchInquiries = useCallback(async () => {
    setInquiriesLoading(true);
    const [lRes, vRes] = await Promise.all([
      supabase.from('lender_inquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('vendor_inquiries').select('*').order('created_at', { ascending: false }),
    ]);
    if (!lRes.error && lRes.data) setLenderInquiries(lRes.data as InquiryRow[]);
    if (!vRes.error && vRes.data) setVendorInquiries(vRes.data as InquiryRow[]);
    setInquiriesLoading(false);
  }, []);

  const updateInquiryStatus = async (
    table: 'lender_inquiries' | 'vendor_inquiries',
    id: string,
    status: string
  ) => {
    const { error } = await supabase.from(table).update({ status }).eq('id', id);
    if (!error) {
      if (table === 'lender_inquiries') {
        setLenderInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: status as InquiryRow['status'] } : i))
        );
      } else {
        setVendorInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: status as InquiryRow['status'] } : i))
        );
      }
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPartners();
      fetchInquiries();
    }
  }, [isAdmin, fetchPartners, fetchInquiries]);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const { error } = await supabase
      .from('partner_profiles')
      .delete()
      .eq('id', id);
    if (!error) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const togglePublish = async (partner: PartnerRow) => {
    const { error } = await supabase
      .from('partner_profiles')
      .update({ is_published: !partner.is_published })
      .eq('id', partner.id);
    if (!error) {
      setPartners((prev) =>
        prev.map((p) =>
          p.id === partner.id ? { ...p, is_published: !p.is_published } : p
        )
      );
    }
  };

  if (authLoading || loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (tableError) {
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)\./)?.[1] || 'your-project';
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="text-base">
              <strong>Database Setup Required</strong>
              <br />
              The <code className="font-mono bg-red-100 px-1 rounded">partner_profiles</code> table
              does not exist yet. You need to run the migration SQL in the Supabase SQL Editor.
            </AlertDescription>
          </Alert>
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">How to fix this:</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  Open the{' '}
                  <a
                    href={`https://supabase.com/dashboard/project/${projectRef}/sql/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline font-medium"
                  >
                    Supabase SQL Editor
                  </a>
                </li>
                <li>
                  Copy the contents of{' '}
                  <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-sm">
                    supabase/migrations/COMBINED_partner_setup.sql
                  </code>
                </li>
                <li>Paste it into the SQL Editor and click <strong>Run</strong></li>
                <li>Come back here and refresh the page</li>
              </ol>
              <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  /* When editing or creating, show the form */
  if (editingPartner || creating) {
    return (
      <PartnerForm
        partner={editingPartner}
        onSave={async () => {
          setEditingPartner(null);
          setCreating(false);
          await fetchPartners();
        }}
        onCancel={() => {
          setEditingPartner(null);
          setCreating(false);
        }}
      />
    );
  }

  const filteredPartners =
    filterType === 'all'
      ? partners
      : partners.filter((p) => p.partner_type === filterType);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Partner Management
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage Preferred Lender and Vendor profile pages.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setCreating(true)}
            className="shrink-0"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Partner
          </Button>
        </div>

        {/* Main tabs: Partners / Inquiries */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'partners'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Partners ({partners.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Inbox className="h-4 w-4 inline mr-2" />
            Inquiries ({lenderInquiries.length + vendorInquiries.length})
            {(lenderInquiries.filter((i) => i.status === 'new').length +
              vendorInquiries.filter((i) => i.status === 'new').length) > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold h-5 min-w-[20px] px-1">
                {lenderInquiries.filter((i) => i.status === 'new').length +
                  vendorInquiries.filter((i) => i.status === 'new').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'inquiries' ? (
          /* ── Inquiries Tab ─────────────────────────────────── */
          <div>
            <div className="flex gap-2 mb-6">
              {[
                { key: 'all' as const, label: 'All', count: lenderInquiries.length + vendorInquiries.length },
                { key: 'lender' as const, label: 'Lender Inquiries', count: lenderInquiries.length },
                { key: 'vendor' as const, label: 'Vendor Inquiries', count: vendorInquiries.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setInquiryFilter(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    inquiryFilter === tab.key
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>

            {inquiriesLoading ? (
              <div className="text-center py-12 text-gray-500">Loading inquiries...</div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  const allInquiries: (InquiryRow & { source: 'lender' | 'vendor' })[] = [
                    ...(inquiryFilter !== 'vendor'
                      ? lenderInquiries.map((i) => ({ ...i, source: 'lender' as const }))
                      : []),
                    ...(inquiryFilter !== 'lender'
                      ? vendorInquiries.map((i) => ({ ...i, source: 'vendor' as const }))
                      : []),
                  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                  if (allInquiries.length === 0) {
                    return (
                      <Card className="border-2 border-dashed">
                        <CardContent className="p-12 text-center">
                          <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries yet</h3>
                          <p className="text-gray-600">Inquiries from lender and vendor forms will appear here.</p>
                        </CardContent>
                      </Card>
                    );
                  }

                  return allInquiries.map((inquiry) => (
                    <Card key={`${inquiry.source}-${inquiry.id}`} className="border border-slate-200">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="text-base font-semibold text-gray-900">
                                {inquiry.first_name} {inquiry.last_name}
                              </h3>
                              <Badge
                                variant={inquiry.source === 'lender' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {inquiry.source === 'lender' ? (
                                  <Building2 className="h-3 w-3 mr-1" />
                                ) : (
                                  <Wrench className="h-3 w-3 mr-1" />
                                )}
                                {inquiry.source === 'lender' ? 'Lender' : 'Vendor'}
                              </Badge>
                              <InquiryStatusBadge status={inquiry.status} />
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">{inquiry.company}</span>
                              {inquiry.source === 'lender' && inquiry.lender_type && (
                                <> · <span className="capitalize">{inquiry.lender_type.replace(/_/g, ' ')}</span></>
                              )}
                              {inquiry.source === 'vendor' && inquiry.service_type && (
                                <> · <span className="capitalize">{inquiry.service_type.replace(/_/g, ' ')}</span></>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-3">
                              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{inquiry.email}</span>
                              {inquiry.phone && <span>{inquiry.phone}</span>}
                            </p>
                            {inquiry.message && (
                              <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border">
                                {inquiry.message}
                              </p>
                            )}
                            <p className="mt-2 text-xs text-gray-400">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                              })}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <Select
                              value={inquiry.status}
                              onValueChange={(value) =>
                                updateInquiryStatus(
                                  inquiry.source === 'lender' ? 'lender_inquiries' : 'vendor_inquiries',
                                  inquiry.id,
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="w-[140px] h-9 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ));
                })()}
              </div>
            )}
          </div>
        ) : (
          /* ── Partners Tab ──────────────────────────────────── */
          <div>
            {/* Filter tabs */}
            <div className="flex gap-2 mb-6">
          {[
            { key: 'all' as const, label: 'All' },
            { key: 'lender' as const, label: 'Lenders' },
            { key: 'vendor' as const, label: 'Vendors' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterType === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">
                (
                {tab.key === 'all'
                  ? partners.length
                  : partners.filter((p) => p.partner_type === tab.key).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Partner list */}
        {filteredPartners.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No partners yet
              </h3>
              <p className="text-gray-600 mb-6">
                Click &quot;Add Partner&quot; to create your first lender or
                vendor profile page.
              </p>
              <Button onClick={() => setCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Partner
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPartners.map((partner) => (
              <Card
                key={partner.id}
                className={`border ${
                  partner.is_published
                    ? 'border-slate-200'
                    : 'border-dashed border-slate-300 bg-slate-50'
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {partner.company_name}
                        </h3>
                        <Badge
                          variant={
                            partner.partner_type === 'lender'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {partner.partner_type === 'lender' ? (
                            <Building2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Wrench className="h-3 w-3 mr-1" />
                          )}
                          {partner.partner_type === 'lender'
                            ? 'Lender'
                            : 'Vendor'}
                        </Badge>
                        {partner.featured && (
                          <Badge
                            variant="outline"
                            className="text-xs border-yellow-400 text-yellow-700"
                          >
                            <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                            Featured
                          </Badge>
                        )}
                        {!partner.is_published && (
                          <Badge variant="outline" className="text-xs">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 truncate">
                        /{partner.partner_type}/{partner.slug}
                        {partner.contact_name &&
                          ` · ${partner.contact_name}`}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(partner)}
                        title={
                          partner.is_published ? 'Unpublish' : 'Publish'
                        }
                      >
                        {partner.is_published ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        title="Preview"
                      >
                        <Link
                          href={`/${partner.partner_type}/${partner.slug}`}
                          target="_blank"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPartner(partner)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDelete(partner.id, partner.company_name)
                        }
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Inquiry Status Badge helper ──────────────────────────────────── */
function InquiryStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    new: { label: 'New', className: 'bg-blue-100 text-blue-800' },
    contacted: { label: 'Contacted', className: 'bg-yellow-100 text-yellow-800' },
    approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
    declined: { label: 'Declined', className: 'bg-red-100 text-red-800' },
    archived: { label: 'Archived', className: 'bg-gray-100 text-gray-600' },
  };
  const info = map[status] || { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${info.className}`}>
      {status === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1" />}
      {info.label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  PARTNER FORM (create / edit)                                         */
/* ══════════════════════════════════════════════════════════════════════ */
function PartnerForm({
  partner,
  onSave,
  onCancel,
}: {
  partner: PartnerRow | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const isEditing = !!partner;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    partner_type: partner?.partner_type || 'lender',
    slug: partner?.slug || '',
    company_name: partner?.company_name || '',
    logo_url: partner?.logo_url || '',
    contact_picture_url: partner?.contact_picture_url || '',
    tagline: partner?.tagline || '',
    description: partner?.description || '',
    contact_name: partner?.contact_name || '',
    contact_email: partner?.contact_email || '',
    contact_phone: partner?.contact_phone || '',
    website_url: partner?.website_url || '',
    lender_type: partner?.lender_type || '',
    lending_focus: partner?.lending_focus || '',
    min_loan: partner?.min_loan?.toString() || '',
    max_loan: partner?.max_loan?.toString() || '',
    property_types: partner?.property_types?.join(', ') || '',
    states_served: partner?.states_served?.join(', ') || '',
    service_type: partner?.service_type || '',
    service_areas: partner?.service_areas || '',
    video_url: partner?.video_url || '',
    is_published: partner?.is_published ?? false,
    featured: partner?.featured ?? false,
  });

  const [highlights, setHighlights] = useState<
    { icon: string; label: string }[]
  >(partner?.highlights || []);

  const [documents, setDocuments] = useState<
    { name: string; url: string; description: string }[]
  >(
    partner?.documents?.map((d) => ({
      name: d.name,
      url: d.url,
      description: d.description || '',
    })) || []
  );

  // Auto-generate slug from company name
  useEffect(() => {
    if (!isEditing && form.company_name) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.company_name) }));
    }
  }, [form.company_name, isEditing]);

  const isLender = form.partner_type === 'lender';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        partner_type: form.partner_type,
        slug: form.slug,
        company_name: form.company_name,
        logo_url: form.logo_url || null,
        contact_picture_url: form.contact_picture_url || null,
        tagline: form.tagline || null,
        description: form.description || null,
        contact_name: form.contact_name || null,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        website_url: form.website_url || null,
        lender_type: isLender ? form.lender_type || null : null,
        lending_focus: isLender ? form.lending_focus || null : null,
        min_loan: isLender && form.min_loan ? parseFloat(form.min_loan) : null,
        max_loan: isLender && form.max_loan ? parseFloat(form.max_loan) : null,
        property_types: isLender && form.property_types
          ? form.property_types.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
        states_served:
          form.states_served
            ? form.states_served.split(',').map((s) => s.trim()).filter(Boolean)
            : null,
        service_type: !isLender ? form.service_type || null : null,
        service_areas: !isLender ? form.service_areas || null : null,
        video_url: form.video_url || null,
        documents: documents.filter((d) => d.name && d.url),
        highlights: highlights.filter((h) => h.label),
        is_published: form.is_published,
        featured: form.featured,
      };

      if (isEditing && partner) {
        const { error: dbError } = await supabase
          .from('partner_profiles')
          .update(payload)
          .eq('id', partner.id);
        if (dbError) throw dbError;
      } else {
        const { error: dbError } = await supabase
          .from('partner_profiles')
          .insert(payload);
        if (dbError) throw dbError;
      }

      onSave();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to save partner'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Partner List
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? `Edit: ${partner!.company_name}` : 'Add New Partner'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* ── Section 1: Basic Info ────────────────────────────────── */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Partner Type *</Label>
                  <select
                    value={form.partner_type}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        partner_type: e.target.value as 'lender' | 'vendor',
                      }))
                    }
                    disabled={isEditing}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="lender">Lender</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={form.company_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, company_name: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="slug">
                    URL Slug *{' '}
                    <span className="text-xs text-gray-400 font-normal">
                      (/{form.partner_type}/{form.slug || '...'})
                    </span>
                  </Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, slug: slugify(e.target.value) }))
                    }
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Company Logo</Label>
                  <FileUpload
                    value={form.logo_url}
                    onChange={(url) => setForm((p) => ({ ...p, logo_url: url }))}
                    folder="logos"
                    accept="image/*"
                    label="Upload company logo"
                    preview
                  />
                </div>
              </div>

              {/* Contact picture */}
              <div className="space-y-1.5">
                <Label>Contact Picture / Headshot</Label>
                <FileUpload
                  value={form.contact_picture_url}
                  onChange={(url) => setForm((p) => ({ ...p, contact_picture_url: url }))}
                  folder="pictures"
                  accept="image/*"
                  label="Upload contact headshot"
                  preview
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  placeholder="Short one-liner about this partner"
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, tagline: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder="Detailed description of this partner..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Section 2: Contact Info ──────────────────────────────── */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact_name">Contact Name</Label>
                  <Input
                    id="contact_name"
                    value={form.contact_name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contact_name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact_email">
                    Contact Email * (receives inquiries)
                  </Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={form.contact_email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contact_email: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact_phone">Phone</Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contact_phone: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    placeholder="https://..."
                    value={form.website_url}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, website_url: e.target.value }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Section 3: Type-specific Fields ──────────────────────── */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
                {isLender ? 'Lending Details' : 'Vendor Details'}
              </h2>

              {isLender ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Lender Type</Label>
                      <select
                        value={form.lender_type}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            lender_type: e.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {LENDER_TYPES.map((lt) => (
                          <option key={lt.value} value={lt.value}>
                            {lt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lending_focus">Lending Focus</Label>
                      <Input
                        id="lending_focus"
                        placeholder="e.g. SBA 7(a), Multifamily, $500K–$10M"
                        value={form.lending_focus}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            lending_focus: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="min_loan">Min Loan ($)</Label>
                      <Input
                        id="min_loan"
                        type="number"
                        placeholder="e.g. 150000"
                        value={form.min_loan}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, min_loan: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="max_loan">Max Loan ($)</Label>
                      <Input
                        id="max_loan"
                        type="number"
                        placeholder="e.g. 5000000"
                        value={form.max_loan}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, max_loan: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="property_types">
                      Property Types{' '}
                      <span className="text-xs text-gray-400 font-normal">
                        (comma-separated)
                      </span>
                    </Label>
                    <Input
                      id="property_types"
                      placeholder="e.g. Multifamily, Office, Retail, Industrial"
                      value={form.property_types}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          property_types: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="states_served">
                      States Served{' '}
                      <span className="text-xs text-gray-400 font-normal">
                        (comma-separated, e.g. NY, NJ, CT or Nationwide)
                      </span>
                    </Label>
                    <Input
                      id="states_served"
                      placeholder="e.g. NY, NJ, CT"
                      value={form.states_served}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          states_served: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Service Type</Label>
                      <select
                        value={form.service_type}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            service_type: e.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {SERVICE_TYPES.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="service_areas">Service Areas</Label>
                      <Input
                        id="service_areas"
                        placeholder="e.g. NY, NJ, CT or Nationwide"
                        value={form.service_areas}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            service_areas: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="states_served_vendor">
                      States Served{' '}
                      <span className="text-xs text-gray-400 font-normal">
                        (comma-separated)
                      </span>
                    </Label>
                    <Input
                      id="states_served_vendor"
                      placeholder="e.g. NY, NJ, CT"
                      value={form.states_served}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          states_served: e.target.value,
                        }))
                      }
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* ── Section 4: Media ─────────────────────────────────────── */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">
                Media &amp; Documents
              </h2>

              <div className="space-y-1.5">
                <Label htmlFor="video_url">
                  Video URL{' '}
                  <span className="text-xs text-gray-400 font-normal">
                    (embed URL - members only)
                  </span>
                </Label>
                <Input
                  id="video_url"
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={form.video_url}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, video_url: e.target.value }))
                  }
                />
              </div>

              {/* Documents */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Documents (members only)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setDocuments((prev) => [
                        ...prev,
                        { name: '', url: '', description: '' },
                      ])
                    }
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Document
                  </Button>
                </div>
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-muted/30 p-3 mb-3 space-y-2"
                  >
                    <div className="grid grid-cols-12 gap-2 items-start">
                      <Input
                        className="col-span-5"
                        placeholder="Document name"
                        value={doc.name}
                        onChange={(e) => {
                          const updated = [...documents];
                          updated[i] = { ...doc, name: e.target.value };
                          setDocuments(updated);
                        }}
                      />
                      <Input
                        className="col-span-6"
                        placeholder="Description (optional)"
                        value={doc.description}
                        onChange={(e) => {
                          const updated = [...documents];
                          updated[i] = { ...doc, description: e.target.value };
                          setDocuments(updated);
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="col-span-1"
                        onClick={() =>
                          setDocuments((prev) =>
                            prev.filter((_, idx) => idx !== i)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                    <FileUpload
                      value={doc.url}
                      onChange={(url) => {
                        const updated = [...documents];
                        updated[i] = { ...doc, url };
                        setDocuments(updated);
                      }}
                      folder="documents"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
                      label="Upload PDF or document"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Section 5: Highlights / Badges ───────────────────────── */}
          <Card>
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  Highlight Badges
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setHighlights((prev) => [
                      ...prev,
                      { icon: 'Shield', label: '' },
                    ])
                  }
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Badge
                </Button>
              </div>

              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={h.icon}
                    onChange={(e) => {
                      const updated = [...highlights];
                      updated[i] = { ...h, icon: e.target.value };
                      setHighlights(updated);
                    }}
                    className="h-10 rounded-md border border-input bg-background px-2 py-1 text-sm w-40"
                  >
                    {ICON_OPTIONS.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                  <Input
                    className="flex-1"
                    placeholder="Badge label, e.g. K2 Preferred"
                    value={h.label}
                    onChange={(e) => {
                      const updated = [...highlights];
                      updated[i] = { ...h, label: e.target.value };
                      setHighlights(updated);
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setHighlights((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      )
                    }
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ── Section 6: Publishing ────────────────────────────────── */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-5">
                Publishing
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_published}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        is_published: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Published</span>
                    <p className="text-xs text-gray-500">
                      Visible to certified borrowers
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, featured: e.target.checked }))
                    }
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Featured</span>
                    <p className="text-xs text-gray-500">
                      Show prominently in listings
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* ── Actions ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={saving}
              className="min-w-[160px]"
            >
              {saving ? (
                'Saving...'
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {isEditing ? 'Update Partner' : 'Create Partner'}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
