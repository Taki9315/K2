'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Wrench,
  Upload,
  MessageCircle,
  FileText,
  BookOpen,
  Calendar,
  Folder,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Shield,
  Trash2,
} from 'lucide-react';

/* ── Types ───────────────────────────────────────────────────────────── */

type VaultDoc = {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  category: string;
  created_at: string;
  storage_path: string;
};

type Submission = {
  id: string;
  summary_text: string | null;
  created_at: string;
};

type MeetingRequest = {
  id: string;
  meeting_type: string;
  status: string;
  scheduled_at: string | null;
  created_at: string;
};

/* ── Hub page for non-authenticated visitors ─────────────────────────── */

const membershipCards = [
  {
    title: 'Certified Borrower',
    description:
      'Get lender-ready faster with guided preparation milestones, a single borrower workspace, and the credibility that comes with K2 certification.',
    href: '/membership/certified-borrower',
    icon: BadgeCheck,
  },
  {
    title: 'K2 Preferred Lender',
    description:
      'Direct lenders committed to providing white-glove service and dedicated account representation to our certified borrowers.',
    href: '/membership/preferred-lender',
    icon: Building2,
  },
  {
    title: 'K2 CRE Preferred Vendor',
    description:
      'Trusted service providers delivering priority support, faster turnaround, and specialized expertise to K2 certified borrowers.',
    href: '/membership/preferred-vendor',
    icon: Wrench,
  },
];

function MembershipHub() {
  return (
    <div className="flex flex-col">
      {/* Sample page banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4 text-center">
        <span className="text-sm text-amber-800 font-medium mr-2">📐 A sample redesign is available for review:</span>
        <Link
          href="/membership-sample"
          className="inline-flex items-center gap-1 rounded-md bg-amber-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-700 transition"
        >
          View Membership Sample Page
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Membership
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re building a dream team of lenders and vendors committed to
            providing white-glove service — including a dedicated account
            representative — to every K2 Certified Borrower.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipCards.map((page) => (
              <Card
                key={page.title}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                    <page.icon className="h-6 w-6 text-slate-700" />
                  </div>
                  <CardTitle className="text-2xl">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{page.description}</p>
                  <Button asChild>
                    <Link href={page.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Borrower value proposition */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Workbook Buyers
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            When you purchase the K2 Borrower Preparation Workbook, you unlock
            access to our Certified Borrower dashboard — your command center
            for document management, lender matching, meeting scheduling, and
            direct support from the K2 team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/workbook">
                Get the Workbook
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Upgrade prompt for authenticated-but-not-certified users ──────── */

function UpgradePrompt() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Become a Certified Borrower
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The membership dashboard is available exclusively to Certified
            Borrowers who have purchased the K2 Borrower Preparation Workbook.
            Get your workbook today to unlock your dashboard, document vault,
            meeting scheduling, and direct support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/workbook">
                Purchase Workbook
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/membership/certified-borrower">
                Learn About Certification
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Document category labels ──────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  executive_summary: 'Executive Summary',
  financial_statement: 'Financial Statement',
  tax_return: 'Tax Return',
  entity_docs: 'Entity Documents',
  rent_roll: 'Rent Roll',
  operating_statement: 'Operating Statement',
  personal_financial: 'Personal Financial Statement',
  insurance: 'Insurance',
  appraisal: 'Appraisal',
  general: 'General',
};

const DOC_CATEGORIES = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

/* ── Gated Dashboard ─────────────────────────────────────────────────── */

function CertifiedDashboard({ userName }: { userName: string }) {
  const [documents, setDocuments] = useState<VaultDoc[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [meetings, setMeetings] = useState<MeetingRequest[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('general');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchDocuments();
      fetchSubmissions();
      fetchMeetings();
    }
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('document_vault')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setDocuments(data || []);
  };

  const fetchSubmissions = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('submissions')
      .select('id, summary_text, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    setSubmissions(data || []);
  };

  const fetchMeetings = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('meeting_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    setMeetings(data || []);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      const storagePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: storageError } = await supabase.storage
        .from('document-vault')
        .upload(storagePath, file);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase.from('document_vault').insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type || 'application/octet-stream',
        file_size: file.size,
        storage_path: storagePath,
        category: uploadCategory,
      });

      if (dbError) throw dbError;

      setUploadSuccess(`"${file.name}" uploaded successfully.`);
      fetchDocuments();
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : 'Upload failed. Please try again.'
      );
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteDoc = async (doc: VaultDoc) => {
    if (!user) return;
    await supabase.storage.from('document-vault').remove([doc.storage_path]);
    await supabase.from('document_vault').delete().eq('id', doc.id);
    fetchDocuments();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      scheduled: { color: 'bg-blue-100 text-blue-800', icon: Calendar },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      cancelled: { color: 'bg-gray-100 text-gray-500', icon: AlertCircle },
    };
    const s = map[status] || map.pending;
    const Icon = s.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.color}`}
      >
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 text-green-300 px-3 py-1 text-sm font-medium mb-3">
                <BadgeCheck className="h-4 w-4" />
                Certified Borrower
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {userName || 'Borrower'}
              </h1>
              <p className="text-slate-300 text-lg">
                Your K2 Certified Borrower dashboard — manage documents, track
                submissions, and schedule meetings with your dedicated team.
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="shrink-0"
            >
              <Link href="/assistant">
                <MessageCircle className="mr-2 h-5 w-5" />
                Open AI Assistant
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Links */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Workbook', href: '/workbook', icon: BookOpen },
              { label: 'Resources', href: '/Resource', icon: FileText },
              { label: 'Calculator', href: '/calculator', icon: ExternalLink },
              { label: 'Content Library', href: '/content', icon: Folder },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 hover:shadow-md transition-shadow"
              >
                <link.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-gray-900">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Document Vault */}
        <section>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Upload className="h-5 w-5 text-primary" />
                Document Vault
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload your Project Executive Summary, financial statements, and
                supporting documents. These are reviewed before your scheduled
                meeting with the K2 team.
              </p>

              {/* Upload area */}
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="doc-category"
                      className="text-sm font-medium text-gray-700"
                    >
                      Category:
                    </label>
                    <select
                      id="doc-category"
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                    >
                      {DOC_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Upload className="h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Choose File'}
                    </span>
                  </label>
                </div>

                {uploadError && (
                  <Alert variant="destructive" className="mt-3 text-left">
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
                {uploadSuccess && (
                  <Alert className="mt-3 text-left border-green-200 bg-green-50">
                    <AlertDescription className="text-green-800">
                      {uploadSuccess}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Doc list */}
              {documents.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="h-5 w-5 text-slate-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {doc.file_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {CATEGORY_LABELS[doc.category] || doc.category}{' '}
                            &middot; {formatBytes(doc.file_size)} &middot;{' '}
                            {new Date(doc.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDoc(doc)}
                        className="text-red-400 hover:text-red-600 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No documents uploaded yet. Start by uploading your Project
                  Executive Summary.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Submission Status */}
        <section>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                Submission Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submissions.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Submission{' '}
                          <span className="text-xs text-gray-400 font-mono">
                            {sub.id.slice(0, 8)}
                          </span>
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {sub.summary_text && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {sub.summary_text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No submissions yet. Use the AI Assistant to generate your
                  borrower summary.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Meeting Requests */}
        <section>
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="h-5 w-5 text-primary" />
                Meeting Requests
              </CardTitle>
              <Button size="sm" variant="outline" asChild>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  Schedule Meeting
                </a>
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Workbook purchasers can schedule a project review meeting. Please
                upload or forward your{' '}
                <strong>Project Executive Summary</strong> prior to the meeting
                so we can prepare.
              </p>
              {meetings.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {meetings.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">
                          {m.meeting_type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Requested{' '}
                          {new Date(m.created_at).toLocaleDateString()}
                          {m.scheduled_at &&
                            ` · Scheduled ${new Date(
                              m.scheduled_at
                            ).toLocaleDateString()}`}
                        </p>
                      </div>
                      {statusBadge(m.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No meeting requests yet.
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

/* ── Main Page Component ─────────────────────────────────────────────── */

export default function MembershipPage() {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<{
    role: string;
    full_name: string | null;
  } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('id', user.id)
          .maybeSingle();
        setProfile(data);
      }
      setProfileLoading(false);
    })();
  }, [user]);

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Not logged in → show public hub
  if (!user) {
    return <MembershipHub />;
  }

  // Logged in but not certified → show upgrade prompt
  // if (profile?.role !== 'certified' && profile?.role !== 'admin') {
  //   return <UpgradePrompt />;
  // }

  // Certified or admin → show dashboard
  return (
    <CertifiedDashboard
      userName={
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        ''
      }
    />
  );
}
