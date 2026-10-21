"use client";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import { useStore } from "@/lib/store";
import { PLACEHOLDER } from "@/data/sekolah";

export default function Home() {
  const { data: berita } = useStore("berita");
  const { data: sekolah } = useStore("sekolah");
  const sambutan = [].concat(sekolah.sambutan.teks ?? []);
  return (
    <>
      <HeroSection />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-12">
        <div className="md:col-span-5"><SectionHeading kicker="kenalan dulu" title="Sekilas Sekolah" /></div>
        <div className="md:col-span-7">
          <p className="leading-relaxed">{sekolah.profil}</p>
          <Link href="/about" className="mt-5 inline-block border-b-4 border-lime font-bold text-forest">Selengkapnya di halaman About →</Link>
          <Link href="/ekstrakurikuler" className="ml-6 mt-5 inline-block border-b-4 border-lime font-bold text-forest">Lihat ekstrakurikuler →</Link>
        </div>
      </section>
      <section className="mx-auto mb-16 max-w-4xl px-4">
        <div className="border-l-8 border-lime bg-forest p-8 text-ivory">
          <SectionHeading kicker="salam hangat" title={sekolah.sambutan.judul} dark />
          <div className="space-y-4 leading-relaxed">
            {sambutan.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          {sekolah.sambutan.penutup && <p className="mt-6">{sekolah.sambutan.penutup}</p>}
          <p className="text-sm">{sekolah.sambutan.jabatan}</p>
          <p className="mt-2 font-hand text-2xl text-lime">{sekolah.sambutan.penulis}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4">
        <SectionHeading kicker="dari lingkungan sekolah kita ↓" title="Berita Terbaru" />
        <div className="grid gap-6 md:grid-cols-3">
          {berita.slice(0, 3).map((b, i) => (
            <div key={b.id} className={["md:-rotate-1", "md:mt-6", "md:rotate-1"][i]}><NewsCard item={b} /></div>
          ))}
        </div>
        <Link href="/berita" className="mt-6 inline-block font-bold text-forest underline underline-offset-4">Semua berita →</Link>
      </section>
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="bg-sage/40 p-8">
          <SectionHeading kicker="mampir yuk" title="Informasi Kunjungan" />
          <p>{sekolah.alamat ?? `[Alamat belum diverifikasi] ${PLACEHOLDER}`}</p>
          {sekolah.mapsUrl
            ? <a href={sekolah.mapsUrl} className="mt-4 inline-block rounded-md bg-forest px-4 py-2 font-bold text-ivory" target="_blank" rel="noopener noreferrer">Buka di Google Maps</a>
            : <p className="mt-2 text-sm italic">[Tautan Google Maps resmi belum tersedia]</p>}
        </div>
      </section>
    </>
  );
}
