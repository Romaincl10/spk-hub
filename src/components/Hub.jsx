import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import CapsulePanel from './CapsulePanel.jsx';

function Arrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Capsule({ capsule, index, onOpen }) {
  const live = capsule.tools.filter(t => t.status === 'prod').length;
  const total = capsule.tools.length;
  return (
    <button
      type="button"
      onClick={() => onOpen(capsule)}
      style={{ animationDelay: `${0.25 + index * 0.08}s` }}
      className="capsule rise group relative w-full border border-white text-white text-left
                 flex items-center gap-5 px-7 py-6
                 lg:flex-col lg:items-center lg:justify-between lg:text-center lg:px-8 lg:py-12 lg:h-[30rem]"
    >
      <span className="text-xs font-semibold tracking-[0.3em] opacity-60 lg:order-1">{capsule.code}</span>

      <span className="display text-2xl sm:text-3xl lg:text-[clamp(1.2rem,2.05vw,2.4rem)] flex-1 lg:flex-none lg:order-2 break-words hyphens-auto">
        {capsule.title}
      </span>

      <span className="flex items-center gap-4 lg:flex-col lg:order-3">
        <span className="hidden sm:block text-[11px] uppercase tracking-[0.2em] opacity-60">
          {live}/{total} en ligne
        </span>
        <span className="capsule-arrow w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-current flex items-center justify-center shrink-0">
          <Arrow className="w-5 h-5 lg:w-6 lg:h-6" />
        </span>
      </span>
    </button>
  );
}

export default function Hub({ user, onLogout }) {
  const [data, setData] = useState({ capsules: [], pilotage: [] });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    api.tools()
      .then(d => setData({ capsules: d.capsules || [], pilotage: d.pilotage || [] }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    try { await api.logout(); } catch {}
    onLogout();
  }

  const firstName = (user.name || '').split(' ')[0];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="px-4 sm:px-10 py-6 flex items-center justify-between text-[11px] uppercase tracking-[0.3em]">
        <span className="font-semibold">SPK Group</span>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-white/50">{user.name}</span>
          <button onClick={handleLogout} className="text-white/70 hover:text-white underline-offset-4 hover:underline">
            Déconnexion
          </button>
        </div>
      </header>

      {/* Hero : logo géant */}
      <section className="px-4 sm:px-10 pt-6 sm:pt-10 pb-12 sm:pb-16">
        <div className="relative select-none">
          <h1 className="logo-spk hero-logo rise text-white -ml-[0.04em]">SPK</h1>
          <div className="rise flex items-end justify-between gap-6 mt-4 sm:mt-6" style={{ animationDelay: '.12s' }}>
            <span className="logo-spk text-outline text-[clamp(3rem,12vw,10rem)]">HUB</span>
            <p className="max-w-xs text-right text-sm sm:text-base text-white/60 leading-snug pb-2">
              Bonjour {firstName}.<br />Toutes les plateformes SPK, en quatre capsules.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-4 sm:mx-10 h-px bg-white/20" />

      {/* Capsules */}
      <main className="px-4 sm:px-10 py-12 sm:py-16 flex-1">
        {loading ? (
          <div className="text-white/40 text-sm uppercase tracking-[0.3em]">Chargement…</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5">
            {data.capsules.map((c, i) => (
              <Capsule key={c.id} capsule={c} index={i} onOpen={setOpen} />
            ))}
          </div>
        )}

        {data.pilotage.length > 0 && (
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 shrink-0">Pilotage</span>
            <div className="flex flex-wrap gap-3">
              {data.pilotage.map(t => (
                <a
                  key={t.id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-white/30 hover:border-white hover:bg-white hover:text-black rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition"
                >
                  {t.name}
                  <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="px-4 sm:px-10 py-8 flex justify-between text-[11px] uppercase tracking-[0.3em] text-white/30">
        <span>SPK Group · Hub interne</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

      {open && <CapsulePanel capsule={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
