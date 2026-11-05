import { useRef, useState } from 'react';
import { api } from '../utils/api.js';
import { BrandMark, SpkSpiral } from './SpkLogo.jsx';

function Field({ id, label, type = 'text', value, onChange, autoComplete, autoFocus, trailing }) {
  return (
    <div className="field group relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder=" "
        className="peer w-full h-16 rounded-2xl bg-white/[0.05] border border-white/10 px-5 pt-5 pr-14 text-[15px] font-medium text-white
                   outline-none transition focus:border-white/60 focus:bg-white/[0.08] hover:border-white/25"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[15px] text-white/45 pointer-events-none transition-all duration-200
                   peer-focus:top-[1.15rem] peer-focus:text-[10px] peer-focus:tracking-[0.2em] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-white/60
                   peer-[:not(:placeholder-shown)]:top-[1.15rem] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.2em]
                   peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-white/60"
      >
        {label}
      </label>
      {trailing && <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div>}
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
  const brandRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { user } = await api.login(login.trim(), password);
      setLeaving(true);
      setTimeout(() => onAuth(user, brandRef.current?.getBoundingClientRect()), 380);
    } catch (err) {
      setError(err.message || 'Connexion impossible');
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      <SpkSpiral className="spiral-bg pointer-events-none absolute text-white opacity-[0.05] w-[150vw] h-[150vw] -right-[75vw] -bottom-[60vw] lg:w-[80vw] lg:h-[80vw] lg:-right-[25vw] lg:-bottom-[35vw]" />
      <div className="glow pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full" />

      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div ref={brandRef} className="rise w-[min(560px,86vw)]">
          <BrandMark className="block w-full h-auto" />
        </div>

        <form
          onSubmit={handleSubmit}
          className={'login-card rise relative mt-14 w-full max-w-[420px] rounded-[2rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6 sm:p-8 ' +
            (leaving ? 'is-leaving' : '')}
          style={{ animationDelay: '.15s' }}
        >
          <div className="flex items-center justify-between mb-7">
            <div>
              <div className="text-lg font-bold">Connexion</div>
              <div className="text-sm text-white/45 mt-0.5">Accès réservé aux équipes SPK</div>
            </div>
            <SpkSpiral className="w-8 h-8 text-white/80" />
          </div>

          <div className="space-y-3">
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/45 hover:text-white hover:bg-white/10 transition"
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
            <div className="mt-4 rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting || !login || !password}
            className="group mt-6 w-full h-14 rounded-2xl bg-white text-black font-bold text-[15px] flex items-center justify-center gap-3
                       hover:bg-white/90 active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <SpkSpiral className="spiral-fast w-6 h-6" />
            ) : (
              <>
                Entrer dans le Hub
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="relative px-4 sm:px-10 py-6 flex justify-between label text-white/30">
        <span>SPK Group</span>
        <span>Portail interne</span>
      </div>
    </div>
  );
}
