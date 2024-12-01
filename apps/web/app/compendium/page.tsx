import { cn } from '@repo/design-system/lib/utils';
import type { Article, WithContext } from '@repo/seo/json-ld';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import { allArticles } from 'content-collections';
import type { Metadata } from 'next';
import Image from 'next/image';
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
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
              Welcome to the Compendium
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {allArticles.map((post, index) => (
              <Link
                href={`/compendium/${post._meta.path}`}
                className={cn(
                  'flex cursor-pointer flex-col gap-4 hover:opacity-75',
                  !index && 'md:col-span-2'
                )}
                key={post.title}
              >
                {post.image && post.imageBlur ? (
                  <Image
                    src={post.image ?? ''}
                    alt={post.title}
                    width={1336}
                    height={751}
                    blurDataURL={post.imageBlur ?? undefined}
                    placeholder="blur"
                  />
                ) : undefined}
                <div className="flex flex-col gap-2">
                  <h3 className="max-w-3xl text-4xl tracking-tight">
                    {post.title ?? ''}
                  </h3>
                  <p className="max-w-3xl text-base text-muted-foreground">
                    {post.description ?? ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompendiumIndex;
