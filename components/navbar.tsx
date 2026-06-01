"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  {
    label: "Potensi",
    href: "#",
    children: [
      { label: "Wisata", href: "/wisata" },
      { label: "Pertanian", href: "/pertanian" },
      // { label: "Perikanan", href: "/perikanan" },
      // { label: "Rumput Laut", href: "/rumput-laut" },
    ],
  },
  { label: "Statistik", href: "/statistik" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

type MobileMenuState = {
  open: boolean;
  pathname: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [mobileMenuState, setMobileMenuState] = useState<MobileMenuState>({
    open: false,
    pathname: "",
  });

  const [mobilePotensiOpen, setMobilePotensiOpen] = useState(false);

  const mobileMenuOpen =
    mobileMenuState.open && mobileMenuState.pathname === pathname;

  const toggleMobileMenu = () => {
    setMobileMenuState((prev) => ({
      open: prev.pathname === pathname ? !prev.open : true,
      pathname,
    }));
  };

  const closeMobileMenu = () => {
    setMobileMenuState({
      open: false,
      pathname,
    });
    setMobilePotensiOpen(false);
  };

  const [desktopPotensiOpen, setDesktopPotensiOpen] = useState(false);
  const desktopPotensiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopPotensiRef.current &&
        !desktopPotensiRef.current.contains(event.target as Node)
      ) {
        setDesktopPotensiOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isPotensiActive =
    pathname.startsWith("/wisata") || pathname === "/pertanian";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md md:px-6">
          <Link
            href="/"
            className="text-base font-bold tracking-wide md:text-lg"
          >
            Desa Labuhan Kuris
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  ref={desktopPotensiRef}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => setDesktopPotensiOpen((prev) => !prev)}
                    aria-haspopup="menu"
                    aria-expanded={desktopPotensiOpen}
                    className={`flex cursor-pointer items-center gap-1 text-sm font-medium transition ${
                      isPotensiActive
                        ? "text-yellow-300"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span className="text-xs">
                      {desktopPotensiOpen ? "▴" : "▾"}
                    </span>
                  </button>

                  {desktopPotensiOpen ? (
                    <div className="absolute left-1/2 top-full z-50 mt-3 w-44 -translate-x-1/2 rounded-2xl border border-white/15 bg-slate-950/95 p-2 shadow-xl backdrop-blur-md">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setDesktopPotensiOpen(false)}
                          className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                            isActive(child.href)
                              ? "bg-white/10 text-white"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive(item.href)
                      ? "text-yellow-300"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 md:hidden"
            aria-label="Buka menu navigasi"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3 rounded-3xl border border-white/20 bg-slate-900/80 p-4 text-white backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => setMobilePotensiOpen((prev) => !prev)}
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        isPotensiActive
                          ? "bg-white/10 text-white"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span>{mobilePotensiOpen ? "−" : "+"}</span>
                    </button>

                    {mobilePotensiOpen ? (
                      <div className="mt-1 space-y-1 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={closeMobileMenu}
                            className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                              isActive(child.href)
                                ? "bg-white/10 text-white"
                                : "text-white/75 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive(item.href)
                        ? "bg-white/10 text-white"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
