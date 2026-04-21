import GalleryCard from '@/components/gallery-card';
import SectionHeader from '@/components/section-header';
import { galeriItems } from '@/data/galeri';

export default function GaleriPreviewSection() {
  return (
    <section id="galeri" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Galeri"
        title="Potret visual desa"
        href="/galeri"
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galeriItems.slice(0, 3).map((item) => (
          <GalleryCard
            key={item.title}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
