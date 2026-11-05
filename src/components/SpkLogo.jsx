import { SPIRAL_D } from './logoPaths.js';

// Logo SPK : spirale empreinte + « SPK » en Montserrat Black italique (texte).
// En SVG pour qu'il se mette à l'échelle d'un bloc pendant la transition.
// Mesures (police à 100px) : SPK italique 900 = encre de -3 à 226, hauteur de capitale 72.
export const LOGO_W = 343;
export const LOGO_H = 80;
export const LOGO_RATIO = LOGO_H / LOGO_W;

export function SpkLogo({ className = '', title = 'SPK' }) {
  return (
    <svg className={className} viewBox={`0 -4 ${LOGO_W} ${LOGO_H}`} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <path d={SPIRAL_D} fill="currentColor" transform="translate(0 -4) scale(2.5)" />
      <text
        x="116"
        y="72"
        fill="currentColor"
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: '100px' }}
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
