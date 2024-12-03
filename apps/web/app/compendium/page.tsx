import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Separator } from '@repo/design-system/components/ui/separator';
import type { Article, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import { allArticles } from 'content-collections';
import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Compendium';
const description = 'Information found relevant to the web, life, and tech.';

export const metadata: Metadata = createMetadata({ title, description });

const CompendiumIndex = () => {
  const jsonLd: WithContext<Article> = {
    '@type': 'Article',
    '@context': 'https://schema.org',
  };

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allArticles.map((post) => (
              <Link
                href={`/compendium/${post._meta.path}`}
                className="no-underline"
                key={post.title}
              >
                <Card className="h-full transition-all hover:bg-accent hover:shadow-md">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle
                      className="truncate font-semibold text-lg"
                      title={post.title}
                    >
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p
                      className="truncate text-muted-foreground text-sm"
                      title={post.description}
                    >
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
