"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { berita as beritaAwal } from "@/data/berita";
import { ekskul as ekskulAwal } from "@/data/ekskul";
import { sekolah as sekolahAwal } from "@/data/sekolah";

// Data diambil dari Supabase. Jika koneksi gagal / tabel kosong, dipakai data awal dari src/data/*.js
const AWAL = { berita: beritaAwal, ekskul: ekskulAwal, sekolah: sekolahAwal };
const EVENT = "sman9-update";
const DOMAIN = process.env.NEXT_PUBLIC_ADMIN_EMAIL_DOMAIN || "sman9.test";

function normalisasi(nama, d) {
  if (nama === "sekolah") {
    if (!d || typeof d !== "object" || Array.isArray(d)) return AWAL.sekolah;
    return {
      ...AWAL.sekolah, ...d,
      foto: { ...AWAL.sekolah.foto, ...d.foto },
      sambutan: { ...AWAL.sekolah.sambutan, ...d.sambutan },
    };
  }
  return Array.isArray(d) && d.length > 0 ? d : AWAL[nama];
}

async function muat(nama) {
  if (!supabase) return null;
  try {
    if (nama === "sekolah") {
      const { data, error } = await supabase.from("sekolah").select("data").eq("id", 1).maybeSingle();
      return error || !data ? null : data.data;
    }
    const { data, error } = await supabase.from(nama).select("*").order("urutan", { ascending: true });
    if (error || !data || data.length === 0) return null;
    if (nama === "berita") {
      return data.map((r) => ({
        id: r.id, category: r.category, title: r.title, date: r.date, excerpt: r.excerpt,
        image: r.image || null, sumber: r.sumber || undefined, content: Array.isArray(r.content) ? r.content : [],
      }));
    }
    return data.map((r) => ({ id: r.id, nama: r.nama, kategori: r.kategori, deskripsi: r.deskripsi, jadwal: r.jadwal }));
  } catch {
    return null;
  }
}

// Menghindari permintaan ganda: beberapa komponen meminta data yang sama dalam satu halaman.
const memo = {};
function ambil(nama, paksa = false) {
  const m = memo[nama];
  if (!paksa && m && Date.now() - m.t < 3000) return m.p;
  const p = muat(nama);
  memo[nama] = { t: Date.now(), p };
  return p;
}

async function tulis(nama, d) {
  if (!supabase) throw new Error("Supabase belum dikonfigurasi (cek environment variable).");
  if (nama === "sekolah") {
    const { error } = await supabase.from("sekolah").upsert({ id: 1, data: d });
    if (error) throw error;
    return;
  }
  const baris = d.map((x, i) =>
    nama === "berita"
      ? { id: x.id, urutan: i, category: x.category ?? "", title: x.title, date: x.date ?? "", excerpt: x.excerpt ?? "", image: x.image || "", sumber: x.sumber || "", content: x.content ?? [] }
      : { id: x.id, urutan: i, nama: x.nama, kategori: x.kategori ?? "", deskripsi: x.deskripsi ?? "", jadwal: x.jadwal ?? "" }
  );
  if (baris.length) {
    const { error } = await supabase.from(nama).upsert(baris);
    if (error) throw error;
  }
  const ids = d.map((x) => x.id);
  const hapus = supabase.from(nama).delete();
  const { error: e2 } = ids.length
    ? await hapus.not("id", "in", `(${ids.map((i) => `"${i}"`).join(",")})`)
    : await hapus.neq("id", "");
  if (e2) throw e2;
}

// Hook data: "berita" | "ekskul" | "sekolah"
export function useStore(nama) {
  const [data, setData] = useState(AWAL[nama]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    let hidup = true;
    const segarkan = () => ambil(nama).then((d) => { if (hidup) { setData(normalisasi(nama, d)); setSiap(true); } });
    segarkan();
    window.addEventListener(EVENT, segarkan);
    return () => { hidup = false; window.removeEventListener(EVENT, segarkan); };
  }, [nama]);

  // Mengembalikan true jika berhasil disimpan ke database.
  const simpan = useCallback(async (d) => {
    setData(normalisasi(nama, d));
    try {
      await tulis(nama, d);
      await ambil(nama, true);
      window.dispatchEvent(new Event(EVENT));
      return true;
    } catch (e) {
      alert("Gagal menyimpan ke database: " + (e?.message || e));
      ambil(nama, true).then(() => window.dispatchEvent(new Event(EVENT)));
      return false;
    }
  }, [nama]);

  // Mengembalikan isi database ke data awal dari file src/data/*.js
  const reset = useCallback(() => simpan(AWAL[nama]), [simpan, nama]);

  return { data, simpan, reset, siap };
}

// ---------- Login admin lewat Supabase Auth ----------
// Dosen cukup mengetik username; domain email ditambahkan otomatis. Mengetik email lengkap juga boleh.
export async function cekLogin(user, pass) {
  if (!supabase) return { ok: false, pesan: "Nilai dari .env.local tidak terbaca (URL atau key kosong)." };
  const email = user.includes("@") ? user : `${user}@${DOMAIN}`;
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return { ok: false, pesan: `Supabase menjawab: "${error.message}" (status ${error.status ?? "-"}). Email yang dicoba: ${email}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, pesan: "Tidak bisa menghubungi Supabase: " + (e?.message || e) };
  }
}
export async function sudahLogin() {
  if (!supabase) return false;
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}
export async function logout() {
  if (supabase) await supabase.auth.signOut();
}

export function buatSlug(teks, sudahAda) {
  const dasar = teks.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "berita";
  let s = dasar, n = 2;
  while (sudahAda.includes(s)) s = `${dasar}-${n++}`;
  return s;
}
