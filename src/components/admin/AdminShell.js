"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { sudahLogin, logout } from "@/lib/store";

const menu = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/berita", label: "Berita" },
  { href: "/admin/ekskul", label: "Ekskul" },
  { href: "/admin/sekolah", label: "Data Sekolah" },
];

export default function AdminShell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const halamanLogin = path === "/admin/login";

  useEffect(() => {
    if (halamanLogin) return;
    if (sudahLogin()) setOk(true);
    else router.replace("/admin/login");
  }, [halamanLogin, path, router]);

  if (halamanLogin) return <div className="min-h-screen bg-forest">{children}</div>;
  if (!ok) return <p className="p-8">Memeriksa sesi…</p>;

  const keluar = () => { logout(); setOk(false); router.replace("/admin/login"); };

  return (
    <div className="min-h-screen bg-ivory md:flex">
      <aside className="bg-forest p-4 text-ivory md:min-h-screen md:w-56 md:shrink-0">
        <p className="font-display text-lg">Admin</p>
        <p className="mb-4 text-xs opacity-80">SMA Negeri 9 Semarang</p>
        <nav aria-label="Menu admin" className="flex flex-wrap gap-1 md:flex-col">
          {menu.map((m) => (
            <Link key={m.href} href={m.href} aria-current={path === m.href ? "page" : undefined}
              className={`px-3 py-2 text-sm font-bold ${path === m.href ? "bg-lime text-ink" : "hover:bg-ivory/10"}`}>
              {m.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 flex flex-wrap gap-2 md:flex-col">
          <Link href="/" className="px-3 py-2 text-sm underline">Lihat website</Link>
          <button type="button" onClick={keluar} className="border-2 border-ivory px-3 py-2 text-left text-sm font-bold hover:bg-ivory hover:text-forest">Logout</button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
