"use client";
import PhotoSlot from "./PhotoSlot";
import { useStore } from "@/lib/store";

export default function Logo({ size = "h-11 w-11" }) {
  const { data: sekolah } = useStore("sekolah");
  return (
    <span className={`block shrink-0 overflow-hidden rounded-full ${size}`}>
      <PhotoSlot src={sekolah.foto.logo} alt="Logo SMA Negeri 9 Semarang" label="Logo" className="!p-0 !text-[8px]" />
    </span>
  );
}
