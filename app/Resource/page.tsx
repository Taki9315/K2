'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PlayCircle,
  FileText,
  BookOpen,
  Lock,
  Search,
  Filter,
  Crown,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'video' | 'article';
  access_level: 'public' | 'members_only';
  thumbnail_url: string | null;
  category: string;
  view_count: number;
};

type ProductItem = {
  id: string;
  name: string;
  description: string;
  type: 'workbook' | 'membership';
  price: number;
  is_active: boolean;
  features: string[] | null;
};

type TabKey = 'all' | 'workbooks' | 'videos' | 'articles';

export default function ResourcePage() {
  const { user, hasMembership } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [workbooks, setWorkbooks] = useState<ProductItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [hasMembership]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const [contentRes, productsRes] = await Promise.all([
        supabase
          .from('content')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false }),
        supabase
          .from('products')
          .select('*')
          .eq('type', 'workbook')
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
      ]);

      if (contentRes.data) setContent(contentRes.data);
      if (productsRes.data) setWorkbooks(productsRes.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(content.map((c) => c.category).filter(Boolean)));

  const filteredContent = content.filter((item) => {
    if (activeTab === 'videos' && item.type !== 'video') return false;
    if (activeTab === 'articles' && item.type !== 'article') return false;
    if (activeTab === 'workbooks') return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredWorkbooks = workbooks.filter((wb) => {
    if (activeTab !== 'all' && activeTab !== 'workbooks') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        wb.name.toLowerCase().includes(q) ||
        wb.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = filteredContent.length + filteredWorkbooks.length;

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All Resources' },
    { key: 'workbooks', label: 'Workbooks' },
    { key: 'videos', label: 'Videos' },
    { key: 'articles', label: 'Articles' },
  ];

  const canAccessItem = (accessLevel: string) =>
    accessLevel === 'public' || hasMembership;

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resource Library
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Workbooks, videos, and articles to help you navigate commercial
            financing with confidence.
          </p>
          {!user && (
            <p className="mt-4 text-sm text-gray-500">
              <Link href="/login" className="text-primary underline hover:text-primary/80">
                Sign in
              </Link>{' '}
              or{' '}
              <Link href="/membership" className="text-primary underline hover:text-primary/80">
                become a member
              </Link>{' '}
              to unlock all resources.
            </p>
          )}
          {user && !hasMembership && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
              <Lock className="h-3.5 w-3.5" />
              Some resources require an active membership
            </div>
          )}
        </div>
      </section>

      <section className="sticky top-[calc(6rem+3.5rem)] z-30 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {activeTab !== 'workbooks' && (
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
              <p className="mt-4 text-sm text-gray-500">Loading resources...</p>
            </div>
          ) : totalCount === 0 ? (
            <div className="py-20 text-center">
              <Filter className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No resources found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm font-medium text-gray-500">
                {totalCount} resource{totalCount !== 1 ? 's' : ''} found
              </p>

              {filteredWorkbooks.length > 0 && (
                <div className="mb-12">
                  {activeTab === 'all' && (
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Workbooks
                    </h2>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredWorkbooks.map((wb) => (
                      <Link key={wb.id} href="/workbook">
                        <Card className="group h-full overflow-hidden border-2 transition-shadow hover:shadow-lg">
                          <CardContent className="p-0">
                            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950">
                              <BookOpen className="h-16 w-16 text-emerald-300/60" />
                            </div>
                            <div className="p-6">
                              <div className="mb-2 flex items-center gap-2">
                                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                                  Workbook
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  ${wb.price}
                                </span>
                              </div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                                {wb.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                {wb.description}
                              </p>
                              {wb.features && Array.isArray(wb.features) && (
                                <ul className="mt-3 space-y-1">
                                  {(wb.features as string[]).slice(0, 3).map((f) => (
                                    <li
                                      key={f}
                                      className="flex items-start gap-1.5 text-xs text-gray-500"
                                    >
                                      <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredContent.length > 0 && (
                <div>
                  {activeTab === 'all' && (
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Videos &amp; Articles
                    </h2>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredContent.map((item) => {
                      const locked = !canAccessItem(item.access_level);

                      return (
                        <div key={item.id} className="relative">
                          {locked ? (
                            <div className="group h-full">
                              <Card className="h-full overflow-hidden border-2 opacity-75">
                                <CardContent className="p-0">
                                  <div className="relative aspect-video bg-slate-200">
                                    {item.thumbnail_url ? (
                                      <img
                                        src={item.thumbnail_url}
                                        alt={item.title}
                                        className="h-full w-full object-cover blur-[2px]"
                                      />
                                    ) : item.type === 'video' ? (
                                      <div className="flex h-full items-center justify-center">
                                        <PlayCircle className="h-16 w-16 text-slate-300" />
                                      </div>
                                    ) : (
                                      <div className="flex h-full items-center justify-center">
                                        <FileText className="h-16 w-16 text-slate-300" />
                                      </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                                      <Lock className="h-8 w-8 text-white" />
                                      <span className="mt-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900">
                                        Members Only
                                      </span>
                                    </div>
                                    <div className="absolute right-3 top-3">
                                      <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                                        <Crown className="h-3 w-3" />
                                        Member
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-6">
                                    <div className="mb-2 flex items-center gap-2">
                                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                                        {item.category}
                                      </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900">
                                      {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                      {item.description}
                                    </p>
                                    <Link
                                      href="/membership"
                                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                                    >
                                      Unlock with Membership
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ) : (
                            <Link href={`/content/${item.slug}`}>
                              <Card className="group h-full overflow-hidden border-2 transition-shadow hover:shadow-lg">
                                <CardContent className="p-0">
                                  <div className="relative aspect-video bg-slate-200">
                                    {item.thumbnail_url ? (
                                      <img
                                        src={item.thumbnail_url}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : item.type === 'video' ? (
                                      <div className="flex h-full items-center justify-center">
                                        <PlayCircle className="h-16 w-16 text-slate-400" />
                                      </div>
                                    ) : (
                                      <div className="flex h-full items-center justify-center">
                                        <FileText className="h-16 w-16 text-slate-400" />
                                      </div>
                                    )}
                                    <div className="absolute right-3 top-3">
                                      <span className="rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">
                                        {item.type === 'video' ? 'Video' : 'Article'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="p-6">
                                    <div className="mb-2 flex items-center gap-2">
                                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                                        {item.category}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {item.view_count} views
                                      </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 group-hover:text-primary">
                                      {item.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {!hasMembership && (
        <section className="border-t bg-slate-50 py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <Crown className="mx-auto h-10 w-10 text-amber-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Unlock the Full Library
            </h2>
            <p className="mt-3 text-gray-600">
              Members get access to every workbook, video, and article in the
              resource library — plus live Q&amp;A sessions, direct support, and
              early access to new content.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/membership">
                  Explore Membership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/content">Browse Free Content</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
