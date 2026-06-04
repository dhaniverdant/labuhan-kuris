"use client";

import { useState } from "react";
import { deleteGaleri } from "./actions";

type DeleteGaleriButtonProps = {
  id: string;
  title: string;
};

export default function DeleteGaleriButton({
  id,
  title,
}: DeleteGaleriButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border cursor-pointer border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Delete
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900">
              Hapus Galeri?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Data galeri <span className="font-semibold">{title}</span> akan
              dihapus dari database dan gambar terkait akan dihapus dari
              Supabase Storage.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl cursor-pointer border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>

              <form action={deleteGaleri}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="rounded-xl cursor-pointer bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Ya, Hapus
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
