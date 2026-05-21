import { useEffect, useState } from 'react';
import { api } from './utils/api.js';
import Login from './components/Login.jsx';
import Hub from './components/Hub.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me()
      .then(d => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="logo-spk text-5xl text-white opacity-30">SPK</div>
      </div>
    );
  }

  if (!user) {
    return <Login onAuth={setUser} />;
  }

  return <Hub user={user} onLogout={() => setUser(null)} />;
}
