import { createClient } from "@/lib/supabase/server";

export async function getPublishedStatistikSummary() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("statistik_summary")
    .select("id, label, value, suffix, display_order")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil statistik summary: ${error.message}`);
  }

  return data;
}

export async function getPublishedPendudukPerDusun() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("penduduk_per_dusun")
    .select("id, name, penduduk, display_order")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil penduduk per dusun: ${error.message}`);
  }

  return data;
}
