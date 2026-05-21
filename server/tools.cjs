const TOOLS = [
  {
    id: 'spk-dashboard',
    name: 'SPK Dashboard',
    description: 'Pilotage financier et KPI direction. CRM, devis, CA, projets, trésorerie, comptable, social.',
    url: 'https://spk-dashboard-production.up.railway.app/',
    accent: '#e63946',
    status: 'prod',
  },
  {
    id: 'spk-dc',
    name: 'SPK DC',
    description: 'Portail Directeurs de Clientèle. Portefeuilles, CA, marge, pipeline, objectifs.',
    url: 'https://spk-dc-production.up.railway.app/',
    accent: '#e63946',
    status: 'prod',
  },
  {
    id: 'reform-crm',
    name: 'REFORM CRM',
    description: 'CRM interne de la filiale REFORM. 35 clients seedés depuis Excel.',
    url: 'https://reform-crm-production.up.railway.app/',
    accent: '#e63946',
    status: 'prod',
  },
];

function list() {
  return TOOLS;
}

module.exports = { list };
