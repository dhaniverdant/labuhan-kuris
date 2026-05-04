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

  if (!name) {
    throw new Error("Nama wisata wajib diisi.");
  }

  const slug = inputSlug ? slugify(inputSlug) : slugify(name);

  const { error } = await supabase.from("wisata").insert({
    name,
    slug,
    short_description: shortDescription || null,
    location: location || null,
    display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
    is_published: isPublished,
  });

  if (error) {
    throw new Error(`Gagal menambahkan wisata: ${error.message}`);
  }

  revalidatePath("/admin/wisata");
  revalidatePath("/wisata");
}
