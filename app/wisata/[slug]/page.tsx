import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGoogleMapsUrl,
  getPublishedWisataBySlug,
} from "@/lib/supabase/wisata";
import ShareButton from "@/components/share-button";

type WisataDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WisataDetailPage({
  params,
}: WisataDetailPageProps) {
  const { slug } = await params;
  const wisata = await getPublishedWisataBySlug(slug);

  if (!wisata) {
    notFound();
  }

  const googleMapsUrl = getGoogleMapsUrl(wisata.latitude, wisata.longitude);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const shareUrl = `${siteUrl}/wisata/${wisata.slug}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <Link
          href="/wisata"
          className="text-sm font-semibold text-sky-700 hover:text-sky-900"
        >
          ← Kembali ke daftar wisata
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {wisata.image_url ? (
            <div className="relative h-72 w-full md:h-96">
              <Image
                src={wisata.image_url}
                alt={wisata.name}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="h-72 w-full bg-linear-to-br from-sky-100 via-cyan-50 to-emerald-100 md:h-96" />
          )}

          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Wisata Desa Labuhan Kuris
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {wisata.name}
            </h1>

            {/* {wisata.location ? (
              <p className="mt-3 text-sm font-medium text-slate-600">
                Lokasi: {wisata.location}
              </p>
            ) : null} */}

            {googleMapsUrl ? (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-semibold text-sky-700 hover:text-sky-900"
              >
                Lihat di Google Maps →
              </a>
            ) : null}

            <p className="mt-6 text-base leading-8 text-slate-700">
              {wisata.short_description ?? "Belum ada deskripsi detail."}
            </p>

            <div className="mt-4">
              <ShareButton
                title={wisata.name}
                text={`Lihat destinasi wisata ${wisata.name} di Desa Labuhan Kuris.`}
                url={shareUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
