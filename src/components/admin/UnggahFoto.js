"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

// Memperkecil gambar (maks 1600 px) sebelum diunggah agar hemat penyimpanan.
async function kecilkan(file, maks = 1600) {
  const bmp = await createImageBitmap(file);
  const skala = Math.min(1, maks / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * skala);
  c.height = Math.round(bmp.height * skala);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((ok, gagal) => c.toBlob((b) => (b ? ok(b) : gagal(new Error("Gambar tidak bisa diproses"))), "image/jpeg", 0.85));
}

export default function UnggahFoto({ value, onUploaded }) {
  const [status, setStatus] = useState("");
  const pilih = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setStatus("File harus berupa gambar.");
    if (!supabase) return setStatus("Supabase belum dikonfigurasi.");
    setStatus("Mengunggah…");
    try {
      const blob = await kecilkan(file);
      const path = `berita/${Date.now()}.jpg`;
      const { error } = await supabase.storage.from("foto").upload(path, blob, { contentType: "image/jpeg" });
      if (error) throw error;
      onUploaded(supabase.storage.from("foto").getPublicUrl(path).data.publicUrl);
      setStatus("Foto terunggah. Klik Simpan untuk menyimpan berita.");
    } catch (err) {
      setStatus("Gagal mengunggah: " + (err?.message || err));
    }
  };
  return (
    <div className="mb-4">
      <label htmlFor="unggah" className="mb-1 block text-sm font-bold">Atau unggah foto baru</label>
      <input id="unggah" type="file" accept="image/*" onChange={pilih} className="block w-full text-sm" />
      {status && <p role="status" className="mt-1 text-xs font-bold">{status}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Pratinjau foto berita" className="mt-2 h-24 w-auto border-2 border-ink object-cover" />
      )}
    </div>
  );
}
