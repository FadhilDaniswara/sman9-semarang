"use client";
import { useState } from "react";
import Field from "@/components/admin/Field";
import { useStore } from "@/lib/store";

const kosong = { id: "", nama: "", kategori: "", deskripsi: "", jadwal: "", baru: true };

export default function AdminEkskul() {
  const { data, simpan } = useStore("ekskul");
  const [form, setForm] = useState(null);
  const [pesan, setPesan] = useState("");

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const item = {
      id: form.baru ? `ekskul-${Date.now()}` : form.id,
      nama: form.nama.trim(), kategori: form.kategori.trim() || "Umum",
      deskripsi: form.deskripsi.trim(), jadwal: form.jadwal.trim() || "Jadwal akan diperbarui",
    };
    simpan(form.baru ? [...data, item] : data.map((x) => (x.id === item.id ? item : x)));
    setForm(null);
    setPesan("Ekskul tersimpan.");
  };

  const hapus = (x) => {
    if (confirm(`Hapus ekskul "${x.nama}"?`)) { simpan(data.filter((d) => d.id !== x.id)); setPesan("Ekskul dihapus."); }
  };

  if (form) {
    return (
      <form onSubmit={submit} className="max-w-xl">
        <h1 className="font-display text-2xl text-forest">{form.baru ? "Tambah Ekskul" : "Edit Ekskul"}</h1>
        <div className="mt-4">
          <Field label="Nama" id="nama" value={form.nama} onChange={ubah} required />
          <Field label="Kategori" id="kategori" value={form.kategori} onChange={ubah} placeholder="Olahraga / Seni / Kepanduan ..." />
          <Field label="Deskripsi" id="deskripsi" textarea rows={4} value={form.deskripsi} onChange={ubah} required />
          <Field label="Jadwal" id="jadwal" value={form.jadwal} onChange={ubah} placeholder="Setiap Hari Rabu" />
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
        <h1 className="font-display text-3xl text-forest">Ekstrakurikuler</h1>
        <button type="button" onClick={() => { setPesan(""); setForm({ ...kosong }); }} className="rounded-md bg-forest px-4 py-2 font-bold text-ivory hover:bg-ink">+ Tambah ekskul</button>
      </div>
      {pesan && <p role="status" className="mt-3 bg-lime px-3 py-2 text-sm font-bold">{pesan}</p>}
      <ul className="mt-4 divide-y-2 divide-ink border-2 border-ink bg-white">
        {data.map((x) => (
          <li key={x.id} className="flex flex-wrap items-center justify-between gap-3 p-3">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{x.nama}</p>
              <p className="text-xs opacity-70">{x.kategori} · {x.jadwal}</p>
            </div>
            <div className="flex gap-1">
              <button type="button" className="rounded-md border-2 border-ink px-2 py-1 text-xs font-bold hover:bg-lime" onClick={() => { setPesan(""); setForm({ ...x, baru: false }); }}>Edit</button>
              <button type="button" className="rounded-md border-2 border-red-700 px-2 py-1 text-xs font-bold text-red-700 hover:bg-red-700 hover:text-white" onClick={() => hapus(x)}>Hapus</button>
            </div>
          </li>
        ))}
        {data.length === 0 && <li className="p-3 text-sm">Belum ada ekskul.</li>}
      </ul>
    </div>
  );
}
