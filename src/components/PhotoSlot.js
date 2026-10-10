"use client";
import { useEffect, useRef, useState } from "react";

// Tampilkan foto bila file ada. Kalau path kosong atau file belum ada di public/, tampil placeholder berlabel.
export default function PhotoSlot({ src, alt, label, className = "" }) {
  const [gagal, setGagal] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setGagal(true);
  }, [src]);

  if (src && !gagal) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img ref={ref} src={src} alt={alt} onError={() => setGagal(true)} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={label} className={`flex h-full w-full items-center justify-center bg-sage/40 p-4 text-center font-sans text-xs font-bold uppercase tracking-widest text-forest ${className}`} style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent 0 12px,rgba(18,61,43,.08) 12px 14px)" }}>
      {label}
    </div>
  );
}
