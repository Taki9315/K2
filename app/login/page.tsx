'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AUTH_SIDE_IMAGE =
  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1920&q=80";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white lg:grid lg:grid-cols-[75%_25%]">
      <section
        className="relative hidden min-h-[calc(100vh-13rem)] lg:flex items-center bg-neutral-800 px-16"
        style={{
          backgroundImage: `linear-gradient(rgba(23, 23, 23, 0.72), rgba(23, 23, 23, 0.72)), url('${AUTH_SIDE_IMAGE}')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-lg text-white">
          <p className="text-4xl font-semibold leading-tight">
            K2 Commercial Finance Investor &amp; Business Loans
          </p>
          <div className="mt-6 h-0.5 w-32 bg-emerald-400" />
          <p className="mt-6 text-base text-white/80">
            Access the investor portal to review performance, documents, and
            updates from the K2 Commercial Finance team.
          </p>
        </div>
      </section>

      <section className="relative min-h-[calc(100vh-13rem)] bg-white px-6 py-10 shadow-xl sm:px-8">
        <div className="absolute inset-x-0 top-8 z-10 flex justify-center">
          <div className="flex flex-col items-center">
            <Link href="/" className="inline-flex">
              <Image
                src="/assets/brand.jpg"
                alt="K2 Commercial Finance"
                width={160}
                height={48}
                className="h-auto w-60"
                priority
              />
            </Link>
            <p className="mt-3 text-center text-xs font-semibold tracking-[0.2em] text-neutral-500">
              INVESTOR PORTAL
            </p>
          </div>
        </div>

        <div className="flex min-h-[calc(100vh-13rem)] items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mt-8">
              <h1 className="text-center text-xl font-semibold text-neutral-900">
                Sign in to get started
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-neutral-600">
                  Username (case sensitive)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs text-neutral-600">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <Link
                    href="/contact"
                    className="text-xs text-neutral-500 hover:text-neutral-700"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-neutral-300 text-neutral-700"
                asChild
              >
                <Link href="/signup">Register</Link>
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
