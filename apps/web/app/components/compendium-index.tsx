'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/ui/command';
import { Separator } from '@repo/design-system/components/ui/separator';
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
      <div className="w-full bg-background py-8 lg:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="mb-4 text-center font-fraktur text-4xl md:text-6xl">
            Compendium
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            A curated collection of resources on web development, technology,
            and life.
          </p>
          <Separator className="mb-8" />
          <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="w-full sm:w-2/3">
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
            <div className="flex gap-2">
              <Button
                variant={isGridView ? 'secondary' : 'outline'}
                size="icon"
                onClick={() => setIsGridView(true)}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={isGridView ? 'outline' : 'secondary'}
                size="icon"
                onClick={() => setIsGridView(false)}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div
            className={cn(
              isGridView
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
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
                  <CardHeader className={cn('p-4', !isGridView && 'flex-1')}>
                    <CardTitle className="truncate font-semibold text-lg">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className={cn('p-4 pt-0', !isGridView && 'flex-1')}
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
