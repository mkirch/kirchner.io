import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';
import { sqip } from 'sqip';
import type { SqipResult } from 'sqip';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: 'catppuccin-mocha',
    dark: 'catppuccin-mocha',
  },
};

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    image: z.string(),
    authors: z.array(z.string()),
    tags: z.array(z.string()),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    const blur = await context.cache(page._meta.path, async () =>
      sqip({
        input: `./public/${page.image ?? ''}`,
        plugins: [
          'sqip-plugin-primitive',
          'sqip-plugin-svgo',
          'sqip-plugin-data-uri',
        ],
      })
    );

    const result: SqipResult | null = Array.isArray(blur) ? blur[0] : blur;

    return {
      ...page,
      body,
      date: page.date ? new Date(page.date) : new Date(),
      slug: page._meta.path,
      readingTime: page.content ? readingTime(page.content).text : '0',
      image: page.image ?? null,
      imageBlur: result?.metadata.dataURIBase64
        ? (result.metadata.dataURIBase64 as string)
        : null,
    };
  },
});

const articles = defineCollection({
  name: 'articles',
  directory: 'content/compendium',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    authors: z.array(z.string()).optional().nullable(),
    tags: z.array(z.string()).optional().nullable(),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    let blur: SqipResult | SqipResult[] | null = null;

    if (page.image) {
      blur = await context.cache(page._meta.path, async () =>
        sqip({
          input: `./public/${page.image ?? ''}`,
          plugins: [
            'sqip-plugin-primitive',
            'sqip-plugin-svgo',
            'sqip-plugin-data-uri',
          ],
        })
      );
    }

    const result: SqipResult | null = Array.isArray(blur) ? blur[0] : blur;

    return {
      ...page,
      body,
      date: page.date ? new Date(page.date) : new Date(),
      slug: page._meta.path,
      readingTime: page.content ? readingTime(page.content).text : '0',
      image: page.image ?? null,
      icon: page.icon ?? null,
      imageBlur: result?.metadata.dataURIBase64
        ? (result.metadata.dataURIBase64 as string)
        : null,
    };
  },
});

const legals = defineCollection({
  name: 'legal',
  directory: 'content/legal',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
  }),
  transform: async (page, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      })
    );

    return {
      ...page,
      body,
      date: new Date(page.date),
      slug: page._meta.path,
      readingTime: readingTime(page.content).text,
    };
  },
});

export default defineConfig({
  collections: [posts, articles, legals],
});
