import { useEffect, useState } from 'react';
import { api } from './utils/api.js';
import Login from './components/Login.jsx';
import Hub from './components/Hub.jsx';
import { SpkSpiral } from './components/SpkLogo.jsx';

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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <SpkSpiral className="spiral-bg w-20 h-20 text-white opacity-40" />
      </div>
    );
  }

  if (!user) {
    return <Login onAuth={setUser} />;
  }

  return <Hub user={user} onLogout={() => setUser(null)} />;
}
