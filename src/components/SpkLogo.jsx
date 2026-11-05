import { WORDMARK_D, SPIRAL_D } from './logoPaths.js';

// Logo complet : spirale + SPK (proportions officielles)
export function SpkLogo({ className = '', title = 'SPK' }) {
  return (
    <svg className={className} viewBox="0 0 91 32" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
      <path d={WORDMARK_D} fill="currentColor" />
    </svg>
  );
}

// Spirale seule (empreinte), cadrée sur sa propre zone
export function SpkSpiral({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
    </svg>
  );
}
