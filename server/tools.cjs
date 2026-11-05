// Configuration du Hub SPK : 4 capsules métier + un bandeau "Pilotage".
// status : 'prod' (en ligne) | 'soon' (pas encore déployé, tuile non cliquable).
// Pour brancher un outil : renseigner son url et passer status à 'prod'.

const CAPSULES = [
  {
    id: 'farming',
    code: '01',
    title: 'Farming & Biz Dev',
    tagline: 'Portefeuilles, opportunités, plans de farming et de hunting.',
    tools: [
      {
        id: 'spk-dc',
        name: 'SPK DC',
        description: 'Portail Directeurs de Clientèle : portefeuilles, CA, marge, pipeline, objectifs.',
        url: 'https://spk-dc-production.up.railway.app/',
        status: 'prod',
      },
      {
        id: 'farming-engine',
        name: 'Moteur de farming',
        description: 'Plan de jeu par compte : pistes, moments forts, timeline saison, concepts froid → chaud.',
        url: process.env.FARMING_URL || null,
        status: process.env.FARMING_URL ? 'prod' : 'soon',
      },
      {
        id: 'hunting-engine',
        name: 'Moteur de hunting',
        description: 'Prospects cibles, signaux d’actu et angles d’attaque new biz.',
        url: process.env.HUNTING_URL || null,
        status: process.env.HUNTING_URL ? 'prod' : 'soon',
      },
    ],
  },
  {
    id: 'prestataires',
    code: '02',
    title: 'Prestataires',
    tagline: 'Vivier freelances, staffing des devis, dérives d’achat, négo fournisseurs.',
    tools: [
      {
        id: 'prestataires-contenus',
        name: 'Prestataires & Cockpit',
        description: 'Vivier prestataires, devis à arbitrer, matching staffing et dérives d’achat.',
        url: 'https://spk-prestataires-contenus-production.up.railway.app/',
        status: 'prod',
      },
      {
        id: 'spk-fournisseurs',
        name: 'SPK Fournisseurs',
        description: 'Audit achat et briefings de négociation fournisseurs.',
        url: process.env.FOURNISSEURS_URL || null,
        status: process.env.FOURNISSEURS_URL ? 'prod' : 'soon',
      },
    ],
  },
  {
    id: 'materiel',
    code: '03',
    title: 'Matériel & Logistique',
    tagline: 'Réservation du parc photo / vidéo et logistique terrain.',
    tools: [
      {
        id: 'resa-materiel',
        name: 'Résa Matériel',
        description: 'Réservation du matériel shooting photo et vidéo, bons de sortie PDF.',
        url: 'https://resa-materiel-production.up.railway.app/',
        status: 'prod',
      },
    ],
  },
  {
    id: 'projets',
    code: '04',
    title: 'Gestion de projet',
    tagline: 'Vie des projets, charge des équipes, atterrissage marge.',
    tools: [
      {
        id: 'spk-projects',
        name: 'SPK Projects',
        description: 'Récap et parties prenantes, todo prestataires et logistique, atterrissage en cours et final.',
        url: process.env.PROJECTS_URL || null,
        status: process.env.PROJECTS_URL ? 'prod' : 'soon',
      },
      {
        id: 'spk-staffing',
        name: 'Staffing Radar',
        description: 'Charge par personne et par projet, simulateur « et si on prend ce projet ? ».',
        url: process.env.STAFFING_URL || null,
        status: process.env.STAFFING_URL ? 'prod' : 'soon',
      },
    ],
  },
];

const PILOTAGE = [
  { id: 'spk-dashboard', name: 'SPK Dashboard', url: 'https://spk-dashboard-production.up.railway.app/', status: 'prod' },
  {
    id: 'spk-previsionnel',
    name: 'SPK Prévisionnel',
    url: process.env.PREVISIONNEL_URL || 'https://spk-previsionnel-dashboard-production.up.railway.app/',
    status: 'prod',
  },
  { id: 'reform-crm', name: 'REFORM CRM', url: 'https://reform-crm-production.up.railway.app/', status: 'prod' },
];

function list() {
  return { capsules: CAPSULES, pilotage: PILOTAGE };
}

module.exports = { list };
