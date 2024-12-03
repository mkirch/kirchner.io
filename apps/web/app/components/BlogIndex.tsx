'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@repo/design-system/lib/utils';
import type { Blog, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { allPosts } from 'content-collections';
import { Grid2X2, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const BlogIndex = () => {
  const jsonLd: WithContext<Blog> = {
    '@type': 'Blog',
    '@context': 'https://schema.org',
  };

  const [isGridView, setIsGridView] = useState(true);

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="w-full bg-background py-8 lg:py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="mb-4 text-center font-fraktur text-4xl md:text-6xl">
            Blog
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground">
            Thoughts, ideas, and opinions.
          </p>
          <Separator className="mb-8" />
          <div className="mb-6 flex justify-end">
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
            {allPosts.map((post) => (
              <Link
                href={`/blog/${post._meta.path}`}
                className="no-underline"
                key={post.title}
              >
                <Card
                  className={cn(
                    'h-full transition-all hover:bg-accent hover:shadow-md',
                    !isGridView && 'flex flex-row items-center'
                  )}
                >
                  {post.image && (
                    <div
                      className={cn(
                        'relative h-48 w-full',
                        !isGridView && 'h-full w-1/3'
                      )}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="rounded-t-lg object-cover"
                        blurDataURL={post.imageBlur ?? undefined}
                        placeholder="blur"
                      />
                    </div>
                  )}
                  <div className={cn('flex flex-col', !isGridView && 'flex-1')}>
                    <CardHeader className="p-4">
                      <CardTitle className="truncate font-semibold text-lg">
                        {post.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="truncate text-muted-foreground text-sm">
                        {post.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
