import SectionHeading from "@/components/SectionHeading";
import EkskulCard from "@/components/EkskulCard";
import { ekskul } from "@/data/ekskul";

export const metadata = { title: "Ekstrakurikuler — SMA Negeri 9 Semarang" };
const tilts = ["md:-rotate-1", "md:mt-6", "md:rotate-1", "md:-rotate-1", "md:mt-4"];

export default function EkskulPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading as="h1" kicker="berkarya di luar kelas" title="Ekstrakurikuler" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ekskul.map((e, i) => <EkskulCard key={e.id} item={e} tilt={tilts[i % tilts.length]} />)}
      </div>
    </div>
  );
}
