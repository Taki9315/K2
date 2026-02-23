'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const ABOUT_MISSION_IMAGE =
  'https://images.unsplash.com/photo-1758518727734-98f0a55983b6?auto=format&fit=crop&w=1600&q=80';
const ABOUT_EXPERTISE_IMAGE =
  'https://images.unsplash.com/photo-1758518729711-1cbacd55efdb?auto=format&fit=crop&w=1200&q=80';
const ABOUT_HONESTY_IMAGE =
  'https://images.pexels.com/photos/8729952/pexels-photo-8729952.jpeg?auto=compress&cs=tinysrgb&w=1200';
const ABOUT_ACCESS_IMAGE =
  'https://images.pexels.com/photos/7947656/pexels-photo-7947656.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function AboutPage() {
  const [missionExpanded, setMissionExpanded] = useState(false);
  const [kenExpanded, setKenExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Education-First Financing Guidance
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We believe informed borrowers make better decisions, secure better
            terms, and build more sustainable businesses.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our mission is to deliver actionable tools and education that
                empower borrowers to understand exactly what lenders look for,
                position their deals effectively, and navigate the financing
                process with confidence—no hype, no guarantees, just honest,
                expert guidance based on 25+ years of real lending experience.
              </p>

              <button
                onClick={() => setMissionExpanded(!missionExpanded)}
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline transition-all cursor-pointer"
              >
                {missionExpanded ? 'Less Information' : 'More Information'}
                {missionExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {missionExpanded && (
                <div className="mt-6 space-y-5 border-l-4 border-primary/30 pl-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    More than a learning platform, we're building a community
                    where borrowers gain immediate access to a team of financing
                    and CRE experts who are ready to help. These experts want to
                    work with prepared borrowers who respect their time, come
                    ready to move forward, and present clean, fundable
                    opportunities.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    By getting you prepped and positioned right, we make it
                    easier for you to tap that expert support quickly and
                    efficiently — leading to faster approvals, better terms, and
                    deals that actually close.
                  </p>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    A one-time $249 investment gives you lifetime access to all
                    we offer to K2 Certified Borrowers. Welcome to a community
                    built around real expertise and mutual respect.
                  </p>
                </div>
              )}
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div
                className="aspect-square rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url('${ABOUT_MISSION_IMAGE}')` }}
                aria-label="Business strategy meeting"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Message from Ken */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Message from Ken
            </h2>

            <div className="space-y-5">
              <p className="text-lg text-gray-600 leading-relaxed">
                For over two decades, the core needs of borrowers and lenders
                haven't really changed.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Borrowers still need the best possible terms on solid deals
                without wasting months chasing dead ends. Lenders still want
                clean, ready-to-close opportunities that respect their time and
                underwriting guidelines—especially in our $150K–$5M sweet spot
                where big banks often ignore or mishandle small commercial
                transactions.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The pain points? They've been the same for years: poorly
                prepared packages, mismatched lenders, endless back-and-forth,
                and good deals dying on the vine from frustration and wasted
                effort.
              </p>

              <button
                onClick={() => setKenExpanded(!kenExpanded)}
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline transition-all cursor-pointer"
              >
                {kenExpanded ? 'Less Information' : 'More Information'}
                {kenExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {kenExpanded && (
                <div className="space-y-5 border-l-4 border-primary/30 pl-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    That's exactly why I founded K2 in 2001—and why my business
                    has always acted as the conduit. I screen out impossible
                    deals early, help borrowers prepare strong, lender-ready
                    financing requests, match them with the most likely sources
                    to close, and save everyone time, money, and headaches. It's
                    the same hands-on approach that's funded over $75 million for
                    hundreds of clients.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    What has changed recently is technology. Tools like AI,
                    automation, and streamlined digital workflows now make the
                    entire process faster and more efficient—for prepared
                    borrowers and busy experts alike.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    That's why I've created two ways to help:
                  </p>
                  <ul className="space-y-4 ml-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg text-gray-600 leading-relaxed">
                        <strong>The Financing Success Kit</strong> – a
                        practical, step-by-step guide for folks who want to
                        master the process on their own and come to the table
                        fully prepared.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-lg text-gray-600 leading-relaxed">
                        <strong>The K2 Certified Borrower Program</strong> –
                        combining PrepCoach, our proprietary AI Agent for
                        maximum speed and efficiency with direct access to our
                        team of vetted financing and CRE experts who are ready
                        to jump in when you're positioned right.
                      </span>
                    </li>
                  </ul>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Whether you DIY with the Kit or become a Certified Borrower,
                    the goal is the same: get you approved faster, on better
                    terms, with far less frustration.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    I'm here to keep doing what I've done since day one—helping
                    serious small commercial investors and business owners turn
                    great opportunities into closed deals.
                  </p>
                  <p className="text-lg text-gray-700 font-medium leading-relaxed italic">
                    As a matter of principle, K2 receives zero compensation
                    until after a transaction closes. If we can't fund it, we
                    haven't solved the problem—and we haven't earned a fee.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    If that sounds like the kind of support you've been looking
                    for, welcome aboard.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-200">
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                  <Link href="/workbook">Explore the Financing Success Kit</Link>
                </Button>
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/membership">Get Started with Our Funding System</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="p-8">
                <div
                  className="mb-5 aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${ABOUT_EXPERTISE_IMAGE}')` }}
                  aria-label="Experts collaborating around financial reports"
                />
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expertise
                </h3>
                <p className="text-gray-600">
                  All content is based on real lending experience and industry
                  best practices, not theory.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <div
                  className="mb-5 aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${ABOUT_HONESTY_IMAGE}')` }}
                  aria-label="Business document review"
                />
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Honesty
                </h3>
                <p className="text-gray-600">
                  We tell you what you need to know, not what you want to hear.
                  No false promises.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-8">
                <div
                  className="mb-5 aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${ABOUT_ACCESS_IMAGE}')` }}
                  aria-label="Accessible digital learning workspace"
                />
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Accessibility
                </h3>
                <p className="text-gray-600">
                  Complex concepts explained clearly. No jargon, just
                  straightforward guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-xl p-8 md:p-12 border-2 border-slate-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Who This Is For
            </h2>
            <ul className="space-y-4">
              {[
                'Entrepreneurs preparing to seek business financing',
                'Business owners who have been rejected and want to understand why',
                'Borrowers looking to improve their terms and qualify for better rates',
                'Anyone who wants to understand the lending process before applying',
                'Small business owners navigating SBA loans or commercial lending',
              ].map((item) => (
                <li key={item} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Begin your financing education journey today with our proven
            resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6"
            >
              <Link href="/content">Explore Free Content</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-white hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/workbook">Get the Workbook</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
