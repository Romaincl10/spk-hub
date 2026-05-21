require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const auth = require('./auth.cjs');
const tools = require('./tools.cjs');

const PORT = process.env.PORT || 3040;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Auto-seed Germain BUTROT au boot si users.json absent ou compte manquant.
// Permet de fonctionner sans volume persistant (chaque deploy recrée le user).
function autoSeedGermain() {
  const usersFile = path.join(DATA_DIR, 'users.json');
  const password = process.env.GERMAIN_PASSWORD;
  if (!password) {
    console.warn('[seed] GERMAIN_PASSWORD non défini — skip auto-seed');
    return;
  }
  let users = [];
  if (fs.existsSync(usersFile)) {
    try { users = JSON.parse(fs.readFileSync(usersFile, 'utf8')); } catch {}
  }
  if (users.find(u => u.login === 'germain.butrot')) return;
  users.push({
    login: 'germain.butrot',
    name: 'Germain BUTROT',
    role: 'admin',
    passwordHash: bcrypt.hashSync(password, 12),
  });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  console.log('[seed] germain.butrot créé automatiquement au boot');
}

autoSeedGermain();

const app = express();

app.use(cors({
  origin: NODE_ENV === 'development' ? ['http://localhost:5174', 'http://localhost:5173'] : true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.post('/api/auth/login', async (req, res) => {
  const { login, password } = req.body || {};
  if (!login || !password) return res.status(400).json({ error: 'login et password requis' });

  const user = await auth.findUser(login);
  if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

  const ok = await auth.verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });

  const token = auth.signToken({ login: user.login, name: user.name, role: user.role });
  res.cookie('spk_hub_token', token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ user: { login: user.login, name: user.name, role: user.role } });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('spk_hub_token');
  res.json({ ok: true });
});

app.get('/api/auth/me', auth.requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/tools', auth.requireAuth, (req, res) => {
  res.json({ sections: tools.list() });
});

if (NODE_ENV === 'production') {
  const distDir = path.join(__dirname, '..', 'dist');
  app.use(express.static(distDir));
  app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`[spk-hub] Serveur démarré sur port ${PORT} (${NODE_ENV})`);
});
