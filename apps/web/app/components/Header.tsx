'use client';

import { ModeToggle } from '@/components/mode-toggle';
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
import {} from '@/components/ui/navigation-menu';
import { allArticles } from 'content-collections';
import { allPosts } from 'content-collections';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const navigationItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Compendium', href: '/compendium' },
    { title: 'Art', href: '/art' },
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
    <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-fraktur text-3xl">
          Kirchner.io
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <nav className="flex items-center gap-2 md:gap-4">
            {navigationItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                asChild
                className="h-8 px-2 md:h-10 md:px-4"
              >
                <Link className="font-mono text-sm" href={item.href}>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>

          <ModeToggle />
          <Button
            variant="outline"
            className="h-10 w-10 p-0 md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-[200px] justify-start text-left font-normal md:flex"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
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
    </header>
  );
};
