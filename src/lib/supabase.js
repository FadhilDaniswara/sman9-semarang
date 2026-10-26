import { createClient } from "@supabase/supabase-js";

// Nilai diisi lewat Environment Variables (.env.local di komputer, Settings > Environment Variables di Vercel).
// Hanya memakai kunci PUBLIK (anon / publishable). JANGAN pernah memasukkan service_role di sini.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Hanya untuk diagnosis di halaman login (nilai ini memang publik).
export const konfig = { url: url || "", keyAwal: key ? key.slice(0, 15) : "" };

export const supabase = url && key ? createClient(url, key) : null;
