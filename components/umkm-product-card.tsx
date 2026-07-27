import Image from "next/image";

type UmkmProductCardProps = {
  name: string;
  description: string | null;
  producer: string | null;
  price: string | null;
  measure: string | null;
  imageUrl: string | null;
  whatsappUrl: string | null;
  priority?: boolean;
};

export default function UmkmProductCard({
  name,
  description,
  producer,
  price,
  measure,
  imageUrl,
  whatsappUrl,
  priority = false,
}: UmkmProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-amber-100 via-orange-50 to-emerald-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-amber-800/60">
            Produk lokal
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {producer || "UMKM Labuhan Kuris"}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{name}</h2>
          </div>

          {price || measure ? (
            <div className="flex shrink-0 flex-col items-end gap-2">
              {price ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">
                  {price}
                </span>
              ) : null}
              {measure ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {measure}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {description ? (
          <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}

        <div className="mt-5 border-t border-slate-100 pt-4">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
              >
                <path d="M12.04 2a9.84 9.84 0 0 0-8.4 14.96L2 22l5.2-1.62A9.96 9.96 0 1 0 12.04 2Zm0 17.96a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-3.08.96 1-3-.2-.3A7.9 7.9 0 1 1 12.04 19.96Zm4.4-5.92c-.24-.12-1.44-.7-1.66-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06a6.58 6.58 0 0 1-1.96-1.2 7.33 7.33 0 0 1-1.36-1.68c-.14-.24-.02-.38.1-.5l.36-.42c.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.56 4.08 3.6.56.24 1.02.4 1.36.5.58.18 1.1.16 1.5.1.46-.06 1.44-.58 1.64-1.16.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              Pesan Sekarang
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
            >
              WhatsApp belum tersedia
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
