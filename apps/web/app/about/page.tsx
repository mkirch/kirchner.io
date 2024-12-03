import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

const AboutPage = () => (
  <div className="container px-4 py-16 md:px-6">
    <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_400px]">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl tracking-tighter sm:text-5xl xl:text-6xl/none">
          About Michael Kirchner
        </h1>
        <div className="flex items-center gap-4">
          <Image
            src="/general/avatar.png"
            alt="Michael Kirchner"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="font-bold text-2xl">Michael Kirchner</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Artificial Intelligence Research Scientist
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="mailto:michael@kirchner.io">
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon">
            <Link href="https://twitter.com/kirchnerianum">
              <SiX className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon">
            <Link href="https://www.linkedin.com/in/michaelrkirchner">
              <SiLinkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="icon">
            <Link href="https://github.com/mkirch">
              <SiGithub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-2 font-bold text-xl">
              Michael Kirchner is an AI Research Scientist
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              He trains large models to solve difficult problems and has degrees
              in Mathematics and Finance from The University of Iowa. He
              previously worked as a Quantitative Researcher at a high-frequency
              trading firm, and now works as a data scientist in a large
              consulting firm, where he builds custom AI solutions for clients
              of all sizes and industries.
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              His research in AI includes multimodal models, reinforcement
              learning, time-series, knowledge graphs, and the intersection of
              AI and philosophy.
            </p>
          </CardContent>
        </Card>
        <Tabs defaultValue="kirchnerianum" className="w-full">
          <TabsList>
            <TabsTrigger value="kirchnerianum">Kirchnerianum</TabsTrigger>
            <TabsTrigger value="past-present">Past & Present</TabsTrigger>
            <TabsTrigger value="museum">The Museum</TabsTrigger>
            <TabsTrigger value="kircher">Athanasius Kircher</TabsTrigger>
          </TabsList>
          <TabsContent value="kirchnerianum">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <h3 className="mb-2 font-bold text-xl">
                The Origin of Kirchnerianum
              </h3>
              <p>
                The name of this blog, Kirchnerianum, is a reference to the
                <Link
                  href="https://en.wikipedia.org/wiki/Kircherian_Museum"
                  className="text-blue-500 hover:underline"
                >
                  Kircherian Museum
                </Link>
                , a 17th-century knowledge repository curated by Jesuit polymath
                <Link
                  href="https://en.wikipedia.org/wiki/Athanasius_Kircher"
                  className="text-blue-500 hover:underline"
                >
                  Athanasius Kircher
                </Link>
                .
              </p>
              <p className="mt-2">
                The Kircherian is considered to be the first museum in the
                world.
              </p>
              <p className="mt-2">
                The museum's expansive collection began in 1651 following
                Alfonso Donnini's donation of his
                <Link
                  href="https://en.wikipedia.org/wiki/Cabinet_of_curiosities"
                  className="text-blue-500 hover:underline"
                >
                  "Cabinet of Curiosities" or "Wunderkammer"
                </Link>
                . Kircher developed this gift into what became the Kircherian, a
                widely-visited spectacle of all varieties of science, art,
                archaeology, and technology.
              </p>
              <p className="mt-2">
                Kircher's work was an early intersection between cutting-edge
                science and ancient philosophy, and the collection reflects his
                pursuit of knowledge that defies traditional categorization.
              </p>
              <p className="mt-2">
                This site is meant to be an unbounded collection of intellectual
                curiosities. My digital Wunderkammer.
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="past-present">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <h3 className="mb-2 font-bold text-xl">
                Using the Past to Understand the Present
              </h3>
              <p>
                Kircher's ambition to span disciplines came during a time in
                European history that saw a remarkable emergence of
                interdisciplinary inquiry. The boundaries between different
                fields of study were not yet strictly defined, and scholars
                aimed for a more holistic understanding of both the natural and
                cultural world.
              </p>
              <p className="mt-2">
                I find many parallels to the state of AI research today. The
                field is still in its infancy, and it seems the boundaries
                between different subfields are not yet clearly defined. Even
                its relation and applicability to other major fields of science
                are still being worked out.
              </p>
              <p className="mt-2">
                Some of the most exciting research is happening at the
                intersection of different disciplines, and the most promising
                models are those that can integrate knowledge from multiple
                domains.
              </p>
              <p className="mt-2">
                The ideas and problems grappled with by early scientists and
                philosophers can provide much insight into the most difficult
                questions we face today.
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="museum">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <h3 className="mb-2 font-bold text-xl">The Kircherian Museum</h3>
              <Image
                src="/general/kircherianum_musaeum.jpg"
                alt="Kircherian Museum"
                width={600}
                height={400}
                className="my-4 rounded-lg"
              />
              <p>
                The Kircherian Museum as it appeared at the Roman College. This
                intricate depiction comes from "Turris Babel" published in
                Amsterdam in 1679.
              </p>
              <p className="mt-2">
                Filled with artifacts, manuscripts, scientific instruments, and
                natural specimens, the museum functioned as a meeting point for
                scholars, scientists, and intellectuals of the time.
              </p>
              <Image
                src="/general/kircherianum_cover.jpg"
                alt="Musaeum Kirchnerianum"
                width={600}
                height={400}
                className="my-4 rounded-lg"
              />
              <p>
                <em>Filippo Bonanni's "Musaeum Kircherianum", 1709</em>
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="kircher">
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <h3 className="mb-2 font-bold text-xl">Athanasius Kircher</h3>
              <Image
                src="/general/athanasius_kircher.jpg"
                alt="Athanasius Kircher"
                width={600}
                height={400}
                className="my-4 rounded-lg"
              />
              <p>
                <em>Athanasius Kircher, "Master of a Hundred Arts"</em>
              </p>
              <p>
                <em>
                  Taken from his seminal work,{' '}
                  <Link
                    href="https://web.archive.org/web/20160302000705/http://ouhos.org/2011/09/14/athanasius-kircher-mundus-subterraneus-1665"
                    className="text-blue-500 hover:underline"
                  >
                    Mundus Subterraneus
                  </Link>
                  (1664)
                </em>
              </p>
              <p className="mt-2">
                Kircher led a life dedicated to the pursuit of scientific and
                arcane knowledge across domains. It is difficult to name in
                brief the fields he demonstrated expertise in. While a professor
                of mathematics and physics at the Roman College (now the
                <Link
                  href="https://unigre.it/en/"
                  className="text-blue-500 hover:underline"
                >
                  Pontifical Gregorian University
                </Link>
                ), he was also making significant contributions to vastly
                different fields including linguistics, geology, and medicine.
              </p>
              <p className="mt-2">
                He was a pioneer in the fields of Egyptology with many attempts
                at decipherment of hieroglyphics and is credited with inventing
                the megaphone, the magic lantern, and the first cat piano.
              </p>
              <p className="mt-2">
                As a scholar of language, he published many works on
                linguistics, translation, and the origins of human
                communication.
              </p>
              <p className="mt-2">
                Kircher's work in physics spanned magnetism, acoustics, and the
                properties of light.
              </p>
              <p className="mt-2">
                As a student of antiquity, Kircher was intrigued by ancient
                knowledge and alchemy. His fascination with the esoteric was
                evident through his explorations in metaphysics, cryptography,
                hermetic philosophy, and symbology.
              </p>
              <blockquote className="mt-4 border-gray-300 border-l-4 pl-4 italic">
                "Nothing is more beautiful than to know all." - Athanasius
                Kircher
              </blockquote>
              <p className="mt-2">
                He knew this attainment was out of grasp, but found fulfillment
                in the pursuit. I'd like to think he would have enjoyed the
                internet.
              </p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <aside className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-bold text-xl">Recent Blog Posts</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-blue-500 hover:underline">
                  The Future of AI in Healthcare
                </Link>
                <p className="text-gray-500 text-sm">
                  An exploration of how AI is transforming the medical field...
                </p>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline">
                  Reinforcement Learning: A Primer
                </Link>
                <p className="text-gray-500 text-sm">
                  Understanding the basics of reinforcement learning and its
                  applications...
                </p>
              </li>
              <li>
                <Link href="#" className="text-blue-500 hover:underline">
                  The Ethics of AI: Navigating the Gray Areas
                </Link>
                <p className="text-gray-500 text-sm">
                  Discussing the ethical considerations in AI development and
                  deployment...
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  </div>
);

export default AboutPage;
