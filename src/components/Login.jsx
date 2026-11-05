import { useRef, useState } from 'react';
import { api } from '../utils/api.js';
import { SpkLogo, SpkSpiral } from './SpkLogo.jsx';

function Field({ id, label, type = 'text', value, onChange, autoComplete, autoFocus, trailing }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-2.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className="w-full h-14 rounded-2xl bg-white/[0.08] border border-white/35 px-5 pr-14 text-base font-semibold text-white
                     outline-none transition placeholder:text-white/40 hover:border-white/60 focus:border-white focus:bg-white/[0.12]"
        />
        {trailing && <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>}
      </div>
    </div>
  );
}

export default function Login({ onAuth }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const logoRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { user } = await api.login(login.trim(), password);
      setLeaving(true);
      setTimeout(() => onAuth(user, logoRef.current?.getBoundingClientRect()), 380);
    } catch (err) {
      setError(err.message || 'Connexion impossible');
      setSubmitting(false);
    }
  }

  const fade = 'transition-all duration-300 ' + (leaving ? 'opacity-0 translate-y-3 blur-sm' : '');

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col px-4 sm:px-10 py-6">
      <SpkSpiral className="spiral-bg pointer-events-none absolute text-white opacity-[0.05] w-[150vw] h-[150vw] -right-[80vw] -bottom-[60vw] lg:w-[70vw] lg:h-[70vw] lg:-right-[22vw] lg:-bottom-[30vw]" />

      <div className={'relative ' + fade}><span className="kicker">SPK Group // Portail interne</span></div>

      <div className="relative flex-1 grid lg:grid-cols-[1.45fr_1fr] gap-12 lg:gap-20 items-center py-10">
        {/* Gauche : SPK en grand */}
        <div className="select-none">
          <div ref={logoRef} className="rise w-[min(420px,72vw)]">
            <SpkLogo className="block w-full h-auto" />
          </div>
          <div className={'rise ' + fade} style={{ animationDelay: '.12s' }}>
            <h1 className="display hub-outline relative inline-block text-[clamp(7rem,19vw,17rem)] !leading-[0.82] mt-4 lg:mt-6 -ml-[0.04em]">
              <span aria-hidden="true" className="hub-stroke">Hub.</span>
              <span className="hub-fill">Hub<span className="hub-dot">.</span></span>
            </h1>
            <div className="flex items-center gap-4 mt-8 lg:mt-10">
              <span className="h-px w-12 bg-white/40 shrink-0" />
              <p className="text-sm sm:text-[15px] font-medium text-white/55">Toutes les plateformes SPK, en quatre capsules.</p>
            </div>
          </div>
        </div>

        {/* Droite : connexion */}
        <form
          onSubmit={handleSubmit}
          className={'rise w-full max-w-[420px] lg:justify-self-end rounded-[2rem] border border-white/15 bg-white/[0.04] backdrop-blur-xl p-6 sm:p-8 ' + fade}
          style={{ animationDelay: '.2s' }}
        >
          <div className="flex items-center justify-between gap-4 mb-8">
            <span className="display text-2xl">Connexion</span>
            <SpkSpiral className="w-7 h-7 text-white shrink-0" />
          </div>

          <div className="space-y-5">
            <Field id="login" label="Identifiant" value={login} onChange={setLogin} autoComplete="username" autoFocus />
            <Field
              id="password"
              label="Mot de passe"
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                  aria-label={showPwd ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                    <circle cx="12" cy="12" r="3" />
                    {showPwd && <path d="M4 4l16 16" />}
                  </svg>
                </button>
              }
            />
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-white bg-white text-black font-semibold px-4 py-3 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting || !login || !password}
            className="group mt-8 w-full h-14 rounded-2xl bg-white text-black display text-lg flex items-center justify-center gap-3
                       hover:bg-white/90 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <SpkSpiral className="spiral-fast w-6 h-6" />
            ) : (
              <>
                Entrer
                <svg className="w-5 h-5 not-italic transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
