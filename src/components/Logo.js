import PhotoSlot from "./PhotoSlot";
import { sekolah } from "@/data/sekolah";
export default function Logo({ size = "h-11 w-11" }) {
  return (
    <span className={`block shrink-0 overflow-hidden rounded-full ${size}`}>
      <PhotoSlot src={sekolah.foto.logo} alt="Logo SMA Negeri 9 Semarang" label="Logo" className="!p-0 !text-[8px]" />
    </span>
  );
}
