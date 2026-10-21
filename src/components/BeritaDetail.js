"use client";
import Link from "next/link";
import PhotoSlot from "./PhotoSlot";
import { useStore } from "@/lib/store";

export default function BeritaDetail({ id }) {
  const { data, siap } = useStore("berita");
  const i = data.findIndex((b) => b.id === id);
  const item = data[i];

  if (!item) {
    if (!siap) return <p className="mx-auto max-w-3xl px-4 py-24">Memuat…</p>;
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl text-forest">Berita tidak ditemukan</h1>
        <Link href="/berita" className="mt-6 inline-block rounded-md bg-forest px-5 py-3 font-bold text-ivory">Kembali ke Berita</Link>
      </div>
    );
  }

  const prev = data[i - 1], next = data[i + 1];
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/berita" className="font-bold text-forest underline underline-offset-4">← Kembali ke Berita</Link>
      <p className="mt-8 font-hand text-2xl text-forest">{item.date}</p>
      <h1 className="font-display text-3xl leading-tight text-forest sm:text-4xl">{item.title}</h1>
      <div className="my-8 aspect-[16/9]">
        <PhotoSlot src={item.image} alt={item.image ? item.title : ""} label="Gambar berita belum tersedia" />
      </div>
      <div className="space-y-4 leading-relaxed">{item.content.map((p, n) => <p key={n}>{p}</p>)}</div>
      {item.sumber && (
        <p className="mt-8 text-sm">
          Sumber:{" "}
          <a href={item.sumber} target="_blank" rel="noopener noreferrer" className="break-all font-bold text-forest underline underline-offset-4">
            Situs resmi SMA Negeri 9 Semarang
          </a>
        </p>
      )}
      <nav aria-label="Berita lain" className="mt-12 flex justify-between gap-4 border-t-2 border-ink pt-6 text-sm font-bold">
        {prev ? <Link href={`/berita/${prev.id}`} className="hover:underline">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/berita/${next.id}`} className="text-right hover:underline">{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
