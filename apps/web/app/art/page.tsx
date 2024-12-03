import Gallery from '@/app/components/Gallery';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="mb-8 font-bold text-4xl">
        Michael Kirchner's Photography
      </h1>
      <Gallery />
    </main>
  );
}
