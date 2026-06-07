"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateSiteContact(formData: FormData) {
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

  const nextContact = {
    phoneDisplay: getString(formData, "phoneDisplay"),
    phoneHref: getString(formData, "phoneHref"),
    emailDisplay: getString(formData, "emailDisplay"),
    emailHref: getString(formData, "emailHref"),
    facebookDisplay: getString(formData, "facebookDisplay"),
    facebookHref: getString(formData, "facebookHref"),
    instagramDisplay: getString(formData, "instagramDisplay"),
    instagramHref: getString(formData, "instagramHref"),
    addressLine1: getString(formData, "addressLine1"),
    addressLine2: getString(formData, "addressLine2"),
    mapsEmbedUrl: getString(formData, "mapsEmbedUrl"),
    mapsUrl: getString(formData, "mapsUrl"),
    serviceDays: getString(formData, "serviceDays"),
    serviceHours: getString(formData, "serviceHours"),
  };

  const { error } = await supabase.from("site_contact").upsert(
    {
      id: "main",
      ...nextContact,
    },
    {
      onConflict: "id",
    },
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/kontak");
  revalidatePath("/kontak");
}


