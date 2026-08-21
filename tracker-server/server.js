const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const STATS_KEY = process.env.STATS_KEY || 'birthday2026';
const DATA_FILE = path.join(__dirname, 'visits.json');

let visits = [];
try {
    if (fs.existsSync(DATA_FILE)) {
        visits = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
} catch (e) { visits = []; }

function save() {
    try { fs.writeFileSync(DATA_FILE, JSON.stringify(visits, null, 2)); } catch (e) {}
}

app.use(express.json({ type: () => true }));
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

const PIXEL = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

app.get('/pixel', (req, res) => {
    const q = req.query;
    visits.push({
        name: q.name || null,
        page: q.page || null,
        theme: q.theme || null,
        referrer: q.referrer || null,
        screen: q.screen || null,
        language: q.language || null,
        timezone: q.timezone || null,
        ip: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'] || null,
        time: new Date().toISOString()
    });
    if (visits.length > 5000) visits = visits.slice(-5000);
    save();
    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.send(PIXEL);
});

app.post('/track', (req, res) => {
    const b = req.body || {};
    visits.push({
        name: b.name || null,
        page: b.page || null,
        theme: b.theme || null,
        referrer: b.referrer || null,
        screen: b.screen || null,
        language: b.language || null,
        timezone: b.timezone || null,
        ip: (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'] || null,
        time: new Date().toISOString()
    });
    if (visits.length > 5000) visits = visits.slice(-5000);
    save();
    res.sendStatus(204);
});

app.get('/stats', (req, res) => {
    if (req.query.key !== STATS_KEY) return res.status(401).send('Unauthorized');
    const rows = [...visits].reverse().map(v => `
        <tr>
            <td>${new Date(v.time).toLocaleString()}</td>
            <td>${v.name ? escapeHtml(v.name) : '<i>anonymous</i>'}</td>
            <td>${escapeHtml(v.page || '')}</td>
            <td>${escapeHtml(v.ip || '')}</td>
            <td>${escapeHtml(v.timezone || '')}</td>
            <td>${escapeHtml(v.screen || '')}</td>
            <td style="max-width:260px;overflow:hidden;text-overflow:ellipsis">${escapeHtml(v.userAgent || '')}</td>
        </tr>`).join('');
    res.send(`<!DOCTYPE html><html><head><title>Visitor Stats</title><style>
        body{font-family:sans-serif;background:#111;color:#eee;padding:2rem}
        table{border-collapse:collapse;width:100%;font-size:13px}
        th,td{border:1px solid #444;padding:6px 10px;text-align:left}
        th{background:#222}tr:nth-child(even){background:#1a1a1a}
        h1{font-size:1.4rem}.count{color:#8f8}
    </style></head><body>
        <h1>Visitors <span class="count">(${visits.length})</span></h1>
        <table><thead><tr><th>Time</th><th>Name</th><th>Page</th><th>IP</th><th>Timezone</th><th>Screen</th><th>User Agent</th></tr></thead>
        <tbody>${rows}</tbody></table></body></html>`);
});

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

app.get('/health', (req, res) => res.send('ok'));

app.listen(PORT, () => console.log(`Tracker running on port ${PORT}`));
