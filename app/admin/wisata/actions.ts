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

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID wisata tidak ditemukan.");
  }

  const { error } = await supabase.from("wisata").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus wisata: ${error.message}`);
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");
}

export async function updateWisata(formData: FormData) {
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

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const inputSlug = String(formData.get("slug") ?? "").trim();
  const shortDescription = String(
    formData.get("short_description") ?? "",
  ).trim();
  const location = String(formData.get("location") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";

  if (!id) {
    throw new Error("ID wisata tidak ditemukan.");
  }

  if (!name) {
    throw new Error("Nama wisata wajib diisi.");
  }

  const slug = inputSlug ? slugify(inputSlug) : slugify(name);

  const { error } = await supabase
    .from("wisata")
    .update({
      name,
      slug,
      short_description: shortDescription || null,
      location: location || null,
      display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah wisata: ${error.message}`);
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");

  redirect("/admin/wisata");
}
