import Image from "next/image";

type GalleryCardProps = {
  title: string;
  image: string;
};

export default function GalleryCard({
  title,
  image,
}: GalleryCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-base text-slate-800">{title}</p>
      </div>
    </article>
  );
}
