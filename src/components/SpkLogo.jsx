import { SPIRAL_D } from './logoPaths.js';

// Logo SPK : trois lettres en Montserrat ExtraBold (texte, pas d'image).
// En SVG pour qu'il se mette à l'échelle d'un bloc pendant la transition.
export const LOGO_W = 213;
export const LOGO_H = 74;
export const LOGO_RATIO = LOGO_H / LOGO_W;

export function SpkLogo({ className = '', title = 'SPK' }) {
  return (
    <svg className={className} viewBox={`0 0 ${LOGO_W} ${LOGO_H}`} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <text
        x="-1"
        y="72"
        fill="currentColor"
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 800, fontSize: '100px', letterSpacing: '-1px' }}
      >
        SPK
      </text>
    </svg>
  );
}

// Spirale seule (décor)
export function SpkSpiral({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 32 32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" />
    </svg>
  );
}
