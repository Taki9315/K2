'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { LoanTypesGuide } from '@/components/LoanTypesGuide';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlayCircle, FileText, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'video' | 'article';
  thumbnail_url: string | null;
  category: string;
  view_count: number;
};

export default function ContentHubPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchContent();
    })();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchQuery, selectedCategory, selectedType]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('is_published', true)
        .eq('access_level', 'public')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = [...content];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    setFilteredContent(filtered);
  };

  const categories = Array.from(new Set(content.map((item) => item.category)));

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Free Educational Content
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Learn the fundamentals of business financing with our free videos
            and articles. No registration required.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading content...</p>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No content found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredContent.length} Resource
                  {filteredContent.length !== 1 ? 's' : ''} Found
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContent.map((item) => (
                  <Link key={item.id} href={`/content/${item.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="p-0">
                        <div className="aspect-video bg-slate-200 rounded-t-lg flex items-center justify-center relative">
                          {item.thumbnail_url ? (
                            <img
                              src={item.thumbnail_url}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-t-lg"
                            />
                          ) : item.type === 'video' ? (
                            <PlayCircle className="h-16 w-16 text-slate-400" />
                          ) : (
                            <FileText className="h-16 w-16 text-slate-400" />
                          )}
                          <div className="absolute top-3 right-3">
                            <span className="text-xs font-semibold text-white bg-black bg-opacity-70 px-2 py-1 rounded">
                              {item.type === 'video' ? 'Video' : 'Article'}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.view_count} views
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Know Your Options</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
              Know Your Loan Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding available programs is the first step to choosing the
              right one. Expand each to see what lenders look for, common
              pitfalls, and a prep tip linked to the workbook.
            </p>
          </div>

          <LoanTypesGuide />
        </div>
      </section>
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want More Advanced Content?
          </h2>
          <p className="text-lg text-white mb-8">
            Join our membership program for exclusive videos, live Q&A sessions,
            and personalized guidance.
          </p>
          <Button size="lg" asChild>
            <Link href="/membership">Explore Membership</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
