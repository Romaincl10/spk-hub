# SPK Hub

Portail unifié SPK Group — point d'entrée unique vers les outils internes.

## Stack
Stack standard outils internes SPK : React 19 + Vite + Tailwind 4 + Express + JWT + bcrypt + Railway.

## Outils branchés (v1)
- SPK Dashboard — https://spk-dashboard-production.up.railway.app/
- SPK DC — https://spk-dc-production.up.railway.app/
- REFORM CRM — https://reform-crm-production.up.railway.app/

Configuration des tuiles : `server/tools.cjs`. Ajouter SPK Prévisionnel et SPK Fournisseurs dès qu'ils sont déployés.

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
