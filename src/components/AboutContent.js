"use client";
import SectionHeading from "./SectionHeading";
import PhotoSlot from "./PhotoSlot";
import { useStore } from "@/lib/store";
import { PLACEHOLDER } from "@/data/sekolah";

const Blok = ({ kicker, title, children }) => (
  <section className="mx-auto max-w-6xl px-4 py-10">
    <SectionHeading kicker={kicker} title={title} />
    {children}
  </section>
);
const Kosong = () => <p className="italic">{PLACEHOLDER}</p>;

export default function AboutContent() {
  const { data: s } = useStore("sekolah");
  const sejarah = s.sejarah ? [].concat(s.sejarah) : [];
  return (
    <>
      <header className="bg-forest py-14 text-ivory">
        <div className="mx-auto max-w-6xl px-4">
          <p className="font-hand text-2xl text-lime">tentang kami</p>
          <h1 className="font-display text-4xl sm:text-6xl">Profil Sekolah</h1>
          <p className="mt-4 max-w-xl">Mengenal {s.nama}: sejarah, visi misi, lingkungan, dan identitas sekolah.</p>
        </div>
      </header>
      <Blok kicker="siapa kami" title="Profil Sekolah"><p className="max-w-3xl leading-relaxed">{s.profil}</p></Blok>
      <Blok kicker="dulu & kini" title="Sejarah">
        {sejarah.length > 0 ? <div className="max-w-3xl space-y-4 leading-relaxed">{sejarah.map((p, i) => <p key={i}>{p}</p>)}</div> : <Kosong />}
      </Blok>
      <Blok kicker="arah kita" title="Visi dan Misi">
        {s.visi ? <blockquote className="border-l-8 border-lime pl-5 font-display text-2xl text-forest">{s.visi}</blockquote> : <Kosong />}
        {s.misi.length > 0 && <ol className="mt-6 list-decimal space-y-2 pl-6">{s.misi.map((m) => <li key={m}>{m}</li>)}</ol>}
      </Blok>
      <Blok kicker="suasana" title="Lingkungan Sekolah">
        <div className="aspect-[16/9] max-w-3xl border-8 border-ivory outline outline-2 outline-ink">
          <PhotoSlot src={s.foto.upacara} alt="Upacara di lingkungan SMA Negeri 9 Semarang" label="Foto upacara belum tersedia" />
        </div>
      </Blok>
      <Blok kicker="sarana" title="Fasilitas">
        {s.fasilitas.length > 0 ? <ul className="grid gap-2 sm:grid-cols-2">{s.fasilitas.map((f) => <li key={f} className="border-2 border-ink p-3">{f}</li>)}</ul> : <Kosong />}
      </Blok>
      <Blok kicker="lokasi" title="Alamat"><p>{s.alamat ?? "[Alamat belum diverifikasi] " + PLACEHOLDER}</p></Blok>
      <Blok kicker="data resmi" title="Identitas Sekolah">
        <dl className="grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-2">
          <dt className="font-bold">Nama</dt><dd>{s.nama}</dd>
          <dt className="font-bold">NPSN</dt><dd>{s.npsn ?? "[belum diverifikasi]"}</dd>
          <dt className="font-bold">Alamat</dt><dd>{s.alamat ?? "[belum diverifikasi]"}</dd>
          <dt className="font-bold">Kontak</dt><dd>{s.kontak ?? "[belum tersedia]"}</dd>
        </dl>
      </Blok>
    </>
  );
}
