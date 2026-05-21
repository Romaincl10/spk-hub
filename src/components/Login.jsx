import { useState } from 'react';
import { api } from '../utils/api.js';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="logo-spk text-6xl text-white mb-2">SPK</div>
          <div className="text-white/60 text-sm tracking-[0.3em] uppercase">Hub</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Identifiant</label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              autoFocus
              autoComplete="username"
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#e63946] transition"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#e63946] transition"
            />
          </div>

          {error && (
            <div className="text-[#e63946] text-sm py-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting || !login || !password}
            className="w-full bg-[#e63946] hover:bg-[#d62b38] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold uppercase tracking-wider py-3 rounded transition"
          >
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
