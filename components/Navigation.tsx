'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut, hasMembership } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false);
  const [mobileContentOpen, setMobileContentOpen] = useState(false);
  const contentDropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contentDropdownRef.current && !contentDropdownRef.current.contains(e.target as Node)) {
        setContentDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/workbook', label: 'Workbook' },
    { href: '/membership', label: 'Membership' },
    ...(user ? [{ href: '/prepcoach', label: 'PrepCoach' }] : []),
    { href: '/Resource', label: 'Resource' },
  ];

  const contentSubLinks = [
    // { href: '/content?tab=loan-programs', label: 'Loan Programs' },
    // { href: '/content?tab=lender-types', label: 'Lender Types' },
    // { href: '/content?tab=property-types', label: 'Property Types' },
    { href: '/content?tab=videos', label: 'Videos' },
    { href: '/content?tab=articles', label: 'Articles' },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Brand left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/brand.png"
                alt="Brand"
                width={250}
                height={126}
                className="object-contain"
              />
            </Link>
          </div>

          {/* User menu right */}
          <div className="flex items-center justify-end space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="user menu">
                    <User className="h-5 w-5 text-gray-900" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {hasMembership && (
                    <DropdownMenuItem asChild>
                      <Link href="/membership">Membership</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/membership/preferred-lender">Lender Network</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/membership/preferred-vendor">Vendor Network</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login" className="text-gray-900">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation bar below header - centered (green) */}
      <nav className="border-t border-primary bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-14">
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                // Insert the Free Content dropdown after About
                if (link.href === '/workbook') {
                  return (
                    <div key="content-dropdown" className="flex items-center space-x-8">
                      {/* Free Content dropdown */}
                      <div ref={contentDropdownRef} className="relative">
                        <button
                          onClick={() => setContentDropdownOpen(!contentDropdownOpen)}
                          className={cn(
                            'inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-90',
                            pathname.startsWith('/content') ? 'text-primary-foreground' : 'text-primary-foreground/90'
                          )}
                        >
                          Free Content
                          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', contentDropdownOpen && 'rotate-180')} />
                        </button>
                        {contentDropdownOpen && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-lg border border-slate-200 bg-white py-2 shadow-xl z-50">
                            <Link
                              href="/content"
                              onClick={() => setContentDropdownOpen(false)}
                              className="block px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-slate-50 transition-colors"
                            >
                              All Content
                            </Link>
                            <div className="my-1 h-px bg-slate-100" />
                            {contentSubLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setContentDropdownOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50 hover:text-gray-900 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Workbook link */}
                      <Link
                        href={link.href}
                        className={cn(
                          'text-sm font-medium transition-colors hover:opacity-90',
                          pathname === link.href ? 'text-primary-foreground' : 'text-primary-foreground/90'
                        )}
                      >
                        {link.label}
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:opacity-90',
                      pathname === link.href ? 'text-primary-foreground' : 'text-primary-foreground/90'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => {
              // Insert Free Content expandable section before Workbook
              if (link.href === '/workbook') {
                return (
                  <div key="mobile-content-group">
                    {/* Free Content toggle */}
                    <button
                      onClick={() => setMobileContentOpen(!mobileContentOpen)}
                      className={cn(
                        'flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium',
                        pathname.startsWith('/content')
                          ? 'bg-primary/80 text-primary-foreground'
                          : 'text-primary-foreground/90 hover:bg-primary/90'
                      )}
                    >
                      Free Content
                      <ChevronDown className={cn('h-4 w-4 transition-transform', mobileContentOpen && 'rotate-180')} />
                    </button>
                    {mobileContentOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        <Link
                          href="/content"
                          className="block px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary/90"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Content
                        </Link>
                        {contentSubLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-3 py-1.5 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary/90"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    {/* Workbook link */}
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-3 py-2 rounded-md text-base font-medium',
                        pathname === link.href
                          ? 'bg-primary/80 text-primary-foreground'
                          : 'text-primary-foreground/90 hover:bg-primary/90'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    pathname === link.href
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'text-primary-foreground/90 hover:bg-primary/90'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {hasMembership && (
                  <Link
                    href="/membership"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Membership
                  </Link>
                )}
                <Link
                  href="/membership/preferred-lender"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Lender Network
                </Link>
                <Link
                  href="/membership/preferred-vendor"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vendor Network
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground bg-primary/80"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
