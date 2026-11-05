import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import { SpkLogo, SpkSpiral } from './SpkLogo.jsx';

function Arrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function Capsule({ capsule, index, show }) {
  const live = Boolean(capsule.url);
  const Tag = live ? 'a' : 'div';
  const linkProps = live ? { href: capsule.url, target: '_blank', rel: 'noopener noreferrer' } : { 'aria-disabled': 'true' };
  return (
    <Tag
      {...linkProps}
      style={{ animationDelay: `${index * 0.09}s` }}
      className={(live ? 'capsule ' : 'capsule-off cursor-not-allowed ') +
        'group relative w-full text-left overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.03] text-white ' +
        'flex flex-col justify-between gap-8 p-7 sm:p-8 min-h-[15rem] md:min-h-[21rem] xl:min-h-0 xl:h-full ' + (show ? 'capsule-in' : 'opacity-0')}
    >
      {/* grande spirale dans le coin */}
      <SpkSpiral className="capsule-spiral-bg pointer-events-none absolute -right-16 -bottom-16 w-64 h-64 opacity-[0.06]" />

      <div className="relative flex items-start justify-between">
        <span className="kicker !text-current opacity-60 pt-1 whitespace-nowrap">Capsule {capsule.code}</span>
        {live ? (
          <span className="capsule-arrow w-12 h-12 rounded-full border border-current/30 flex items-center justify-center shrink-0">
            <Arrow className="w-5 h-5 -rotate-45" />
          </span>
        ) : (
          <span className="rounded-full border border-white/25 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Bientôt</span>
        )}
      </div>

      <div className={'relative ' + (live ? '' : 'opacity-45')}>
        <SpkSpiral className="capsule-spiral w-9 h-9 mb-5 lg:mb-7" />
        <h2 className="display text-[2rem] sm:text-[2.4rem] xl:text-[clamp(1.5rem,1.9vw,2.7rem)]">
          {capsule.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed opacity-60 max-w-[26ch]">{capsule.tagline}</p>
      </div>

      <div className="relative border-t border-current/15 pt-5 flex items-center justify-between gap-3">
        {live ? (
          <>
            <span className="text-[13px] font-bold">{capsule.platform}</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-55">Ouvrir</span>
          </>
        ) : (
          <span className="text-[13px] font-medium text-white/40">Plateforme en préparation</span>
        )}
      </div>
    </Tag>
  );
}

export default function Hub({ user, stage = 'done', brandRef, onLogout }) {
  const [data, setData] = useState({ capsules: [] });

  useEffect(() => {
    api.tools()
      .then(d => setData({ capsules: d.capsules || [] }))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    try { await api.logout(); } catch {}
    onLogout();
  }

  const intro = stage === 'intro';
  const showContent = stage !== 'intro';
  const firstName = (user.name || '').split(' ')[0];

  return (
    <div className="min-h-screen xl:h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
      <div className="glow pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[60vw] max-h-[700px] rounded-full" />

      {/* Message d'accueil pendant l'intro */}
      <div className={'fixed inset-x-0 top-1/2 z-[55] text-center pointer-events-none transition-opacity duration-500 ' + (intro ? 'opacity-100' : 'opacity-0')}
           style={{ marginTop: 'min(16vw, 190px)' }}>
        <span className="tagline text-lg sm:text-2xl">Bonjour {firstName}.</span>
      </div>

      <header className={'relative z-10 px-4 sm:px-8 lg:px-10 pt-6 pb-5 flex items-center justify-between gap-4 transition-opacity duration-500 ' +
        (showContent ? 'opacity-100' : 'opacity-0')}>
        <div className="flex items-center gap-4 shrink-0">
          <div ref={brandRef} className="w-[150px] sm:w-[190px]">
            <SpkLogo className={'block w-full h-auto ' + (stage === 'done' ? 'opacity-100' : 'opacity-0')} />
          </div>
          <span className="w-px h-7 bg-white/40" />
          <span className="display text-2xl sm:text-[1.7rem] leading-none">Hub.</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] pl-1.5 pr-1.5 py-1.5">
            <span className="w-8 h-8 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">
              {(user.name || '?').split(' ').map(s => s[0]).slice(0, 2).join('')}
            </span>
            <span className="hidden sm:inline text-[13px] font-semibold pr-1">{firstName}</span>
            <button onClick={handleLogout} title="Déconnexion" aria-label="Déconnexion"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/55 hover:text-black hover:bg-white transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l-4-4 4-4M6 12h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 min-h-0 px-4 sm:px-8 lg:px-10 pb-6 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:h-full">
          {data.capsules.map((c, i) => (
            <Capsule key={c.id} capsule={c} index={i} show={showContent} />
          ))}
        </div>

      </main>

    </div>
  );
}
