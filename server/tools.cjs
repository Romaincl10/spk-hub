// Hub SPK : 4 capsules, chacune ouvre directement sa plateforme.
// Une capsule sans url s'affiche « Bientôt » et n'est pas cliquable.

const CAPSULES = [
  {
    id: 'farming',
    code: '01',
    title: 'Farming & Biz Dev',
    tagline: 'Portefeuilles, CA, marge, pipeline et objectifs des DC.',
    platform: 'SPK DC',
    url: 'https://spk-dc-production.up.railway.app/',
  },
  {
    id: 'prestataires',
    code: '02',
    title: 'Prestataires',
    tagline: 'Vivier prestataires contenus, staffing des devis, dérives d’achat.',
    platform: 'Prestations de contenus',
    url: 'https://spk-prestataires-contenus-production.up.railway.app/',
  },
  {
    id: 'materiel',
    code: '03',
    title: 'Matériel & Logistique',
    tagline: 'Réservation du parc photo et vidéo, bons de sortie.',
    platform: 'Résa Matériel',
    url: 'https://resa-materiel-production.up.railway.app/',
  },
  {
    id: 'projets',
    code: '04',
    title: 'Gestion de projet',
    tagline: 'Vie des projets, charge des équipes, atterrissage marge.',
    platform: null,
    url: process.env.PROJECTS_URL || null,
  },
];

function list() {
  return { capsules: CAPSULES };
}

module.exports = { list };
