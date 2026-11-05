import { useEffect, useRef, useState } from 'react';
import { api } from './utils/api.js';
import Login from './components/Login.jsx';
import Hub from './components/Hub.jsx';
import { SpkLogo, SpkSpiral, LOGO_RATIO } from './components/SpkLogo.jsx';

function heroBox() {
  const w = Math.min(window.innerWidth * 0.7, 860);
  const h = w * LOGO_RATIO;
  return { left: (window.innerWidth - w) / 2, top: (window.innerHeight - h) / 2 - 24, width: w };
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // stage : 'intro' (logo plein écran) → 'settling' (logo file dans l'en-tête, capsules entrent) → 'done'
  const [stage, setStage] = useState('done');
  const [flight, setFlight] = useState(null); // logo volant : {left, top, width, animate}
  const hubBrandRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    api.me()
      .then(d => { setUser(d.user); playIntro(null); }) // session déjà ouverte : l'intro joue aussi
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function handleAuth(u, fromRect) {
    setUser(u);
    playIntro(fromRect || null);
  }

  // Intro de marque : depuis le logo du login (ou apparition au centre), grandit, puis file dans l'en-tête
  function playIntro(fromRect) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const hero = heroBox();
    // 1. point de départ : le logo du login, sinon apparition directe au centre
    setFlight(fromRect
      ? { left: fromRect.left, top: fromRect.top, width: fromRect.width, animate: false }
      : { ...hero, animate: false, appear: true });
    setStage('intro');
    // 2. il grandit / se pose au centre (timer : fonctionne aussi dans un onglet en arrière-plan)
    timers.current.push(setTimeout(() => setFlight(f => ({ ...heroBox(), animate: true, appear: f?.appear })), 40));
    // 3. il rapetisse vers l'en-tête, les 4 capsules prennent la place
    timers.current.push(setTimeout(() => {
      const r = hubBrandRef.current?.getBoundingClientRect();
      if (r) setFlight({ left: r.left, top: r.top, width: r.width, animate: true, landing: true });
      setStage('settling');
      // filet de sécurité si transitionend n'arrive pas
      timers.current.push(setTimeout(finishFlight, 1600));
    }, fromRect ? 1250 : 1400));
  }

  // 4. relais au logo de l'en-tête, à la fin réelle de la transition
  function finishFlight() {
    setFlight(null);
    setStage('done');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <SpkSpiral className="spiral-bg w-16 h-16 text-white opacity-40" />
      </div>
    );
  }

  return (
    <>
      {user
        ? <Hub user={user} stage={stage} brandRef={hubBrandRef} onLogout={() => { setUser(null); setStage('done'); }} />
        : <Login onAuth={handleAuth} />}

      {flight && (
        <div
          className={'brand-flight fixed z-[60] pointer-events-none text-white' + (flight.animate ? ' is-animated' : '') + (flight.appear ? ' is-appearing' : '')}
          style={{ left: flight.left, top: flight.top, width: flight.width }}
          onTransitionEnd={e => { if (flight.landing && e.propertyName === 'width') finishFlight(); }}
        >
          <SpkLogo className="block w-full h-auto" />
        </div>
      )}
    </>
  );
}
