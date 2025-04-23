const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./students.db');

// Create table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, grade TEXT, course TEXT)");
});

module.exports = db;
