"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/admin/Field";
import { cekLogin, sudahLogin } from "@/lib/store";
import { konfig } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [proses, setProses] = useState(false);

  useEffect(() => { sudahLogin().then((ok) => { if (ok) router.replace("/admin"); }); }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setProses(true);
    const hasil = await cekLogin(user.trim(), pass);
    setProses(false);
    if (hasil.ok) router.push("/admin");
    else setError(hasil.pesan);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm border-4 border-lime bg-ivory p-6">
        <h1 className="font-display text-2xl text-forest">Login Admin</h1>
        <p className="mb-2 text-sm">SMA Negeri 9 Semarang</p>
        <p className="mb-6 break-all bg-sage/40 p-2 text-xs">
          Diagnosis. URL: {konfig.url || "KOSONG"} · Key: {konfig.keyAwal ? konfig.keyAwal + "…" : "KOSONG"}
        </p>
        <Field label="Username" id="user" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" required />
        <Field label="Password" id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" required />
        {error && <p role="alert" className="mb-4 text-sm font-bold text-red-700">{error}</p>}
        <button type="submit" disabled={proses} className="w-full rounded-md bg-forest px-4 py-3 font-bold text-ivory hover:bg-ink disabled:opacity-60">{proses ? "Memeriksa…" : "Masuk"}</button>
        <Link href="/" className="mt-4 inline-block text-sm underline">← Kembali ke website</Link>
      </form>
    </div>
  );
}
