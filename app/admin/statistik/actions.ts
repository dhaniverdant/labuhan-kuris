"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

function parseNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();

  if (!text) {
    return 0;
  }

  const numberValue = Number(text);

  if (Number.isNaN(numberValue)) {
    return 0;
  }

  return numberValue;
}

export async function updateStatistikSummary(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const value = parseNumber(formData.get("value"));
  const suffix = String(formData.get("suffix") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";

  if (!id) {
    throw new Error("ID statistik tidak ditemukan.");
  }

  if (!label) {
    throw new Error("Label statistik wajib diisi.");
  }

  const { error } = await supabase
    .from("statistik_summary")
    .update({
      label,
      value,
      suffix: suffix || null,
      display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah statistik summary: ${error.message}`);
  }

  revalidatePath("/admin/statistik");
  revalidatePath("/statistik");
}

export async function updatePendudukPerDusun(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const penduduk = parseNumber(formData.get("penduduk"));
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";

  if (!id) {
    throw new Error("ID dusun tidak ditemukan.");
  }

  if (!name) {
    throw new Error("Nama dusun wajib diisi.");
  }

  const { error } = await supabase
    .from("penduduk_per_dusun")
    .update({
      name,
      penduduk,
      display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal mengubah penduduk per dusun: ${error.message}`);
  }

  revalidatePath("/admin/statistik");
  revalidatePath("/statistik");
}

export async function createPendudukPerDusun(formData: FormData) {
  const supabase = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const penduduk = parseNumber(formData.get("penduduk"));
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const isPublished = formData.get("is_published") === "on";

  if (!name) {
    throw new Error("Nama dusun wajib diisi.");
  }

  const { error } = await supabase.from("penduduk_per_dusun").insert({
    name,
    penduduk,
    display_order: Number.isNaN(displayOrder) ? 0 : displayOrder,
    is_published: isPublished,
  });

  if (error) {
    throw new Error(`Gagal menambahkan penduduk per dusun: ${error.message}`);
  }

  revalidatePath("/admin/statistik");
  revalidatePath("/statistik");
}

export async function deletePendudukPerDusun(formData: FormData) {
  const supabase = await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID dusun tidak ditemukan.");
  }

  const { error } = await supabase
    .from("penduduk_per_dusun")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus penduduk per dusun: ${error.message}`);
  }

  revalidatePath("/admin/statistik");
  revalidatePath("/statistik");
}
