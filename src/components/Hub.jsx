import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import ToolCard from './ToolCard.jsx';

export default function Hub({ user, onLogout }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tools()
      .then(d => setSections(d.sections || []))
      .catch(() => setSections([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    try { await api.logout(); } catch {}
    onLogout();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <div className="logo-spk text-3xl text-white">SPK</div>
            <div className="text-white/40 text-xs tracking-[0.3em] uppercase">Hub</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white text-sm font-semibold">{user.name}</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">{user.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-white/60 hover:text-white text-xs uppercase tracking-wider border border-white/10 hover:border-white/30 rounded px-3 py-2 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-white text-2xl font-bold mb-2">Bonjour {user.name.split(' ')[0]}.</h1>
          <p className="text-white/50">Vos outils.</p>
        </div>

        {loading ? (
          <div className="text-white/40">Chargement…</div>
        ) : (
          <div className="space-y-12">
            {sections.map(section => (
              <section key={section.id}>
                <div className="flex items-baseline gap-3 mb-5">
                  <h2 className="text-white/80 text-xs uppercase tracking-[0.25em] font-semibold">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs">
                    {section.tools.length} {section.tools.length > 1 ? 'outils' : 'outil'}
                  </span>
                </div>

                {section.tools.length === 0 ? (
                  <div className="border border-dashed border-white/10 rounded-lg p-8 text-center">
                    <p className="text-white/30 text-sm">Aucun outil pour l'instant.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.tools.map(t => <ToolCard key={t.id} tool={t} />)}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-white/30 text-xs">
        SPK Group · Hub interne
      </footer>
    </div>
  );
}
