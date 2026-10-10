import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoSlot from "@/components/PhotoSlot";
import { berita, getBerita } from "@/data/berita";

export function generateStaticParams() {
  return berita.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = getBerita(id);
  return { title: item ? `${item.title} — SMAN 9 Semarang` : "Berita tidak ditemukan" };
}

export default async function DetailBerita({ params }) {
  const { id } = await params; // aman untuk Next 14 maupun 15+
  const item = getBerita(id);
  if (!item) notFound();
  const i = berita.indexOf(item);
  const prev = berita[i - 1], next = berita[i + 1];
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/berita" className="font-bold text-forest underline underline-offset-4">← Kembali ke Berita</Link>
      <p className="mt-8 font-hand text-2xl text-forest">{item.date}</p>
      <h1 className="font-display text-3xl leading-tight text-forest sm:text-4xl">{item.title}</h1>
      <div className="my-8 aspect-[16/9]">
        <PhotoSlot src={item.image} alt={item.image ? item.title : ""} label="Gambar berita contoh" />
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
