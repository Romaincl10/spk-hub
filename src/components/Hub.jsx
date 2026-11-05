import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import CapsulePanel from './CapsulePanel.jsx';
import { SpkLogo, SpkSpiral } from './SpkLogo.jsx';

function Arrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
      className="capsule rise relative w-full border border-white text-white text-left
                 flex items-center gap-5 px-7 py-6
                 lg:flex-col lg:items-center lg:justify-between lg:text-center lg:px-8 lg:py-12 lg:h-[30rem]"
    >
      <span className="flex items-center gap-3 lg:flex-col lg:gap-5 shrink-0">
        <SpkSpiral className="capsule-spiral w-7 h-7 lg:w-10 lg:h-10" />
        <span className="label opacity-60">{capsule.code}</span>
      </span>

      <span className="display text-xl sm:text-2xl lg:text-[clamp(1.15rem,1.8vw,2.1rem)] flex-1 lg:flex-none">
        {capsule.title}
      </span>

      <span className="flex items-center gap-4 lg:flex-col shrink-0">
        <span className="hidden sm:block label opacity-60">{live}/{total} en ligne</span>
        <span className="capsule-arrow w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-current flex items-center justify-center">
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
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Spirale géante, débordant à droite */}
      <SpkSpiral
        className="spiral-bg pointer-events-none absolute text-white opacity-[0.07]
                   w-[140vw] h-[140vw] -right-[90vw] -top-[30vw]
                   lg:w-[75vw] lg:h-[75vw] lg:-right-[22vw] lg:-top-[18vw]"
      />

      <header className="relative px-4 sm:px-10 py-6 flex items-center justify-between label">
        <span>SPK Group</span>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline text-white/50">{user.name}</span>
          <button onClick={handleLogout} className="text-white/70 hover:text-white">Déconnexion</button>
        </div>
      </header>

      {/* Hero : logo officiel en grand */}
      <section className="relative px-4 sm:px-10 pt-10 sm:pt-16 pb-12 sm:pb-20">
        <SpkLogo className="rise block w-full max-w-[1100px] h-auto text-white" />
        <div className="rise mt-8 sm:mt-12 flex items-stretch gap-5 sm:gap-8" style={{ animationDelay: '.12s' }}>
          <span className="display text-[clamp(1.8rem,5vw,4.5rem)] tracking-[0.35em] leading-none">Hub</span>
          <span className="w-px bg-white/40" />
          <p className="text-sm sm:text-base text-white/70 leading-snug self-center">
            Bonjour {firstName}.<br />Toutes les plateformes SPK, en quatre capsules.
          </p>
        </div>
      </section>

      <div className="relative mx-4 sm:mx-10 h-px bg-white/20" />

      <main className="relative px-4 sm:px-10 py-12 sm:py-16 flex-1">
        {loading ? (
          <div className="label text-white/40">Chargement…</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5">
            {data.capsules.map((c, i) => (
              <Capsule key={c.id} capsule={c} index={i} onOpen={setOpen} />
            ))}
          </div>
        )}

        {data.pilotage.length > 0 && (
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <span className="label text-white/40 shrink-0">Pilotage</span>
            <div className="flex flex-wrap gap-3">
              {data.pilotage.map(t => (
                <a
                  key={t.id}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-white/30 hover:border-white hover:bg-white hover:text-black rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition"
                >
                  {t.name}
                  <Arrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="relative px-4 sm:px-10 py-8 flex items-center justify-between label text-white/30">
        <span className="flex items-center gap-3"><SpkSpiral className="w-4 h-4" /> SPK Group · Hub interne</span>
        <span>{new Date().getFullYear()}</span>
      </footer>

      {open && <CapsulePanel capsule={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
