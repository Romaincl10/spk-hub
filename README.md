# SPK Hub

Portail unifié SPK Group — point d'entrée unique vers les outils internes.

## Stack
Stack standard outils internes SPK : React 19 + Vite + Tailwind 4 + Express + JWT + bcrypt + Railway.

## Capsules (v2, 2026-11-05)
Design full noir et blanc, logo SPK géant en Montserrat Black italique, 4 capsules :
- 01 Farming & Biz Dev : SPK DC (en ligne), Moteur de farming, Moteur de hunting
- 02 Prestataires : Prestataires & Cockpit (en ligne), SPK Fournisseurs
- 03 Matériel & Logistique : Résa Matériel (en ligne)
- 04 Gestion de projet : SPK Projects, Staffing Radar
- Bandeau Pilotage : SPK Dashboard, SPK Prévisionnel, REFORM CRM

Configuration : `server/tools.cjs`. Un outil sans URL s'affiche « Bientôt ». Pour le brancher, poser sa variable d'env
(FARMING_URL, HUNTING_URL, FOURNISSEURS_URL, PROJECTS_URL, STAFFING_URL) ou écrire l'URL en dur.

## Auth
JWT en cookie httpOnly (`spk_hub_token`), bcrypt cost 12. Pattern identique à SPK DC.
Comptes : seedés via `npm run seed` à partir de `server/seed.cjs`.

## Lancer en local

```bash
cp .env.example .env          # renseigner JWT_SECRET
npm install
npm run seed                  # crée Germain dans server/data/users.json
npm run dev                   # backend :3040 + frontend Vite :5174 (proxy /api)
```

Accès : http://localhost:5174

## Build prod

```bash
npm install
npm run build                 # produit dist/
npm run seed                  # une fois sur Railway, dans le shell volume
NODE_ENV=production npm start # Express sert dist/ + API
```

## Déploiement Railway
- Repo GitHub : `Romaincl10/spk-hub`
- Branch `main` → auto-deploy
- Variables d'env Railway requises :
  - `JWT_SECRET` (long aléatoire)
  - `NODE_ENV=production`
  - `DATA_DIR=/mnt/data` (avec Railway Volume monté)
- Domaine custom : `hub.spk.app`

## Comptes initiaux
| Login | Rôle |
|-------|------|
| `germain.butrot` | admin |

Mot de passe initial Germain : communiqué hors-repo (cf. note Obsidian `SPK Hub - Credentials 2026-05-21`).
