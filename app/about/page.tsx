import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The business lending landscape is complex, opaque, and often
                confusing. Too many qualified borrowers are rejected simply
                because they didn't know how to prepare. Others get approved but
                at unfavorable terms they could have avoided.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're here to change that. Our platform provides practical,
                actionable education that helps borrowers understand what lenders
                look for, how to position themselves effectively, and how to
                navigate the financing process with confidence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                No hype. No guarantees. Just honest, expert guidance based on
                real lending experience.
              </p>
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
