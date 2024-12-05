import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { env } from '@repo/env';
import { type Article, JsonLd, type WithContext } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import { allArticles } from 'content-collections';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { CompendiumSidebar } from '../../components/CompendiumSidebar';
import { Mdx } from '../../components/Mdx';

type ArticleProperties = {
  readonly params: Promise<{
    slug: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: ArticleProperties): Promise<Metadata> => {
  const { slug } = await params;
  const page = allArticles.find(({ _meta }) => _meta.path === slug);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: page.title,
    description: page.description,
    image: page.image ?? undefined,
  });
};

export const generateStaticParams = (): { slug: string }[] =>
  allArticles.map((page) => ({
    slug: page._meta.path,
  }));

const CompendiumArticle = async ({ params }: ArticleProperties) => {
  const { slug } = await params;
  const page = allArticles.find(({ _meta }) => _meta.path === slug);

  if (!page) {
    notFound();
  }

  const jsonLd: WithContext<Article> = {
    '@type': 'Article',
    '@context': 'https://schema.org',
    datePublished: page.date.toISOString(),
    description: page.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(
        `/compendium/${slug}`,
        env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ).toString(),
    },
    headline: page.title,
    image: page.image ?? undefined,
    dateModified: page.date.toISOString(),
    author: page.authors?.at(0),
    isAccessibleForFree: true,
  };

  return (
    <>
      <JsonLd code={jsonLd} />
      <div className="container mx-auto max-w-full overflow-x-hidden xl:max-w-7xl">
        <Link
          className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
          href="/compendium"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Compendium
        </Link>
        <h1 className="font-extrabold text-4xl tracking-tight lg:text-5xl">
          <Balancer>{page.title}</Balancer>
        </h1>
        <p className="mt-16 flex w-fit flex-col items-start leading-7 [&:not(:first-child)]:mt-6">
          <Balancer>{page.description}</Balancer>
        </p>
        {page.image && page.imageBlur ? (
          <div className="w-full max-w-full overflow-hidden rounded-xl p-16">
            <Image
              src={page.image}
              width={1920}
              height={1080}
              alt=""
              className="h-auto w-full object-cover"
              priority
              blurDataURL={page.imageBlur ?? undefined}
              placeholder="blur"
            />
          </div>
        ) : undefined}
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row">
          <div className="w-full overflow-x-auto sm:flex-1">
            <Mdx code={page.body} />
          </div>
          <div className="sticky top-24 hidden w-full shrink-0 md:block md:w-auto">
            <CompendiumSidebar
              content={page.content}
              readingTime={page.readingTime}
              tags={page.tags ?? undefined}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompendiumArticle;
