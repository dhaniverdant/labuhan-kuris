import PageHero from "@/components/page-hero";
import AgricultureCard from "@/components/agriculture-card";
import { pertanianItems } from "@/data/pertanian";

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
            <AgricultureCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
