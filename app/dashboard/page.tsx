'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AssistantDialog } from '@/components/assistant/AssistantDialog';
import {
  BookOpen,
  Video,
  Award,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
  Bot,
  FileText,
  DollarSign,
  BarChart3,
  Phone,
  Compass,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Order = {
  id: string;
  product_id: string;
  amount: number;
  status: string;
  created_at: string;
  products: {
    name: string;
    type: string;
  };
};

type Submission = {
  id: string;
  summary_text: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const { user, loading, hasMembership } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentContent, setRecentContent] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    (async () => {
      if (user) {
        await fetchOrders();
        await fetchRecentContent();
        await fetchSubmissions();
      }
    })();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, products(name, type)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchRecentContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        // Table may not exist yet — silently ignore
        console.warn('Content table not available yet:', error.message);
        setRecentContent([]);
        return;
      }
      setRecentContent(data || []);
    } catch (error) {
      // Silently handle — content section is optional
      setRecentContent([]);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        return;
      }

      const response = await fetch('/api/submissions', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load submissions');
      }

      const data = (await response.json()) as { submissions?: Submission[] };
      setSubmissions(data.submissions ?? []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-primary/90">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-primary/90 mt-2">
            Here's an overview of your learning journey
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary/90 mb-1">Status</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {hasMembership ? 'Member' : 'Free'}
                    </p>
                  </div>
                  <Award className="h-12 w-12 text-primary/90" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary/90 mb-1">Purchases</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.length}
                    </p>
                  </div>
                  <ShoppingBag className="h-12 w-12 text-primary/90" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary/90 mb-1">Resources</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {hasMembership ? 'Unlimited' : 'Free'}
                    </p>
                  </div>
                  <BookOpen className="h-12 w-12 text-primary/90" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary/90 mb-1">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {hasMembership ? 'Active' : 'Getting Started'}
                    </p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-primary/90" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {!hasMembership && (
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-4">
                      Unlock Full Access
                    </h2>
                    <p className="text-primary-foreground mb-6">
                      Join our membership program for exclusive content, live
                      Q&A sessions, and personalized guidance.
                    </p>
                    <Button variant="secondary" size="lg" asChild>
                      <Link href="/membership">
                        Explore Membership
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    K2 PrepCoach Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Select a task to get step-by-step AI coaching for your loan package.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { icon: FileText, label: 'Executive Summary', href: '/prepcoach#executive-summary' },
                      { icon: DollarSign, label: 'Financial Statement', href: '/prepcoach#personal-financial-statement' },
                      { icon: BarChart3, label: 'Calculate DSCR', href: '/prepcoach#dscr-calculator' },
                      { icon: Phone, label: 'Lender Scripts', href: '/prepcoach#lender-scripts' },
                      { icon: Compass, label: 'General Onboarding', href: '/prepcoach#onboarding' },
                    ].map((task) => (
                      <Button
                        key={task.label}
                        variant="outline"
                        size="sm"
                        asChild
                        className="justify-start gap-2 h-auto py-2.5 text-left"
                      >
                        <Link href={task.href}>
                          <task.icon className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{task.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                  <Button variant="link" size="sm" asChild className="mt-3 px-0">
                    <Link href="/prepcoach">
                      View all PrepCoach templates
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Content</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentContent.length === 0 ? (
                    <p className="text-primary/90">No content available yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {recentContent.map((item) => (
                        <Link
                          key={item.id}
                          href={`/content/${item.slug}`}
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-20 h-20 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                            <Video className="h-8 w-8 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/content">View All Content</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Package Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {submissions.length === 0 ? (
                    <div className="space-y-4">
                      <p className="text-primary/90">
                        No submissions yet. Start your first guided loan package
                        intake.
                      </p>
                      <AssistantDialog
                        triggerLabel="Open PrepCoach"
                        triggerVariant="default"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.slice(0, 5).map((submission) => (
                        <div
                          key={submission.id}
                          className="rounded-lg border p-3 text-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-gray-900">
                              {submission.summary_text
                                ? 'Summary Generated'
                                : 'Intake Saved'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                submission.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                            {submission.summary_text ??
                              'Summary not generated yet. Open assistant to continue.'}
                          </p>
                        </div>
                      ))}
                      <AssistantDialog
                        triggerLabel="Start New Package"
                        triggerVariant="outline"
                        triggerClassName="w-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/content">Browse Content</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/prepcoach">
                      <Bot className="mr-2 h-4 w-4" />
                      PrepCoach Templates
                    </Link>
                  </Button>
                  {!hasMembership && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/workbook">Get Success Kit</Link>
                    </Button>
                  )}
                  <AssistantDialog
                    triggerLabel="PrepCoach"
                    triggerVariant="outline"
                    triggerClassName="w-full"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/profile">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              {orders.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Purchases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="text-sm pb-3 border-b last:border-0"
                        >
                          <p className="font-semibold text-gray-900">
                            {order.products.name}
                          </p>
                          <p className="text-gray-600">
                            ${(order.amount / 100).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
