"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const MAX_GALERI_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

const ALLOWED_GALERI_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function validateGaleriImage(file: File) {
  if (!ALLOWED_GALERI_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Format gambar harus JPG, PNG, atau WebP.");
  }

  if (file.size > MAX_GALERI_IMAGE_SIZE) {
    throw new Error("Ukuran gambar maksimal 2 MB.");
  }
}

export async function createGaleri(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const published = formData.get("published") === "on";
  const image = formData.get("image");

  if (!title) {
    throw new Error("Judul galeri wajib diisi.");
  }

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Gambar galeri wajib diupload.");
  }

  validateGaleriImage(image);

  const fileExt = image.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const imagePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("galeri")
    .upload(imagePath, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { error: insertError } = await supabase.from("galeri").insert({
    title,
    description: description || null,
    image_path: imagePath,
    display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
    published,
  });

  if (insertError) {
    await supabase.storage.from("galeri").remove([imagePath]);
    throw new Error(insertError.message);
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}

export async function deleteGaleri(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID galeri tidak ditemukan.");
  }

  const { data: galeriItem, error: fetchError } = await supabase
    .from("galeri")
    .select("image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  const { error: deleteError } = await supabase
    .from("galeri")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (galeriItem?.image_path) {
    const { error: storageError } = await supabase.storage
      .from("galeri")
      .remove([galeriItem.image_path]);

    if (storageError) {
      console.error("Failed to delete galeri image:", storageError.message);
    }
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}

export async function updateGaleri(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const published = formData.get("published") === "on";
  const image = formData.get("image");

  if (!id) {
    throw new Error("ID galeri tidak ditemukan.");
  }

  if (!title) {
    throw new Error("Judul galeri wajib diisi.");
  }

  const { data: existingGaleri, error: fetchError } = await supabase
    .from("galeri")
    .select("image_path")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  let nextImagePath = existingGaleri.image_path;
  let uploadedNewImagePath: string | null = null;

  if (image instanceof File && image.size > 0) {
    validateGaleriImage(image);
    
    const fileExt = image.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const imagePath = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("galeri")
      .upload(imagePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    nextImagePath = imagePath;
    uploadedNewImagePath = imagePath;
  }

  const { error: updateError } = await supabase
    .from("galeri")
    .update({
      title,
      description: description || null,
      image_path: nextImagePath,
      display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
      published,
    })
    .eq("id", id);

  if (updateError) {
    if (uploadedNewImagePath) {
      await supabase.storage.from("galeri").remove([uploadedNewImagePath]);
    }

    throw new Error(updateError.message);
  }

  if (
    uploadedNewImagePath &&
    existingGaleri.image_path &&
    existingGaleri.image_path !== uploadedNewImagePath
  ) {
    const { error: removeOldImageError } = await supabase.storage
      .from("galeri")
      .remove([existingGaleri.image_path]);

    if (removeOldImageError) {
      console.error(
        "Failed to remove old galeri image:",
        removeOldImageError.message,
      );
    }
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  redirect("/admin/galeri");
}
