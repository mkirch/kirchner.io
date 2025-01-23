'use client';

import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Post = {
  slug: string;
  title: string;
  description: string;
};

type Article = {
  slug: string;
  title: string;
  description: string;
};

export const Header = () => {
  const navigationItems = [
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Compendium', href: '/compendium' },
    { title: 'Art', href: '/art' },
  ];
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
        <Link
          href="/"
          className="font-fraktur text-2xl md:text-3xl lg:text-4xl"
        >
          Kirchner.io
        </Link>

        <div className="flex items-center sm:gap-1 md:gap-2">
          <nav className="flex flex-wrap items-center sm:px-1">
            {navigationItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                asChild
                className="min-h-8 px-1 md:px-4"
              >
                <Link className="font-mono text-sm md:text-md" href={item.href}>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>

          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 text-foreground md:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
            <Search className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
