import Link from "next/link";
import PhotoSlot from "./PhotoSlot";
import { sekolah } from "@/data/sekolah";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-forest text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-6">
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            SMA NEGERI<span className="mx-1 inline-block -rotate-6 bg-lime px-2 text-ink">9</span>
            <br />SEMARANG
          </h1>
          {/* Teks editorial nonresmi, bukan slogan resmi sekolah */}
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/90">{sekolah.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-md bg-lime px-5 py-3 font-bold text-ink hover:bg-ivory">Kenali Sekolah Kami</Link>
            <Link href="/berita" className="rounded-md border-2 border-ivory px-5 py-3 font-bold hover:bg-ivory hover:text-forest">Lihat Berita</Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Sorotan">
            {sekolah.sorotan.map((t, i) => (
              <li key={t} className={`rounded border border-sage px-3 py-1 text-sm font-bold ${i % 2 ? "rotate-1" : "-rotate-1"}`}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="relative md:col-span-6">
          <span aria-hidden="true" className="absolute -top-4 left-1/2 z-10 h-7 w-24 -translate-x-1/2 -rotate-3 bg-lime/80" />
          <div className="aspect-[4/3] rotate-2 border-8 border-ivory bg-ivory">
            <PhotoSlot src={sekolah.foto.gedung} alt="Gedung SMA Negeri 9 Semarang tampak depan" label="Foto gedung sekolah belum tersedia" />
          </div>
          <span className="absolute -bottom-9 right-2 -rotate-2 font-hand text-2xl text-lime">hijau &amp; rindang, sekolah kita ↗</span>
        </div>
      </div>
    </section>
  );
}
