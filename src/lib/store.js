"use client";
import { useCallback, useEffect, useState } from "react";
import { berita as beritaAwal } from "@/data/berita";
import { ekskul as ekskulAwal } from "@/data/ekskul";
import { sekolah as sekolahAwal } from "@/data/sekolah";

// Login admin (demo tugas kuliah). Catatan: tersimpan di kode, BUKAN keamanan sungguhan.
export const ADMIN_USER = "adminjosjis";
export const ADMIN_PASS = "josjisjus";
const AUTH_KEY = "sman9_admin";
const KEYS = { berita: "sman9_berita", ekskul: "sman9_ekskul", sekolah: "sman9_sekolah" };
const AWAL = { berita: beritaAwal, ekskul: ekskulAwal, sekolah: sekolahAwal };
const EVENT = "sman9-update";

function normalisasi(nama, d) {
  if (nama === "sekolah") {
    if (!d || typeof d !== "object" || Array.isArray(d)) return AWAL.sekolah;
    return {
      ...AWAL.sekolah, ...d,
      foto: { ...AWAL.sekolah.foto, ...d.foto },
      sambutan: { ...AWAL.sekolah.sambutan, ...d.sambutan },
    };
  }
  return Array.isArray(d) ? d : AWAL[nama];
}

function baca(nama) {
  try {
    const r = window.localStorage.getItem(KEYS[nama]);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}

// Hook data: "berita" | "ekskul" | "sekolah". Awalnya data bawaan, lalu diganti isi localStorage bila ada.
export function useStore(nama) {
  const [data, setData] = useState(AWAL[nama]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    const muat = () => { setData(normalisasi(nama, baca(nama))); setSiap(true); };
    muat();
    window.addEventListener(EVENT, muat);
    window.addEventListener("storage", muat);
    return () => { window.removeEventListener(EVENT, muat); window.removeEventListener("storage", muat); };
  }, [nama]);

  const simpan = useCallback((d) => {
    try { window.localStorage.setItem(KEYS[nama], JSON.stringify(d)); }
    catch { alert("Gagal menyimpan: penyimpanan browser penuh atau dinonaktifkan."); return; }
    window.dispatchEvent(new Event(EVENT));
  }, [nama]);

  const reset = useCallback(() => {
    try { window.localStorage.removeItem(KEYS[nama]); } catch {}
    window.dispatchEvent(new Event(EVENT));
  }, [nama]);

  return { data, simpan, reset, siap };
}

export function cekLogin(user, pass) {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    try { window.localStorage.setItem(AUTH_KEY, "1"); } catch {}
    return true;
  }
  return false;
}
export function sudahLogin() {
  try { return window.localStorage.getItem(AUTH_KEY) === "1"; } catch { return false; }
}
export function logout() {
  try { window.localStorage.removeItem(AUTH_KEY); } catch {}
}

export function buatSlug(teks, sudahAda) {
  const dasar = teks.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "berita";
  let s = dasar, n = 2;
  while (sudahAda.includes(s)) s = `${dasar}-${n++}`;
  return s;
}
