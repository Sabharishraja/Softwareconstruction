const sqlite3 = require('sqlite3').verbose();

// Initialize database
const db = new sqlite3.Database(':memory:');

// Create Students table
db.serialize(() => {
    db.run('CREATE TABLE Students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, grade TEXT, course TEXT)');
});

// Add student
function addStudent(name, grade, course, callback) {
    const stmt = db.prepare('INSERT INTO Students (name, grade, course) VALUES (?, ?, ?)');
    stmt.run(name, grade, course, callback);
    stmt.finalize();
}

// Get all students
function getStudents(callback) {
    db.all('SELECT * FROM Students', (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

// Delete student
function deleteStudent(id, callback) {
    const stmt = db.prepare('DELETE FROM Students WHERE id = ?');
    stmt.run(id, callback);
    stmt.finalize();
}

module.exports = {
    addStudent,
    getStudents,
    deleteStudent
};
