const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

const dbPath = path.join(__dirname, 'database.db');
const frontendPath = path.join(__dirname, '../frontend');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('DB Error:', err.message);
    else console.log('Connected to SQLite database at: ' + dbPath);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS main_stats (
        id INTEGER PRIMARY KEY, label TEXT, value TEXT, change TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS revenue_history (
        id INTEGER PRIMARY KEY, month TEXT, amount INTEGER
    )`);

    db.get("SELECT count(*) as count FROM main_stats", (err, row) => {
        if (row && row.count === 0) {
            console.log("Seeding initial data...");
            const stmt = db.prepare("INSERT INTO main_stats (label, value, change) VALUES (?, ?, ?)");
            [['Total Revenue', '$45,231', '+12.5%'], ['Active Users', '12,847', '+8.2%'], 
             ['Conversion Rate', '3.24%', '+2.1%'], ['Avg Response Time', '234ms', '-5.3%']]
            .forEach(s => stmt.run(s));
            stmt.finalize();

            const stmt2 = db.prepare("INSERT INTO revenue_history (month, amount) VALUES (?, ?)");
            [['Jan', 12000], ['Feb', 19000], ['Mar', 3000], ['Apr', 5000], ['May', 20000], ['Jun', 45000]]
            .forEach(r => stmt2.run(r));
            stmt2.finalize();
        }
    });
});

app.use(express.json());
app.use(express.static(frontendPath));

// --- API ENDPOINTS ---

app.get('/api/stats', (req, res) => {
    db.all("SELECT * FROM main_stats", [], (err, rows) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.get('/api/revenue', (req, res) => {
    db.all("SELECT * FROM revenue_history", [], (err, rows) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.get('/api/system', (req, res) => {
  
    res.json({
        cpu: Math.floor(Math.random() * (90 - 20) + 20),
        memory: Math.floor(Math.random() * (80 - 40) + 40),
        disk: 82,
        network: Math.floor(Math.random() * (100 - 10) + 10)
    });
});


app.listen(port, () => {
    console.log(`System Monitor live at http://localhost:${port}`);
    console.log(`Serving frontend from: ${frontendPath}`);
});