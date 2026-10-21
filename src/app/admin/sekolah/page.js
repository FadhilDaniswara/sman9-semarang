"use client";
import { useEffect, useState } from "react";
import Field from "@/components/admin/Field";
import { useStore } from "@/lib/store";

const para = (v) => [].concat(v ?? []).join("\n\n");
const pecah = (t) => t.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

export default function AdminSekolah() {
  const { data, simpan, siap } = useStore("sekolah");
  const [f, setF] = useState(null);
  const [pesan, setPesan] = useState("");

  useEffect(() => {
    if (siap && !f) {
      setF({
        tagline: data.tagline ?? "", profil: data.profil ?? "", visi: data.visi ?? "", sejarah: para(data.sejarah),
        alamat: data.alamat ?? "", kontak: data.kontak ?? "", npsn: data.npsn ?? "", mapsUrl: data.mapsUrl ?? "",
        sambutanJudul: data.sambutan.judul ?? "", sambutanTeks: para(data.sambutan.teks),
        penulis: data.sambutan.penulis ?? "", jabatan: data.sambutan.jabatan ?? "",
      });
    }
  }, [siap, f, data]);

  if (!f) return <p>Memuat…</p>;
  const ubah = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    simpan({
      ...data,
      tagline: f.tagline.trim(), profil: f.profil.trim(),
      visi: f.visi.trim() || null,
      sejarah: f.sejarah.trim() ? pecah(f.sejarah) : null,
      alamat: f.alamat.trim() || null, kontak: f.kontak.trim() || null,
      npsn: f.npsn.trim() || null, mapsUrl: f.mapsUrl.trim() || null,
      sambutan: { ...data.sambutan, judul: f.sambutanJudul.trim() || "Sambutan", teks: pecah(f.sambutanTeks), penulis: f.penulis.trim(), jabatan: f.jabatan.trim() },
    });
    setPesan("Data sekolah tersimpan.");
  };

  return (
    <form onSubmit={submit} className="max-w-2xl">
      <h1 className="font-display text-3xl text-forest">Data Sekolah</h1>
      <p className="mb-4 mt-1 text-sm">Misi dan fasilitas tidak diubah dari sini (tetap dari data awal).</p>
      {pesan && <p role="status" className="mb-4 bg-lime px-3 py-2 text-sm font-bold">{pesan}</p>}
      <Field label="Tagline (hero)" id="tagline" value={f.tagline} onChange={ubah} />
      <Field label="Profil singkat" id="profil" textarea rows={3} value={f.profil} onChange={ubah} />
      <Field label="Judul sambutan" id="sambutanJudul" value={f.sambutanJudul} onChange={ubah} />
      <Field label="Teks sambutan" id="sambutanTeks" textarea rows={8} value={f.sambutanTeks} onChange={ubah} hint="Pisahkan paragraf dengan satu baris kosong." />
      <Field label="Nama penyampai sambutan" id="penulis" value={f.penulis} onChange={ubah} />
      <Field label="Jabatan" id="jabatan" value={f.jabatan} onChange={ubah} />
      <Field label="Sejarah" id="sejarah" textarea rows={8} value={f.sejarah} onChange={ubah} hint="Pisahkan paragraf dengan satu baris kosong." />
      <Field label="Visi" id="visi" textarea rows={3} value={f.visi} onChange={ubah} />
      <Field label="Alamat" id="alamat" value={f.alamat} onChange={ubah} />
      <Field label="Kontak" id="kontak" value={f.kontak} onChange={ubah} />
      <Field label="NPSN" id="npsn" value={f.npsn} onChange={ubah} />
      <Field label="Link Google Maps" id="mapsUrl" value={f.mapsUrl} onChange={ubah} />
      <button type="submit" className="rounded-md bg-forest px-4 py-2 font-bold text-ivory hover:bg-ink">Simpan</button>
    </form>
  );
}
