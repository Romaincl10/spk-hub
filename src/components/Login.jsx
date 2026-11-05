import { useState } from 'react';
import { api } from '../utils/api.js';
import { SpkLogo, SpkSpiral } from './SpkLogo.jsx';

export default function Login({ onAuth }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const { user } = await api.login(login.trim(), password);
      onAuth(user);
    } catch (err) {
      setError(err.message || 'Connexion impossible');
    } finally {
      setSubmitting(false);
    }
  }

  const input = 'w-full bg-transparent border-0 border-b border-white/30 focus:border-white px-0 py-3 text-white text-lg focus:outline-none transition';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-4 sm:px-10 py-6 relative overflow-hidden">
      <SpkSpiral
        className="spiral-bg pointer-events-none absolute text-white opacity-[0.07]
                   w-[140vw] h-[140vw] -right-[70vw] -bottom-[50vw]
                   lg:w-[70vw] lg:h-[70vw] lg:-right-[20vw] lg:-bottom-[25vw]"
      />

      <div className="relative label">SPK Group</div>

      <div className="relative flex-1 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center py-10">
        <div className="select-none">
          <SpkLogo className="rise block w-full max-w-[760px] h-auto" />
          <div className="rise mt-8 flex items-stretch gap-6" style={{ animationDelay: '.12s' }}>
            <span className="display text-[clamp(1.6rem,4vw,3.5rem)] tracking-[0.35em] leading-none">Hub</span>
            <span className="w-px bg-white/40" />
            <span className="label text-white/60 self-center">Portail interne</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rise w-full max-w-sm lg:justify-self-end space-y-8" style={{ animationDelay: '.2s' }}>
          <div>
            <label className="block label text-white/50">Identifiant</label>
            <input type="text" value={login} onChange={e => setLogin(e.target.value)} autoFocus autoComplete="username" className={input} />
          </div>
          <div>
            <label className="block label text-white/50">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" className={input} />
          </div>

          {error && <div className="text-sm text-white border-l-2 border-white pl-3">{error}</div>}

          <button
            type="submit"
            disabled={submitting || !login || !password}
            className="w-full rounded-full border border-white bg-white text-black hover:bg-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-bold uppercase tracking-[0.2em] text-sm py-4 transition"
          >
            {submitting ? 'Connexion…' : 'Entrer'}
          </button>
        </form>
      </div>
    </div>
  );
}
