'use client';

import { Button } from '@/components/ui/button';
import { allPosts } from 'content-collections';
import { MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaBookReader, FaInfo } from 'react-icons/fa';

const BackgroundImage = () => (
  <>
    <Image
      src="/blog/lamp.jpg"
      alt="Background wallpaper"
      fill
      className="object-cover object-center"
      priority
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-background/20 backdrop-blur-sm"
    />
  </>
);

export const Hero = () => (
  <div className="relative max-h-fit min-h-screen w-full overflow-hidden">
    <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
      <BackgroundImage />
    </Suspense>

    <div className="container relative z-10 mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="secondary" size="sm" className="gap-4" asChild>
            <Link href={`/blog/${allPosts[0].slug}`}>
              Read my latest post <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="max-w-2xl text-center font-fraktur text-5xl text-foreground tracking-tighter md:text-7xl">
            Compendium Kirchnerianum
          </h1>
          <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl">
            A collection of thoughts, ideas, and resources by Michael Kirchner
            on technology, mathematics, AI research, business, and life.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="gap-4" variant="outline" asChild>
            <Link href="/blog">
              <FaBookReader className="h-4 w-4" /> Blog
            </Link>
          </Button>
          <Button size="lg" className="gap-4" asChild>
            <Link href="/compendium">
              <FaInfo className="h-4 w-4" /> Compendium
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </div>
);
