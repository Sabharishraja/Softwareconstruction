const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

// Login route (hardcoded for now)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Add student
app.post('/students', (req, res) => {
    const { name, grade, course } = req.body;
    db.run('INSERT INTO students (name, grade, course) VALUES (?, ?, ?)', [name, grade, course], function(err) {
        if (err) return res.status(500).send("Failed to add student");
        res.send("Student added successfully");
    });
});

// Get all students
app.get('/students', (req, res) => {
    db.all('SELECT * FROM students', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ students: rows });
    });
});

// Delete student
app.delete('/delete-student/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ message: "Delete failed" });
        res.json({ message: "Student deleted successfully" });
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
