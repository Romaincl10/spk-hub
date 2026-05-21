export default function ToolCard({ tool }) {
  const isProd = tool.status === 'prod';

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#e63946]/60 rounded-lg p-6 transition relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-60 group-hover:opacity-100"
        style={{ background: tool.accent }}
      />

      <div className="flex items-start justify-between mb-3">
        <div className="logo-spk text-xl text-white">{tool.name}</div>
        <span
          className={
            'text-[10px] uppercase tracking-wider px-2 py-1 rounded ' +
            (isProd ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400')
          }
        >
          {isProd ? 'Prod' : 'Beta'}
        </span>
      </div>

      <p className="text-white/55 text-sm leading-relaxed mb-6 min-h-[3rem]">
        {tool.description}
      </p>

      <div className="flex items-center text-white/40 group-hover:text-white text-xs uppercase tracking-wider transition">
        Ouvrir
        <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}
