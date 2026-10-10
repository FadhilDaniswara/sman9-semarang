import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-forest">Halaman tidak ditemukan</h1>
      <Link href="/berita" className="mt-6 inline-block bg-forest px-5 py-3 font-bold text-ivory">Ke daftar berita</Link>
    </div>
  );
}
