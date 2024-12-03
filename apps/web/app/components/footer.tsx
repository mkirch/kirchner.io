'use client';

import { Button } from '@/components/ui/button';
import {} from '@/components/ui/navigation-menu';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Compendium', href: '/compendium' },
  ];

  const socialLinks = [
    {
      icon: FaTwitter,
      href: 'https://twitter.com/kirchnerianum',
      label: 'Twitter',
    },
    { icon: FaGithub, href: 'https://github.com/mkirch', label: 'GitHub' },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/michaelrkirchner',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/michaelrkirchner',
      label: 'Instagram',
    },
  ];

  const [isOpen, setOpen] = useState(false);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              href="/"
              className="font-fraktur text-3xl text-primary transition-colors hover:text-primary/90"
            >
              Kirchner.io
            </Link>
            <p className="max-w-xs text-muted-foreground text-sm">
              Exploring technology, mathematics, AI research, business, and life
              through the eyes of Michael Kirchner.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav className="hidden md:block">
            <h3 className="mb-4 font-semibold text-lg">Navigation</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h3 className="mb-4 font-semibold text-lg">Newsletter</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated with the latest insights and resources.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow rounded-md border bg-background px-3 py-2 text-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setOpen(!isOpen)}
              className="w-full"
            >
              {isOpen ? (
                <X className="mr-2 h-5 w-5" />
              ) : (
                <Menu className="mr-2 h-5 w-5" />
              )}
              Menu
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} kirchner.io. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
              {/* biome-ignore lint/nursery/useConsistentCurlyBraces: <explanation> */}
            </Link>{' '}
            |
            <Link href="/terms" className="ml-2 hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
