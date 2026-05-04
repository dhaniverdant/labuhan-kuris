import { createClient } from "@/lib/supabase/server";

export function getWisataImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/wisata/${imagePath}`;
}

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

  return data.map((item) => ({
    ...item,
    image_url: getWisataImageUrl(item.image_path),
  }));
}

export async function getPublishedWisataBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wisata")
    .select(
      "id, name, slug, short_description, location, image_path, is_published, display_order",
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail wisata: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return {
    ...data,
    image_url: getWisataImageUrl(data.image_path),
  };
}
