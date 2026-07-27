import { createClient } from "@/lib/supabase/server";

export function getUmkmImageUrl(imagePath: string | null) {
  if (!imagePath) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return null;
  }

  return `${supabaseUrl}/storage/v1/object/public/umkm/${imagePath}`;
}

export async function getPublishedUmkmProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("umkm_products")
    .select(
      "id, name, description, producer, price, measure, image_path, display_order",
    )
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil produk UMKM: ${error.message}`);
  }

  return data.map((product) => ({
    ...product,
    image_url: getUmkmImageUrl(product.image_path),
  }));
}
