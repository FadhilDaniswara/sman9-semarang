import Link from "next/link";
import PhotoSlot from "./PhotoSlot";

export default function NewsCard({ item, featured = false }) {
  return (
    <article className={`border-2 border-ink bg-ivory transition-transform hover:-translate-y-1 ${featured ? "md:grid md:grid-cols-2" : "flex flex-col"}`}>
      <div className={featured ? "aspect-[4/3] md:aspect-auto md:min-h-[320px]" : "aspect-[16/9]"}>
        <PhotoSlot src={item.image} alt={item.image ? item.title : ""} label="Gambar berita contoh" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="flex flex-wrap items-center gap-2">
          <span className="bg-lime px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-ink">{item.category}</span>
          <span className="font-hand text-xl text-forest">{item.date}</span>
        </p>
        <h3 className={`font-sans font-extrabold leading-snug ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          <Link href={`/berita/${item.id}`} className="underline-offset-4 hover:underline">{item.title}</Link>
        </h3>
        <p className="text-sm leading-relaxed">{item.excerpt}</p>
        <Link href={`/berita/${item.id}`} className="mt-auto inline-block w-fit rounded-md bg-forest px-4 py-2 text-sm font-bold text-ivory hover:bg-lime hover:text-ink">
          Baca Selengkapnya<span className="sr-only">: {item.title}</span> →
        </Link>
      </div>
    </article>
  );
}
