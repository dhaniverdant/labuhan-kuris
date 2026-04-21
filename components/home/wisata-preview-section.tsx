import SectionHeader from '@/components/section-header';
import TourismCard from '@/components/tourism-card';
import { wisataItems } from '@/data/wisata';

export default function WisataPreviewSection() {
  return (
    <section id="wisata" className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
      <SectionHeader
        eyebrow="Wisata Unggulan"
        title="Pesona bahari desa"
        href="/wisata"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {wisataItems.map((item) => (
          <TourismCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
