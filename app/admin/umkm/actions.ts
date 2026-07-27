"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getImageFile(formData: FormData) {
  const imageEntry = formData.get("image");

  return imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null;
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
      )}). Maksimal ${formatFileSize(MAX_IMAGE_SIZE)}.`,
    );
  }
}

async function uploadProductImage(
  supabase: SupabaseClient,
  file: File,
  productName: string,
) {
  validateImageFile(file);

  const extension =
    file.type === "image/webp"
      ? "webp"
      : file.type === "image/png"
        ? "png"
        : "jpg";
  const safeName = slugify(productName) || "produk";
  const filePath = `products/${safeName}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from("umkm")
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal upload gambar: ${error.message}`);
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

function getProductFields(formData: FormData) {
  const displayOrder = Number(formData.get("display_order") ?? 0);
  const priceDigits = String(formData.get("price") ?? "").replace(/\D/g, "");
  const formattedPrice = priceDigits.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ".",
  );

  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    producer: String(formData.get("producer") ?? "").trim(),
    price: formattedPrice ? `Rp${formattedPrice}` : "",
    measure: String(formData.get("measure") ?? "").trim(),
    displayOrder: Number.isNaN(displayOrder) ? 0 : displayOrder,
    isPublished: formData.get("is_published") === "on",
  };
}

export async function createUmkmProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const fields = getProductFields(formData);
  const imageFile = getImageFile(formData);

  if (!fields.name) {
    throw new Error("Nama produk wajib diisi.");
  }

  let imagePath: string | null = null;

  if (imageFile) {
    imagePath = await uploadProductImage(supabase, imageFile, fields.name);
  }

  const { error } = await supabase.from("umkm_products").insert({
    name: fields.name,
    description: fields.description || null,
    producer: fields.producer || null,
    price: fields.price || null,
    measure: fields.measure || null,
    image_path: imagePath,
    display_order: fields.displayOrder,
    is_published: fields.isPublished,
  });

  if (error) {
    if (imagePath) {
      await supabase.storage.from("umkm").remove([imagePath]);
    }

    throw new Error(`Gagal menambahkan produk UMKM: ${error.message}`);
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}

export async function updateUmkmProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const fields = getProductFields(formData);
  const imageFile = getImageFile(formData);

  if (!id) {
    throw new Error("ID produk tidak ditemukan.");
  }

  if (!fields.name) {
    throw new Error("Nama produk wajib diisi.");
  }

  const { data: currentProduct, error: currentError } = await supabase
    .from("umkm_products")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  if (currentError || !currentProduct) {
    throw new Error(
      currentError
        ? `Gagal mengambil produk lama: ${currentError.message}`
        : "Produk tidak ditemukan.",
    );
  }

  const updatePayload: Record<string, string | number | boolean | null> = {
    name: fields.name,
    description: fields.description || null,
    producer: fields.producer || null,
    price: fields.price || null,
    measure: fields.measure || null,
    display_order: fields.displayOrder,
    is_published: fields.isPublished,
    updated_at: new Date().toISOString(),
  };

  let newImagePath: string | null = null;

  if (imageFile) {
    newImagePath = await uploadProductImage(supabase, imageFile, fields.name);
    updatePayload.image_path = newImagePath;
  }

  const { error } = await supabase
    .from("umkm_products")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    if (newImagePath) {
      await supabase.storage.from("umkm").remove([newImagePath]);
    }

    throw new Error(`Gagal mengubah produk UMKM: ${error.message}`);
  }

  if (
    newImagePath &&
    currentProduct.image_path &&
    currentProduct.image_path !== newImagePath
  ) {
    const { error: removeError } = await supabase.storage
      .from("umkm")
      .remove([currentProduct.image_path]);

    if (removeError) {
      console.error("Gagal menghapus gambar UMKM lama:", removeError.message);
    }
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
  redirect("/admin/umkm");
}

export async function deleteUmkmProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("ID produk tidak ditemukan.");
  }

  const { data: product } = await supabase
    .from("umkm_products")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("umkm_products").delete().eq("id", id);

  if (error) {
    throw new Error(`Gagal menghapus produk UMKM: ${error.message}`);
  }

  if (product?.image_path) {
    const { error: storageError } = await supabase.storage
      .from("umkm")
      .remove([product.image_path]);

    if (storageError) {
      console.error("Gagal menghapus gambar UMKM:", storageError.message);
    }
  }

  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}
