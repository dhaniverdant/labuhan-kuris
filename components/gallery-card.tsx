import Image from "next/image";
import Link from "next/link";

type GalleryCardProps = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

export default function GalleryCard({
  title,
  description,
  image,
  href = "/galeri",
}: GalleryCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block text-sm font-semibold text-sky-700"
        >
          Baca Detail →
        </Link>
      </div>
    </article>
  );
}
