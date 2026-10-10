export default function SectionHeading({ kicker, title, as: Tag = "h2", dark = false }) {
  return (
    <div className="mb-8">
      {kicker && <p className={`font-hand text-2xl -rotate-1 ${dark ? "text-lime" : "text-forest"}`}>{kicker}</p>}
      <Tag className={`font-display text-3xl leading-tight sm:text-5xl ${dark ? "text-ivory" : "text-forest"}`}>{title}</Tag>
    </div>
  );
}
