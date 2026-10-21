"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Dashboard() {
  const b = useStore("berita");
  const e = useStore("ekskul");
  const s = useStore("sekolah");

  const resetSemua = () => {
    if (confirm("Kembalikan semua data (berita, ekskul, data sekolah) ke data awal?")) { b.reset(); e.reset(); s.reset(); }
  };

  const kartu = [
    { label: "Berita", jumlah: b.data.length, href: "/admin/berita" },
    { label: "Ekskul", jumlah: e.data.length, href: "/admin/ekskul" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-forest">Dashboard</h1>
      <p className="mt-1 text-sm">Data tersimpan di localStorage browser ini, jadi hanya terlihat di perangkat yang kamu pakai.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {kartu.map((k) => (
          <Link key={k.label} href={k.href} className="border-2 border-ink bg-white p-5 hover:bg-lime">
            <p className="font-display text-4xl text-forest">{k.jumlah}</p>
            <p className="font-bold">{k.label}</p>
          </Link>
        ))}
        <Link href="/admin/sekolah" className="border-2 border-ink bg-white p-5 hover:bg-lime">
          <p className="font-display text-xl text-forest">Data Sekolah</p>
          <p className="text-sm">Sambutan, profil, alamat, kontak</p>
        </Link>
      </div>

      <h2 className="mt-8 font-display text-xl text-forest">Berita teratas</h2>
      <ul className="mt-3 divide-y-2 divide-ink border-2 border-ink bg-white">
        {b.data.slice(0, 3).map((x) => (
          <li key={x.id} className="p-3 text-sm">
            <p className="font-bold">{x.title}</p>
            <p className="opacity-70">{x.date} · {x.category}</p>
          </li>
        ))}
        {b.data.length === 0 && <li className="p-3 text-sm">Belum ada berita.</li>}
      </ul>

      <button type="button" onClick={resetSemua} className="mt-8 rounded-md border-2 border-red-700 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-700 hover:text-white">
        Reset semua ke data awal
      </button>
    </div>
  );
}
