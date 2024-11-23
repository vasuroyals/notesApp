const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const notesRouter = require('./routes/notes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', notesRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

router.put('/notes/:id', async (req, res) => {
    const { title, description, category } = req.body;
    console.log('Request Body:', req.body); // Log the incoming data
    const { id } = req.params;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and Description are required.' });
    }

    try {
        const note = await db.Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        note.title = title;
        note.description = description;
        note.category = category || 'Others'; // Default to 'Others' if no category
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
    }
});


module.exports = router;
