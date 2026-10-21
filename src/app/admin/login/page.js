"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/admin/Field";
import { cekLogin, sudahLogin } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { if (sudahLogin()) router.replace("/admin"); }, [router]);

  const submit = (e) => {
    e.preventDefault();
    if (cekLogin(user.trim(), pass)) router.push("/admin");
    else setError("Username atau password salah.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm border-4 border-lime bg-ivory p-6">
        <h1 className="font-display text-2xl text-forest">Login Admin</h1>
        <p className="mb-6 text-sm">SMA Negeri 9 Semarang</p>
        <Field label="Username" id="user" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" required />
        <Field label="Password" id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" required />
        {error && <p role="alert" className="mb-4 text-sm font-bold text-red-700">{error}</p>}
        <button type="submit" className="w-full rounded-md bg-forest px-4 py-3 font-bold text-ivory hover:bg-ink">Masuk</button>
        <Link href="/" className="mt-4 inline-block text-sm underline">← Kembali ke website</Link>
      </form>
    </div>
  );
}
