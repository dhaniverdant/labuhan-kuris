"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB setelah auto-compress di browser.
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseCoordinate(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();

  if (!text) {
    return null;
  }

  const numberValue = Number(text);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getImageFile(formData: FormData) {
  const imageEntry = formData.get("image");

  if (imageEntry instanceof File && imageEntry.size > 0) {
    return imageEntry;
  }

  return null;
}

function getImageExtension(file: File) {
  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/png") {
    return "png";
  }

  return "jpg";
}

function validateImageFile(file: File) {
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

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      `Ukuran gambar masih terlalu besar (${formatFileSize(
        file.size,
      )}). Maksimal ${formatFileSize(
        MAX_IMAGE_SIZE,
      )}. Coba pilih gambar lain atau kompres manual terlebih dahulu.`,
    );
  }
}

async function uploadWisataImage(
  supabase: SupabaseClient,
  file: File,
  slug: string,
  errorPrefix: string,
) {
  validateImageFile(file);

  const fileExtension = getImageExtension(file);
  const fileName = `${slug}-${Date.now()}.${fileExtension}`;
  const filePath = `wisata/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("wisata")
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`${errorPrefix}: ${uploadError.message}`);
  }

  return filePath;
}

async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminUser) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function createWisata(formData: FormData) {
  const supabase = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const inputSlug = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(
    formData.get("short_description") ?? "",
  ).trim();
  const location = String(formData.get("location") ?? "").trim();
  const latitude = parseCoordinate(formData.get("latitude"));
  const longitude = parseCoordinate(formData.get("longitude"));
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";
  const imageFile = getImageFile(formData);

  if (!name) {
    throw new Error("Nama wisata wajib diisi.");
  }

  const slug = inputSlug ? slugify(inputSlug) : slugify(name);

  let imagePath: string | null = null;

  if (imageFile) {
    imagePath = await uploadWisataImage(
      supabase,
      imageFile,
      slug,
      "Gagal upload gambar",
    );
  }

  const { error } = await supabase.from("wisata").insert({
    name,
    slug,
    short_description: shortDescription || null,
    location: location || null,
    latitude,
    longitude,
    image_path: imagePath,
    display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
    is_published: isPublished,
  });

  if (error) {
    if (imagePath) {
      await supabase.storage.from("wisata").remove([imagePath]);
    }

    throw new Error(`Gagal menambahkan wisata: ${error.message}`);
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");
}

export async function deleteWisata(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID wisata tidak ditemukan.");
  }

  const { data: wisata } = await supabase
    .from("wisata")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("wisata").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus wisata: ${error.message}`);
  }

  if (wisata?.image_path) {
    const { error: storageError } = await supabase.storage
      .from("wisata")
      .remove([wisata.image_path]);

    if (storageError) {
      console.error("Gagal menghapus gambar wisata:", storageError.message);
    }
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");
}

export async function updateWisata(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const inputSlug = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(
    formData.get("short_description") ?? "",
  ).trim();
  const location = String(formData.get("location") ?? "").trim();
  const latitude = parseCoordinate(formData.get("latitude"));
  const longitude = parseCoordinate(formData.get("longitude"));
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";
  const imageFile = getImageFile(formData);

  if (!id) {
    throw new Error("ID wisata tidak ditemukan.");
  }

  if (!name) {
    throw new Error("Nama wisata wajib diisi.");
  }

  const slug = inputSlug ? slugify(inputSlug) : slugify(name);

  const { data: currentWisata, error: currentError } = await supabase
    .from("wisata")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (currentError) {
    throw new Error(
      `Gagal mengambil data wisata lama: ${currentError.message}`,
    );
  }

  if (!currentWisata) {
    throw new Error("Data wisata tidak ditemukan.");
  }

  const oldImagePath = currentWisata.image_path;

  const updatePayload: Record<string, string | number | boolean | null> = {
    name,
    slug,
    short_description: shortDescription || null,
    location: location || null,
    latitude,
    longitude,
    display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
    is_published: isPublished,
    updated_at: new Date().toISOString(),
  };

  let newImagePath: string | null = null;

  if (imageFile) {
    newImagePath = await uploadWisataImage(
      supabase,
      imageFile,
      slug,
      "Gagal upload gambar baru",
    );

    updatePayload.image_path = newImagePath;
  }

  const { error } = await supabase
    .from("wisata")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    if (newImagePath) {
      await supabase.storage.from("wisata").remove([newImagePath]);
    }

    throw new Error(`Gagal mengubah wisata: ${error.message}`);
  }

  if (newImagePath && oldImagePath && oldImagePath !== newImagePath) {
    const { error: removeOldImageError } = await supabase.storage
      .from("wisata")
      .remove([oldImagePath]);

    if (removeOldImageError) {
      console.error(
        "Gagal menghapus gambar lama:",
        removeOldImageError.message,
      );
    }
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");

  redirect("/admin/wisata");
}
