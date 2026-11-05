import { useEffect, useRef, useState } from 'react';
import { api } from './utils/api.js';
import Login from './components/Login.jsx';
import Hub from './components/Hub.jsx';
import { BrandMark, BRAND_RATIO, SpkSpiral } from './components/SpkLogo.jsx';

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function heroBox() {
  const w = Math.min(window.innerWidth * 0.82, 980);
  const h = w * BRAND_RATIO;
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
      .then(d => setUser(d.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function handleAuth(u, fromRect) {
    if (reduceMotion() || !fromRect) {
      setUser(u);
      setStage('done');
      return;
    }
    // 1. le logo volant se pose exactement sur le logo du login
    setFlight({ left: fromRect.left, top: fromRect.top, width: fromRect.width, animate: false });
    setUser(u);
    setStage('intro');
    // 2. il grandit au centre de l'écran
    // (timer plutôt que requestAnimationFrame : fonctionne aussi dans un onglet en arrière-plan)
    timers.current.push(setTimeout(() => setFlight({ ...heroBox(), animate: true }), 40));
    // 3. il rapetisse vers l'en-tête, les 4 capsules prennent la place
    timers.current.push(setTimeout(() => {
      const r = hubBrandRef.current?.getBoundingClientRect();
      if (r) setFlight({ left: r.left, top: r.top, width: r.width, animate: true, landing: true });
      setStage('settling');
      // filet de sécurité si transitionend n'arrive pas
      timers.current.push(setTimeout(finishFlight, 1600));
    }, 1250));
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
          className={'brand-flight fixed z-[60] pointer-events-none text-white' + (flight.animate ? ' is-animated' : '')}
          style={{ left: flight.left, top: flight.top, width: flight.width }}
          onTransitionEnd={e => { if (flight.landing && e.propertyName === 'width') finishFlight(); }}
        >
          <BrandMark className="block w-full h-auto" />
        </div>
      )}
    </>
  );
}
