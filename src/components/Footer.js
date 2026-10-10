import Link from "next/link";
import Logo from "./Logo";
import { sekolah, PLACEHOLDER } from "@/data/sekolah";

export default function Footer() {
  return (
    <footer className="mt-20 bg-forest text-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="flex items-start gap-3">
          <Logo size="h-14 w-14" />
          <p className="font-display text-lg">{sekolah.nama}</p>
        </div>
        <nav aria-label="Navigasi footer" className="flex flex-col gap-2 text-sm font-bold">
          <Link href="/" className="hover:text-lime">Home</Link>
          <Link href="/about" className="hover:text-lime">About</Link>
          <Link href="/berita" className="hover:text-lime">Berita</Link>
          <Link href="/ekstrakurikuler" className="hover:text-lime">Ekstrakurikuler</Link>
        </nav>
        <div className="text-sm leading-relaxed">
          <p className="font-bold">Alamat &amp; kontak</p>
          <p>{sekolah.alamat ?? `[Alamat belum diverifikasi] ${PLACEHOLDER}`}</p>
          {sekolah.kontak && <p>{sekolah.kontak}</p>}
        </div>
      </div>
      <p className="border-t border-ivory/20 py-4 text-center text-xs">© 2026 {sekolah.nama}</p>
    </footer>
  );
}
