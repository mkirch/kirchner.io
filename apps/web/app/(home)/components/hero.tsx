'use client';

import { Button } from '@/components/ui/button';
import { allPosts } from 'content-collections';
import { MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { FaMicroblog, FaPalette } from 'react-icons/fa';
import { HiCollection } from 'react-icons/hi';

const BackgroundImage = () => (
  <div className="absolute inset-0">
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
      className="absolute inset-0 bg-background/40 backdrop-blur-sm"
    />
  </div>
);

export const Hero = () => {
  const [viewportHeight, setViewportHeight] = useState('100vh');

  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight;
      const isDesktop = window.innerWidth >= 1024; // Assuming 1024px as the desktop breakpoint
      setViewportHeight(`${isDesktop ? Math.min(vh, 800) : vh}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);

    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden"
      style={{ height: viewportHeight, maxHeight: '100vh' }}
    >
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <BackgroundImage />
      </Suspense>

      <div className="container relative z-10 mx-auto py-2 sm:px-2 sm:py-4 md:px-4 lg:px-8 lg:py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            <Button variant="secondary" size="sm" className="gap-2" asChild>
              <Link href={`/blog/${allPosts[0].slug}`}>
                Latest post <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.2 }}
          >
            <h1 className="font-bold font-fraktur text-3xl text-foreground tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Michael Kirchner
            </h1>
            <p className="mx-auto text-muted-foreground text-sm sm:max-w-lg md:max-w-xl md:text-md lg:max-w-2xl lg:text-lg">
              Thoughts, creations, and a compendium of resources on technology,
              mathematics, AI, research, business, and life.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 0.3 }}
          >
            <Button size="sm" className="w-auto" variant="outline" asChild>
              <Link href="/blog" className="flex items-center">
                <span className="flex items-center justify-center">
                  <FaMicroblog className="h-4 w-4" />
                </span>
                <span className="flex-grow text-left">Blog</span>
              </Link>
            </Button>
            <Button size="sm" className="w-auto" variant="outline" asChild>
              <Link href="/compendium" className="flex items-center">
                <span className="flex items-center justify-center">
                  <HiCollection className="h-4 w-4" />
                </span>
                <span className="flex-grow text-left">Compendium</span>
              </Link>
            </Button>
            <Button size="sm" className="w-auto" variant="outline" asChild>
              <Link href="/art" className="flex items-center">
                <span className="flex items-center justify-center">
                  <FaPalette className="h-4 w-4" />
                </span>
                <span className="flex-grow text-left">Art</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
