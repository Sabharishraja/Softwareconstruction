const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).send({ message: 'Login successful' });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.post('/add-student', (req, res) => {
    const { name, grade, course } = req.body;
    database.addStudent(name, grade, course, (err) => {
        if (err) {
            res.status(500).send({ message: 'Failed to add student' });
        } else {
            res.status(200).send({ message: 'Student added successfully' });
        }
    });
});

app.get('/students', (req, res) => {
    database.getStudents((err, students) => {
        if (err) {
            res.status(500).send({ message: 'Failed to retrieve students' });
        } else {
            res.status(200).send({ students });
        }
    });
});

app.delete('/delete-student/:id', (req, res) => {
    const studentId = req.params.id;
    database.deleteStudent(studentId, (err) => {
        if (err) {
            res.status(500).send({ message: 'Failed to delete student' });
        } else {
            res.status(200).send({ message: 'Student deleted successfully' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
