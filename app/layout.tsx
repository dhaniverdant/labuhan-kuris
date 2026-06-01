import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Desa Labuhan Kuris",
  description: "Website profil Desa Labuhan Kuris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      {/* <body className="bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body> */}

      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
