export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black px-6 py-6 text-center text-sm text-white">
      Copyright @ {year} Desa Labuhan Kuris
    </footer>
  );
}