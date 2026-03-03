const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDb();
  }
});

// Initialize database schema
const initializeDb = () => {
  db.serialize(() => {
    // Create categories table
    db.run(`
          CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
          )
        `);

    // Create users/families table
    db.run(`
          CREATE TABLE IF NOT EXISTS families (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact_number TEXT NOT NULL,
            bio TEXT,
            location TEXT,
            image_url TEXT
          )
        `);

    // Create dishes table
    db.run(`
          CREATE TABLE IF NOT EXISTS dishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            family_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            image_url TEXT,
            FOREIGN KEY (family_id) REFERENCES families (id),
            FOREIGN KEY (category_id) REFERENCES categories (id)
          )
        `);
  });
  console.log("Database initialized successfully.");
};

module.exports = db;
