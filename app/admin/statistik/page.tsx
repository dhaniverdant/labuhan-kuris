import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createPendudukPerDusun, updatePendudukPerDusun, updateStatistikSummary } from "./actions";
import DeletePendudukButton from "./delete-penduduk-button";

export default async function AdminStatistikPage() {
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

  const { data: statistikSummary, error: summaryError } = await supabase
    .from("statistik_summary")
    .select("id, label, value, suffix, display_order, is_published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  const { data: pendudukPerDusun, error: dusunError } = await supabase
    .from("penduduk_per_dusun")
    .select("id, name, penduduk, display_order, is_published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 text-black">
      <div>
        <h1 className="text-2xl font-semibold">Admin Statistik</h1>
        <p className="mt-2 text-sm text-black">
          Kelola data ringkasan statistik dan jumlah penduduk per dusun.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Statistik Summary</h2>

        {summaryError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Gagal mengambil statistik summary: {summaryError.message}
          </p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Label</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Suffix</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                </tr>
              </thead>

              <tbody>
                {statistikSummary && statistikSummary.length > 0 ? (
                  statistikSummary.map((item) => {
                    const formId = `summary-form-${item.id}`;

                    return (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="px-4 py-3">
                          <input
                            type="hidden"
                            name="id"
                            value={item.id}
                            form={formId}
                          />

                          <input
                            name="label"
                            defaultValue={item.label}
                            form={formId}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            name="value"
                            type="number"
                            step="any"
                            defaultValue={item.value}
                            form={formId}
                            className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <input
                            name="suffix"
                            defaultValue={item.suffix ?? ""}
                            form={formId}
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              name="is_published"
                              type="checkbox"
                              defaultChecked={item.is_published}
                              form={formId}
                              className="h-4 w-4"
                            />
                            Ya
                          </label>
                        </td>

                        <td className="px-4 py-3">
                          <input
                            name="display_order"
                            type="number"
                            defaultValue={item.display_order}
                            form={formId}
                            className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                          />
                        </td>

                        <td className="px-4 py-3">
                          <form id={formId} action={updateStatistikSummary}>
                            <button
                              type="submit"
                              className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white"
                            >
                              Simpan
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center">
                      Belum ada data statistik summary.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Penduduk per Dusun</h2>

        <form
          action={createPendudukPerDusun}
          className="mt-4 grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 md:grid-cols-5"
        >
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Nama Dusun
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Contoh: Dusun 5"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="penduduk"
              className="mb-1 block text-sm font-medium"
            >
              Penduduk
            </label>
            <input
              id="penduduk"
              name="penduduk"
              type="number"
              required
              placeholder="Contoh: 5203"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="display_order"
              className="mb-1 block text-sm font-medium"
            >
              Urutan
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              defaultValue={0}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
            />
          </div>

          <label className="flex items-end gap-2 pb-2 text-sm">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked
              className="h-4 w-4"
            />
            Publish
          </label>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-black px-3 py-2 text-sm font-medium text-white"
            >
              Tambah
            </button>
          </div>
        </form>

        {dusunError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Gagal mengambil penduduk per dusun: {dusunError.message}
          </p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3">Dusun</th>
                  <th className="px-4 py-3">Penduduk</th>
                  <th className="px-4 py-3">Publish</th>
                  <th className="px-4 py-3">Urutan</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pendudukPerDusun.map((item) => {
                  const dusunFormId = `dusun-form-${item.id}`;

                  return (
                    <tr key={item.id} className="border-t border-gray-100">
                      <td className="px-4 py-3">
                        <input
                          type="hidden"
                          name="id"
                          value={item.id}
                          form={dusunFormId}
                        />

                        <input
                          name="name"
                          defaultValue={item.name}
                          form={dusunFormId}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <input
                          name="penduduk"
                          type="number"
                          defaultValue={item.penduduk}
                          form={dusunFormId}
                          className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            name="is_published"
                            type="checkbox"
                            defaultChecked={item.is_published}
                            form={dusunFormId}
                            className="h-4 w-4"
                          />
                          Ya
                        </label>
                      </td>

                      <td className="px-4 py-3">
                        <input
                          name="display_order"
                          type="number"
                          defaultValue={item.display_order}
                          form={dusunFormId}
                          className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm text-black outline-none focus:border-black"
                        />
                      </td>

                      <td className="px-4 py-3">
                        <form id={dusunFormId} action={updatePendudukPerDusun}>
                          <button
                            type="submit"
                            className="rounded-lg bg-black px-3 py-2 text-sm font-medium text-white"
                          >
                            Simpan
                          </button>
                        </form>

                        <DeletePendudukButton id={item.id} name={item.name} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
