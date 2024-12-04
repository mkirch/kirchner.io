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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { allArticles } from 'content-collections';
import { allPosts } from 'content-collections';
import { Menu, Search, X } from 'lucide-react';
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

        <nav className="hidden items-center gap-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Button variant="ghost" asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
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
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-2 py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-md px-2 py-1 hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Button
              variant="outline"
              className="mt-2 w-full justify-start text-left font-normal"
              onClick={() => {
                setIsSearchOpen(true);
                setOpen(false);
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Search...
            </Button>
          </nav>
        </div>
      )}

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
