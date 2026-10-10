"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const links = [{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/berita", label: "Berita" }, { href: "/ekstrakurikuler", label: "Ekskul" }];

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (h) => (h === "/" ? path === "/" : path.startsWith(h));
  const item = (l) => (
    <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={active(l.href) ? "page" : undefined}
      className={`px-3 py-2 text-sm font-bold ${active(l.href) ? "bg-lime text-ink" : "text-ivory hover:bg-ivory/10"}`}>
      {l.label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-50 bg-forest">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 text-ivory">
          <Logo />
          <span className="font-display text-sm leading-tight sm:text-base">SMA Negeri 9<br />Semarang</span>
        </Link>
        <div className="hidden gap-1 md:flex">{links.map(item)}</div>
        <button type="button" className="border-2 border-ivory px-3 py-2 text-sm font-bold text-ivory md:hidden"
          aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen(!open)}>
          {open ? "Tutup" : "Menu"}
        </button>
      </nav>
      {open && <div id="menu-mobile" className="flex flex-col border-t border-ivory/20 px-4 py-2 md:hidden">{links.map(item)}</div>}
    </header>
  );
}
