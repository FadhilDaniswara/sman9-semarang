export default function Field({ label, id, textarea = false, rows = 3, hint, ...props }) {
  const base = "w-full border-2 border-ink bg-white px-3 py-2 text-sm";
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-sm font-bold">{label}</label>
      {textarea ? <textarea id={id} name={id} rows={rows} className={base} {...props} /> : <input id={id} name={id} className={base} {...props} />}
      {hint && <p className="mt-1 text-xs opacity-70">{hint}</p>}
    </div>
  );
}
