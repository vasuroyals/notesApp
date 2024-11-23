const express = require('express');
const db = require('../database/db');
const Joi = require('joi');

const router = express.Router();

// Validation schema
const noteSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('Work', 'Personal', 'Others').default('Others'),
});

// Create a new note
router.post('/notes', (req, res) => {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { title, description, category } = value;
    db.run(
        `INSERT INTO notes (title, description, category) VALUES (?, ?, ?)`,
        [title, description, category],
        function (err) {
            if (err) return res.status(500).send({ error: 'Database error' });
            res.status(201).send({ id: this.lastID });
        }
    );
});

// Get all notes
router.get('/notes', (req, res) => {
    const { category, search } = req.query;
    let query = 'SELECT * FROM notes WHERE 1=1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (search) {
        query += ' AND title LIKE ?';
        params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).send({ error: 'Database error' });
        res.send(rows);
    });
});

// Update a note
router.put('/notes/:id', (req, res) => {
    const { error, value } = noteSchema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const { title, description, category } = value;
    const { id } = req.params;

    db.run(
        `UPDATE notes SET title = ?, description = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
        [title, description, category, id],
        function (err) {
            if (err) return res.status(500).send({ error: 'Database error' });
            if (this.changes === 0) return res.status(404).send({ error: 'Note not found' });
            res.send({ message: 'Note updated successfully' });
        }
    );
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).send({ error: 'Database error' });
        if (this.changes === 0) return res.status(404).send({ error: 'Note not found' });
        res.send({ message: 'Note deleted successfully' });
    });
});

module.exports = router;
