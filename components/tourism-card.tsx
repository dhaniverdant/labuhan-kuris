import Link from 'next/link';

type TourismCardProps = {
  title: string;
  description: string;
  href?: string;
};

export default function TourismCard({
  title,
  description,
  href = '/wisata',
}: TourismCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 h-44 rounded-2xl bg-linear-to-br from-sky-100 via-cyan-50 to-emerald-100" />

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <Link
        href={href}
        className="mt-5 inline-block text-sm font-semibold text-sky-700"
      >
        Baca Detail →
      </Link>
    </article>
  );
}
