export default function EkskulCard({ item, tilt = "" }) {
  return (
    <article className={`flex flex-col gap-2 border-2 border-ink bg-ivory p-5 transition-transform hover:-translate-y-1 ${tilt}`}>
      <p className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-lime px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-ink">{item.kategori}</span>
        {item.contoh && <span className="rounded border border-ink px-2 py-0.5 text-xs font-bold">Contoh</span>}
      </p>
      <h3 className="font-display text-xl leading-snug text-forest">{item.nama}</h3>
      <p className="text-sm leading-relaxed">{item.deskripsi}</p>
      <p className="mt-auto font-hand text-xl text-forest">{item.jadwal}</p>
    </article>
  );
}
