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
      <div className="w-full py-8 lg:py-12 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className="font-fraktur text-4xl md:text-6xl text-center mb-4">
            Compendium
          </h1>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            A curated collection of resources on web development, technology,
            and life.
          </p>
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allArticles.map((post) => (
              <Link
                href={`/compendium/${post._meta.path}`}
                className="no-underline"
                key={post.title}
              >
                <Card className="h-full transition-all hover:bg-accent hover:shadow-md">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle
                      className="text-lg font-semibold truncate"
                      title={post.title}
                    >
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p
                      className="text-sm text-muted-foreground truncate"
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
