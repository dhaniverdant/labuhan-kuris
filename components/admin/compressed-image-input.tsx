"use client";

import { useState } from "react";

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 1600;
const QUALITY = 0.78;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getResizedSize(width: number, height: number) {
  const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height, 1);

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gambar gagal dibaca oleh browser."));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Gambar gagal dikompres."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      QUALITY,
    );
  });
}

async function compressImage(file: File) {
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  if (isHeic) {
    throw new Error(
      "Format HEIC/HEIF belum didukung. Ubah dulu ke JPG, PNG, atau WebP.",
    );
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Format gambar harus JPG, PNG, atau WebP.");
  }

  const image = await loadImage(file);

  const { width, height } = getResizedSize(
    image.naturalWidth,
    image.naturalHeight,
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Browser tidak mendukung kompresi gambar.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  // Background putih agar PNG transparan tidak berubah hitam saat menjadi JPG.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas);
  const compressedFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";

  return {
    file: new File([blob], compressedFileName, {
      type: "image/jpeg",
      lastModified: Date.now(),
    }),
    width,
    height,
  };
}

export function CompressedImageInput() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    setStatus("");
    setError("");
    setPreviewUrl("");

    if (!file) return;

    try {
      setIsCompressing(true);
      setStatus("Mengompres gambar, mohon tunggu...");

      const result = await compressImage(file);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(result.file);
      input.files = dataTransfer.files;

      setPreviewUrl(URL.createObjectURL(result.file));
      setStatus(
        `Gambar berhasil dikompres dari ${formatFileSize(
          file.size,
        )} menjadi ${formatFileSize(result.file.size)}. Ukuran akhir ${
          result.width
        } × ${result.height}px.`,
      );
    } catch (compressError) {
      input.value = "";
      setStatus("");
      setError(
        compressError instanceof Error
          ? compressError.message
          : "Gambar gagal dikompres.",
      );
    } finally {
      setIsCompressing(false);
    }
  }

  return (
    <div className="md:col-span-2">
      <label htmlFor="image" className="mb-1 block text-sm font-medium">
        Gambar Wisata
      </label>

      <input
        id="image"
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={isCompressing}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100"
      />

      <p className="mt-1 text-xs text-black">
        Pilih gambar JPG, PNG, atau WebP. Gambar besar akan otomatis dikompres
        ke maksimal 1600px dengan kualitas sekitar 78% sebelum diupload.
      </p>

      {status ? (
        <p className="mt-2 text-xs text-emerald-700">{status}</p>
      ) : null}

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}

      {previewUrl ? (
        // Preview memakai blob URL lokal, jadi lebih aman memakai img biasa.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Preview gambar wisata"
          className="mt-4 aspect-video w-full rounded-2xl object-cover"
        />
      ) : null}
    </div>
  );
}
