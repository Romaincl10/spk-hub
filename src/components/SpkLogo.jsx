import { WORDMARK_D, SPIRAL_D } from './logoPaths.js';

// Logo officiel : spirale + SPK
export function SpkLogo({ className = '', title = 'SPK' }) {
  return (
    <svg className={className} viewBox="0 0 91 32" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
      <path d={WORDMARK_D} fill="currentColor" />
    </svg>
  );
}

// Marque complète SPK | HUB (un seul SVG : tout se met à l'échelle ensemble)
export const BRAND_RATIO = 32 / 174;
export function BrandMark({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 174 32" role="img" aria-label="SPK Hub" xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
      <path d={WORDMARK_D} fill="currentColor" />
      <rect x="98.5" y="5.2" width="0.7" height="19.3" fill="currentColor" opacity="0.45" />
      <text
        x="105.5"
        y="24.5"
        fill="currentColor"
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 300, fontSize: '26.6px', letterSpacing: '1.2px' }}
      >
        HUB
      </text>
    </svg>
  );
}

// Spirale seule
export function SpkSpiral({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
    </svg>
  );
}
