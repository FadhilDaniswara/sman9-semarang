"use client";
import { useState } from "react";
import Field from "@/components/admin/Field";
import { useStore, buatSlug } from "@/lib/store";

const kosong = { id: "", category: "Kegiatan", title: "", date: "", excerpt: "", image: "", sumber: "", konten: "", baru: true };

export default function AdminBerita() {
  const { data, simpan } = useStore("berita");
  const [form, setForm] = useState(null);
  const [pesan, setPesan] = useState("");

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const edit = (b) => setForm({ ...b, image: b.image ?? "", sumber: b.sumber ?? "", konten: b.content.join("\n\n"), baru: false });

  const submit = (e) => {
    e.preventDefault();
    const item = {
      id: form.id,
      category: form.category.trim() || "Berita",
      title: form.title.trim(),
      date: form.date.trim() || "Tanggal akan diperbarui",
      excerpt: form.excerpt.trim(),
      image: form.image.trim() || null,
      sumber: form.sumber.trim() || undefined,
      content: form.konten.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    };
    if (item.content.length === 0) item.content = [item.excerpt];
    if (form.baru) {
      item.id = buatSlug(item.title, data.map((b) => b.id));
      simpan([item, ...data]);
    } else {
      simpan(data.map((b) => (b.id === item.id ? item : b)));
    }
    setForm(null);
    setPesan("Berita tersimpan.");
  };

  const hapus = (b) => {
    if (confirm(`Hapus berita "${b.title}"?`)) { simpan(data.filter((x) => x.id !== b.id)); setPesan("Berita dihapus."); }
  };

  const geser = (i, arah) => {
    const j = i + arah;
    if (j < 0 || j >= data.length) return;
    const salin = [...data];
    [salin[i], salin[j]] = [salin[j], salin[i]];
    simpan(salin);
  };

  const tombol = "rounded-md border-2 border-ink px-2 py-1 text-xs font-bold hover:bg-lime";

  if (form) {
    return (
      <form onSubmit={submit} className="max-w-2xl">
        <h1 className="font-display text-2xl text-forest">{form.baru ? "Tambah Berita" : "Edit Berita"}</h1>
        <div className="mt-4">
          <Field label="Judul" id="title" value={form.title} onChange={ubah} required />
          <Field label="Tanggal" id="date" value={form.date} onChange={ubah} placeholder="contoh: 10 Oktober 2026" />
          <Field label="Kategori" id="category" value={form.category} onChange={ubah} />
          <Field label="Ringkasan (tampil di kartu)" id="excerpt" textarea rows={3} value={form.excerpt} onChange={ubah} required />
          <Field label="Path foto" id="image" value={form.image} onChange={ubah} placeholder="/images/news/berita-1.jpg" hint="Kosongkan bila tidak ada foto. File harus sudah ada di public/images/news/." />
          <Field label="Isi berita" id="konten" textarea rows={10} value={form.konten} onChange={ubah} hint="Pisahkan paragraf dengan satu baris kosong." required />
          <Field label="Alamat sumber (opsional)" id="sumber" value={form.sumber} onChange={ubah} placeholder="https://..." />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="rounded-md bg-forest px-4 py-2 font-bold text-ivory hover:bg-ink">Simpan</button>
          <button type="button" onClick={() => setForm(null)} className="rounded-md border-2 border-ink px-4 py-2 font-bold">Batal</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-forest">Berita</h1>
        <button type="button" onClick={() => { setPesan(""); setForm({ ...kosong }); }} className="rounded-md bg-forest px-4 py-2 font-bold text-ivory hover:bg-ink">+ Tambah berita</button>
      </div>
      <p className="mt-1 text-sm">Urutan di sini = urutan tampil di website. Tiga teratas muncul di Home.</p>
      {pesan && <p role="status" className="mt-3 bg-lime px-3 py-2 text-sm font-bold">{pesan}</p>}
      <ul className="mt-4 divide-y-2 divide-ink border-2 border-ink bg-white">
        {data.map((b, i) => (
          <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{b.title}</p>
              <p className="text-xs opacity-70">{b.date} · {b.category}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              <button type="button" className={tombol} onClick={() => geser(i, -1)} aria-label="Naikkan">↑</button>
              <button type="button" className={tombol} onClick={() => geser(i, 1)} aria-label="Turunkan">↓</button>
              <button type="button" className={tombol} onClick={() => { setPesan(""); edit(b); }}>Edit</button>
              <button type="button" className="rounded-md border-2 border-red-700 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-700 hover:text-white" onClick={() => hapus(b)}>Hapus</button>
            </div>
          </li>
        ))}
        {data.length === 0 && <li className="p-3 text-sm">Belum ada berita.</li>}
      </ul>
    </div>
  );
}
