import Link from 'next/link';
import AgricultureCard from '@/components/agriculture-card';
import { pertanianItems } from '@/data/pertanian';

export default function PertanianPreviewSection() {
  return (
    <section id="pertanian" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-4xl bg-slate-900 px-6 py-10 text-white md:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Potensi Pertanian
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Dari padi hingga semangka dan jagung
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              Selain wisata, Desa Labuhan Kuris juga memiliki kekuatan pada sektor pertanian yang menjamin ketahanan pangan dan berpotensi besar untuk menarik perhatian pengunjung, investasi, maupun mitra pengembangan desa.
            </p>
          </div>

          <div className="grid gap-4">
            {pertanianItems.map((item) => (
              <AgricultureCard
                key={item.title}
                title={item.title}
                description={item.description}
                dark
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/pertanian"
            className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Lihat selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
