"use client";

import { useState } from "react";

type FormattedPriceInputProps = {
  id?: string;
  name?: string;
  defaultValue?: string | null;
  placeholder?: string;
};

function formatThousands(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function FormattedPriceInput({
  id = "price",
  name = "price",
  defaultValue = "",
  placeholder = "50.000",
}: FormattedPriceInputProps) {
  const [value, setValue] = useState(() =>
    formatThousands(defaultValue ?? ""),
  );

  return (
    <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-black">
      <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-600">
        Rp
      </span>
      <input
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(formatThousands(event.target.value))}
        placeholder={placeholder}
        className="min-w-0 flex-1 px-3 py-2 text-sm text-black outline-none"
      />
    </div>
  );
}
