'use client';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { allArticles } from 'content-collections';
import { allPosts } from 'content-collections';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Compendium', href: '/compendium' },
    { title: 'Art', href: '/art' },
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-4">
        <div className="relative flex items-center justify-between">
          <div className="flex-1 font-mono text-muted-foreground text-xs">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-1"
                        asChild
                      >
                        <Link
                          href={item.href}
                          className="font-mono text-muted-foreground text-sm hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      </Button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              href="/"
              className="font-fraktur text-3xl text-primary transition-colors hover:text-primary/90"
            >
              Kirchner.io
            </Link>
          </div>

          <nav className="hidden flex-1 items-center justify-end gap-6 font-mono text-xs md:flex">
            <Link href="/" className="hover:text-primary">
              © {new Date().getFullYear()} kirchner.io
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>

        {isOpen && (
          <div className="mt-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-md px-2 py-1 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command>
          <CommandInput placeholder="Search across blog and compendium..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Site">
              {navigationItems.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => {
                    router.push(item.href);
                    setIsSearchOpen(false);
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Blog Posts">
              {allPosts.map((post) => (
                <CommandItem
                  key={post.title}
                  onSelect={() => {
                    router.push(`/blog/${post._meta.path}`);
                    setIsSearchOpen(false);
                  }}
                >
                  {post.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Compendium Articles">
              {allArticles.map((article) => (
                <CommandItem
                  key={article.title}
                  onSelect={() => {
                    router.push(`/compendium/${article._meta.path}`);
                    setIsSearchOpen(false);
                  }}
                >
                  {article.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </footer>
  );
};
