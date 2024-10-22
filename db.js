const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Create Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Create Transactions table
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    category TEXT,
    amount REAL,
    date TEXT,
    description TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = db;
