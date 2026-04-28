import { createClient } from "@/lib/supabase/server";

export async function getPublishedWisata() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wisata")
    .select(
      "id, name, slug, short_description, location, image_path, is_published, display_order",
    )
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil data wisata publish: ${error.message}`);
  }

  return data;
}
