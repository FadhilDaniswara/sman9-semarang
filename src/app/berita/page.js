import SectionHeading from "@/components/SectionHeading";
import NewsCard from "@/components/NewsCard";
import { berita } from "@/data/berita";

export const metadata = { title: "Berita — SMA Negeri 9 Semarang" };

export default function BeritaPage() {
  const [utama, ...lain] = berita;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading as="h1" kicker="kabar sekolah" title="Berita" />
      <NewsCard item={utama} featured />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lain.map((b) => <NewsCard key={b.id} item={b} />)}
      </div>
    </div>
  );
}
