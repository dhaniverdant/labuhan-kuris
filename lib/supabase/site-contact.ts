import { createClient } from "@/lib/supabase/server";

export type SiteContact = {
  phoneDisplay: string;
  phoneHref: string;
  emailDisplay: string;
  emailHref: string;
  facebookDisplay: string;
  facebookHref: string;
  instagramDisplay: string;
  instagramHref: string;
  addressLine1: string;
  addressLine2: string;
  mapsEmbedUrl: string;
  mapsUrl: string;
  serviceDays: string;
  serviceHours: string;
};

export const defaultSiteContact: SiteContact = {
  phoneDisplay: "-",
  phoneHref: "",
  emailDisplay: "-",
  emailHref: "",
  facebookDisplay: "-",
  facebookHref: "",
  instagramDisplay: "",
  instagramHref: "",
  addressLine1: "Kantor Desa Labuhan Kuris",
  addressLine2: "Dusun Labuhan Kuris, Kecamatan Lape, Kabupaten Sumbawa",
  mapsEmbedUrl: "",
  mapsUrl: "",
  serviceDays: "Senin - Jumat",
  serviceHours: "08.00 - 16.00 WITA",
};

export async function getSiteContact(): Promise<SiteContact> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_contact")
    .select(
      `
        phoneDisplay,
        phoneHref,
        emailDisplay,
        emailHref,
        facebookDisplay,
        facebookHref,
        instagramDisplay,
        instagramHref,
        addressLine1,
        addressLine2,
        mapsEmbedUrl,
        mapsUrl,
        serviceDays,
        serviceHours
      `,
    )
    .eq("id", "main")
    .maybeSingle<SiteContact>();

  if (error) {
    console.error("Failed to fetch site contact:", error.message);
    return defaultSiteContact;
  }

  return data ?? defaultSiteContact;
}
