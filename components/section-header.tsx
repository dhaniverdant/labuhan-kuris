import Link from 'next/link';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  href: string;
  buttonLabel?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  href,
  buttonLabel = 'Selengkapnya',
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold">{title}</h2>
      </div>

      <Link
        href={href}
        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
