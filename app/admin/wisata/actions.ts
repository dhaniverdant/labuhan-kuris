"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
  const imageFile = formData.get("image") as File | null;

  if (!name) {
    throw new Error("Nama wisata wajib diisi.");
  }

  const slug = inputSlug ? slugify(inputSlug) : slugify(name);

  let imagePath: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const fileExtension = imageFile.name.split(".").pop();
    const fileName = `${slug}-${Date.now()}.${fileExtension}`;
    const filePath = `wisata/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("wisata")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Gagal upload gambar: ${uploadError.message}`);
    }

    imagePath = filePath;
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
  const imageFile = formData.get("image") as File | null;

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

  if (imageFile && imageFile.size > 0) {
    const fileExtension = imageFile.name.split(".").pop();
    const fileName = `${slug}-${Date.now()}.${fileExtension}`;
    const filePath = `wisata/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("wisata")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Gagal upload gambar baru: ${uploadError.message}`);
    }

    newImagePath = filePath;
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
