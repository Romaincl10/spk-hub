require('dotenv').config();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const SEED_USERS = [
  {
    login: 'germain.butrot',
    name: 'Germain BUTROT',
    role: 'admin',
    plainPassword: process.env.SEED_GERMAIN_PASSWORD || 'zmpibMWuXhLTmnuP8p',
  },
];

async function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

  const existing = fs.existsSync(USERS_FILE)
    ? JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
    : [];

  const out = [...existing];
  for (const u of SEED_USERS) {
    if (existing.find(e => e.login === u.login)) {
      console.log(`[seed] ${u.login} existe déjà — skip`);
      continue;
    }
    const passwordHash = await bcrypt.hash(u.plainPassword, 12);
    out.push({ login: u.login, name: u.name, role: u.role, passwordHash });
    console.log(`[seed] ${u.login} créé`);
  }

  fs.writeFileSync(USERS_FILE, JSON.stringify(out, null, 2));
  console.log(`[seed] ${out.length} user(s) dans ${USERS_FILE}`);
}

main().catch(e => { console.error(e); process.exit(1); });
