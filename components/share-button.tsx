"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  text?: string;
  url: string;
};

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // User bisa saja membatalkan share sheet; itu bukan error besar.
      console.error("Gagal membagikan halaman:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex cursor-pointer items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
    >
      {copied ? "Link disalin" : "Bagikan"}
    </button>
  );
}
