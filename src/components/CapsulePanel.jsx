import { useEffect } from 'react';

function ToolRow({ tool, index }) {
  const live = tool.status === 'prod' && tool.url;
  const content = (
    <>
      <span className="text-xs font-semibold tracking-[0.3em] opacity-50 w-8 shrink-0 pt-1">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex-1 min-w-0">
        <span className="display block text-2xl sm:text-4xl">{tool.name}</span>
        <span className="block mt-2 text-sm opacity-60 max-w-2xl leading-relaxed">{tool.description}</span>
      </span>
      <span className="shrink-0 self-center">
        {live ? (
          <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-current flex items-center justify-center">
            <svg className="w-5 h-5 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.25em] border border-white/30 rounded-full px-3 py-1.5 text-white/50">
            Bientôt
          </span>
        )}
      </span>
    </>
  );

  const cls = 'tool-row flex items-start gap-4 sm:gap-8 border-t border-white/20 px-2 sm:px-4 py-7 sm:py-9';
  return live ? (
    <a href={tool.url} target="_blank" rel="noopener noreferrer" className={cls + ' live'}>
      {content}
    </a>
  ) : (
    <div className={cls + ' text-white/45 cursor-default'} aria-disabled="true">{content}</div>
  );
}

export default function CapsulePanel({ capsule, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="panel-in fixed inset-0 z-50 bg-black overflow-y-auto" role="dialog" aria-modal="true" aria-label={capsule.title}>
      <div className="min-h-full flex flex-col px-4 sm:px-10 py-6">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em]">
          <button onClick={onClose} className="flex items-center gap-3 hover:underline underline-offset-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
            Hub
          </button>
          <span className="text-white/50">Capsule {capsule.code}</span>
        </div>

        <div className="rise pt-12 sm:pt-20 pb-10 sm:pb-14">
          <span className="logo-spk text-outline text-[clamp(4rem,14vw,12rem)] block">{capsule.code}</span>
          <h2 className="display text-[clamp(2.6rem,8vw,7rem)] mt-4">{capsule.title}</h2>
          <p className="mt-6 text-white/60 max-w-xl">{capsule.tagline}</p>
        </div>

        <div className="rise border-b border-white/20" style={{ animationDelay: '.1s' }}>
          {capsule.tools.map((t, i) => <ToolRow key={t.id} tool={t} index={i} />)}
        </div>
      </div>
    </div>
  );
}
