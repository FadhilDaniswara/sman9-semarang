import BeritaDetail from "@/components/BeritaDetail";
import { berita } from "@/data/berita";

export const metadata = { title: "Berita — SMA Negeri 9 Semarang" };

export function generateStaticParams() {
  return berita.map((b) => ({ id: b.id }));
}

export default async function DetailBerita({ params }) {
  const { id } = await params; // aman untuk Next 14 maupun 15+
  return <BeritaDetail id={id} />;
}
