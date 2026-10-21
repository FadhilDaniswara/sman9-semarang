"use client";
import SectionHeading from "./SectionHeading";
import NewsCard from "./NewsCard";
import { useStore } from "@/lib/store";

export default function BeritaList() {
  const { data } = useStore("berita");
  const [utama, ...lain] = data;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading as="h1" kicker="kabar sekolah" title="Berita" />
      {!utama && <p>Belum ada berita.</p>}
      {utama && <NewsCard item={utama} featured />}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lain.map((b) => <NewsCard key={b.id} item={b} />)}
      </div>
    </div>
  );
}
