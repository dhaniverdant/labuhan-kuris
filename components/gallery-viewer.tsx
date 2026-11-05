"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryImage = {
  id: string;
  title: string;
  image: string;
};

export default function GalleryViewer({ items }: { items: GalleryImage[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  function open(index: number) {
    setActiveIndex(index);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  function navigate(direction: number) {
    setActiveIndex((index) => (index + direction + items.length) % items.length);
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <article key={item.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => open(index)}
              aria-label={`Perbesar foto: ${item.title}`}
              className="group relative block h-56 w-full cursor-zoom-in overflow-hidden focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-blue-600"
            >
              <Image src={item.image} alt={item.title} fill unoptimized className="object-cover transition duration-500 group-hover:scale-105" />
            </button>
            <p className="p-5 text-base text-slate-800">{item.title}</p>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Penampil foto galeri"
        aria-describedby="gallery-photo-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        className="fixed inset-0 m-auto max-h-[100dvh] w-full max-w-6xl overflow-y-auto border-0 bg-transparent p-4 text-white outline-none backdrop:bg-black/90 sm:p-6"
      >
        {activeItem && (
          <div className="rounded-2xl bg-slate-950 p-3 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-300">{activeIndex + 1} / {items.length}</span>
              <button type="button" autoFocus onClick={() => dialogRef.current?.close()} className="min-h-11 rounded-lg px-4 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
                Tutup <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="relative h-[60dvh] sm:h-[70dvh]">
              <Image key={activeItem.id} src={activeItem.image} alt={activeItem.title} fill unoptimized sizes="100vw" className="object-contain" />
            </div>
            <p id="gallery-photo-title" aria-live="polite" className="mt-4 text-center text-base">{activeItem.title}</p>
            {items.length > 1 && (
              <div className="mt-4 flex justify-between gap-4">
                <button type="button" onClick={() => navigate(-1)} className="min-h-11 rounded-xl border border-white/30 px-4 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
                  <span aria-hidden="true">← </span>Sebelumnya
                </button>
                <button type="button" onClick={() => navigate(1)} className="min-h-11 rounded-xl border border-white/30 px-4 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
                  Berikutnya<span aria-hidden="true"> →</span>
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
