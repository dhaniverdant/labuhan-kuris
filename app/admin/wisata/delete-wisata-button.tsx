"use client";

import { useState } from "react";
import { deleteWisata } from "./actions";

type DeleteWisataButtonProps = {
  id: string;
  name: string;
};

export default function DeleteWisataButton({
  id,
  name,
}: DeleteWisataButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-lg border border-red-300 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Hapus
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-black">
              Hapus Data Wisata?
            </h2>

            <p className="mt-2 text-sm text-black">
              <strong>{name}</strong> akan dihapus dari Supabase dan tidak
              akan tampil lagi di halaman publik.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className=" cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
              >
                Batal
              </button>

              <form action={deleteWisata}>
                <input type="hidden" name="id" value={id} />
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
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
