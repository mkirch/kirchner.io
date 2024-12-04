import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Michael Kirchner | AI Research Scientist, Builder, Doer',
  description:
    'Michael Kirchner is an AI Research Scientist exploring the frontiers of artificial intelligence.',
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='nonzero'%3E%3Cpath d='M29 58.58l7.38-7.39A30.95 30.95 0 0 1 29 37.84a30.95 30.95 0 0 1-7.38 13.36l7.37 7.38zm1.4 1.41l.01.01h-2.84l-7.37-7.38A30.95 30.95 0 0 1 6.84 60H0v-1.02a28.9 28.9 0 0 0 18.79-7.78L0 32.41v-4.84L18.78 8.79A28.9 28.9 0 0 0 0 1.02V0h6.84a30.95 30.95 0 0 1 13.35 7.38L27.57 0h2.84l7.39 7.38A30.95 30.95 0 0 1 51.16 0H60v27.58-.01V60h-8.84a30.95 30.95 0 0 1-13.37-7.4L30.4 60zM29 1.41l-7.4 7.38A30.95 30.95 0 0 1 29 22.16 30.95 30.95 0 0 1 36.38 8.8L29 1.4zM58 1A28.9 28.9 0 0 0 39.2 8.8L58 27.58V1.02zm-20.2 9.2A28.9 28.9 0 0 0 30.02 29h26.56L37.8 10.21zM30.02 31a28.9 28.9 0 0 0 7.77 18.79l18.79-18.79H30.02zm9.18 20.2A28.9 28.9 0 0 0 58 59V32.4L39.2 51.19zm-19-1.4a28.9 28.9 0 0 0 7.78-18.8H1.41l18.8 18.8zm7.78-20.8A28.9 28.9 0 0 0 20.2 10.2L1.41 29h26.57z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="container mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-4 py-16">
        <div className="space-y-16">
          <section className="space-y-8 text-center">
            <Image
              src="/general/avatar.png"
              alt="Michael Kirchner"
              width={200}
              height={200}
              className="mx-auto rounded-full border-4 border-zinc-700 shadow-lg dark:border-zinc-300"
            />
            <div>
              <h1 className="mb-2 font-bold text-4xl">Michael Kirchner</h1>
              <p className="text-muted-foreground text-xl">
                AI Research Scientist
              </p>
            </div>
            <Card className="bg-opacity-75 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-lg">
                  Exploring artificial intelligence with a focus on multimodal
                  models and reinforcement learning. Bringing a
                  multidisciplinary approach to AI research, inspired by
                  historical polymaths.
                </p>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="bg-opacity-75 hover:bg-opacity-100"
              >
                <Link href="mailto:michael@kirchner.io">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="bg-opacity-75 hover:bg-opacity-100"
              >
                <Link href="https://twitter.com/kirchnerianum">
                  <SiX className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="bg-opacity-75 hover:bg-opacity-100"
              >
                <Link href="https://www.linkedin.com/in/michaelrkirchner">
                  <SiLinkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="icon"
                className="bg-opacity-75 hover:bg-opacity-100"
              >
                <Link href="https://github.com/mkirch">
                  <SiGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>
          </section>

          <Separator className="bg-gray-700 dark:bg-zinc-300" />

          <section className="space-y-8">
            <h2 className="text-center font-semibold text-2xl">
              Research Interests
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="bg-opacity-75 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-medium text-xl">
                    Multimodal AI Models
                  </h3>
                  <p>
                    Exploring the integration of various data types to create
                    more comprehensive AI systems.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-opacity-75 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-medium text-xl">
                    Reinforcement Learning
                  </h3>
                  <p>
                    Developing algorithms that learn optimal behaviors through
                    interaction with their environment.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-opacity-75 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-medium text-xl">AI Alignment</h3>
                  <p>
                    Investigating the aspects of AI development that consider
                    the more complex issues that come with AI, AGI, and beyond.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-opacity-75 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-medium text-xl">Knowledge Graphs</h3>
                  <p>
                    Structuring and connecting information to enhance AI
                    reasoning and knowledge representation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <Separator className="my-16 bg-gray-300" />

        <section className="text-center">
          <p className="text-muted-foreground">
            Inspired by the interdisciplinary approach of historical polymaths,
            striving to push the boundaries of AI research and its applications.
          </p>
        </section>
      </div>
    </div>
  );
}
