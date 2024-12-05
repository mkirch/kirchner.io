'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { cn } from '@repo/design-system/lib/utils';
import type { Article, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { allArticles } from 'content-collections';
import { Grid2X2, List, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const CompendiumIndex = () => {
  const jsonLd: WithContext<Article> = {
    '@type': 'Article',
    '@context': 'https://schema.org',
  };

  const [isGridView, setIsGridView] = useState(true);
  const [open, setOpen] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full bg-background py-4 lg:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="mb-2 text-center font-fraktur text-3xl sm:text-4xl md:text-6xl">
            Compendium Kirchnerianum
          </h1>
          <p className="mx-auto mb-2 max-w-xl text-center text-muted-foreground text-xs md:text-md">
            A small, curated wiki of resources, ideas, and topics I find
            interesting.
          </p>
          <Separator className="mb-2" />
          <div className="mb-2 flex flex-row items-center justify-between gap-4 sm:flex-row">
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search articles...
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                  <CommandInput placeholder="Search articles..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Articles">
                      {allArticles.map((article) => (
                        <CommandItem
                          key={article.title}
                          onSelect={() => {
                            setOpen(false);
                            setFilteredArticles([article]);
                          }}
                        >
                          {article.title}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CommandDialog>
            </div>
            <Button
              variant={isGridView ? 'secondary' : 'outline'}
              size="icon"
              className="shrink-0 text-foreground"
              onClick={() => setIsGridView(true)}
            >
              <Grid2X2 className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
              <Grid2X2 className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant={isGridView ? 'outline' : 'secondary'}
              size="icon"
              className="shrink-0 text-foreground"
              onClick={() => setIsGridView(false)}
            >
              <List className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
              <List className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
          <div
            className={cn(
              isGridView
                ? 'grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-1'
            )}
          >
            {filteredArticles.map((post) => (
              <Link
                href={`/compendium/${post._meta.path}`}
                className="no-underline"
                key={post.title}
              >
                <Card
                  className={cn(
                    'h-full transition-all hover:bg-accent hover:shadow-md',
                    !isGridView && 'flex flex-row items-center'
                  )}
                >
                  <CardHeader
                    className={cn('px-4 pt-4 pb-1', !isGridView && 'flex-1')}
                  >
                    <CardTitle className="truncate font-extrabold text-xl">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className={cn('px-4 pt-1 pb-4', !isGridView && 'flex-1')}
                  >
                    <p className="truncate text-muted-foreground text-sm">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompendiumIndex;
