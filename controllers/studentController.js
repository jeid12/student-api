const db = require('../db');

// Get all students
exports.getAllStudents = (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'No students found' });
            } else {
                res.json(results);
            }
        }
    });
};

// Get a single student by ID
exports.getStudentById = (req, res) => {
    const studentId = req.params.id;
    db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ error: 'Student not found' });
            }
        }
    });
};

// Create a new student
exports.createStudent = (req, res) => {
    const { name, email, course } = req.body;
    db.query('INSERT INTO students (name, email, course) VALUES (?, ?, ?)', [name, email, course], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            
            res.status(201).json({ message: 'Student created successfully' });
        }
    });
};

// Update a student
exports.updateStudent = (req, res) => {
    const studentId = req.params.id;
    const { name, email, course } = req.body;
    db.query('UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?', [name, email, course, studentId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }
    });
};

// Delete a student
exports.deleteStudent = (req, res) => {
    const studentId = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    });
};
