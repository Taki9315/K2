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
import { User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { user, signOut, hasMembership } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/content', label: 'Free Content' },
    { href: '/workbook', label: 'Workbook' },
    { href: '/membership', label: 'Membership' },
    { href: '/contact', label: 'Contact' },
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
                      <Link href="/member-area">Member Area</Link>
                    </DropdownMenuItem>
                  )}
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
              {navLinks.map((link) => (
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
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary bg-primary">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
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
            ))}
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
                    href="/member-area"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary-foreground/90 hover:bg-primary/90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Member Area
                  </Link>
                )}
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
