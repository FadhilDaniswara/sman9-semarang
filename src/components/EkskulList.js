"use client";
import SectionHeading from "./SectionHeading";
import EkskulCard from "./EkskulCard";
import { useStore } from "@/lib/store";

const tilts = ["md:-rotate-1", "md:mt-6", "md:rotate-1", "md:-rotate-1", "md:mt-4"];

export default function EkskulList() {
  const { data } = useStore("ekskul");
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading as="h1" kicker="berkarya di luar kelas" title="Ekstrakurikuler" />
      {data.length === 0 && <p>Belum ada ekstrakurikuler.</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((e, i) => <EkskulCard key={e.id} item={e} tilt={tilts[i % tilts.length]} />)}
      </div>
    </div>
  );
}
