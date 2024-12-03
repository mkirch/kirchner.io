import { Button } from '@/components/ui/button';
import { allPosts } from 'content-collections';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBookReader, FaInfo } from 'react-icons/fa';

export const Hero = () => (
  <div className="relative max-h-fit min-h-screen w-full overflow-hidden">
    <Image
      src="/blog/lamp.jpg"
      alt="Background wallpaper"
      fill
      className="object-cover object-center"
      priority
    />
    <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
    <div className="container relative z-10 mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <div>
          <Button variant="secondary" size="sm" className="gap-4" asChild>
            <Link href={`/blog/${allPosts[0].slug}`}>
              Read my latest post <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-center font-fraktur text-5xl text-foreground tracking-tighter md:text-7xl">
            Compendium Kirchnerianum
          </h1>
          <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl">
            A collection of thoughts, ideas, and resources by Michael Kirchner
            on technology, mathematics, AI research, business, and life.
          </p>
        </div>
        <div className="flex flex-row gap-3">
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
        </div>
      </div>
    </div>
  </div>
);
