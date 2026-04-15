import PageHero from '@/components/page-hero';
import { pertanianItems } from '@/data/pertanian';

export default function PertanianPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PageHero
        eyebrow="Pertanian"
        title="Pertanian Desa Labuhan Kuris"
        description="Desa Labuhan Kuris memiliki potensi pertanian yang kuat, terutama pada komoditas padi, semangka, dan jagung, yang menjadi bagian penting dari kehidupan dan ekonomi masyarakat."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {pertanianItems.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
