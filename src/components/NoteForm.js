import React, { useState, useEffect } from 'react';
import './styles/NoteForm.css';

const NoteForm = ({ onSave, currentNote }) => {
    const [note, setNote] = useState({
        title: '',
        description: '',
        category: 'Others',
    });

    useEffect(() => {
        if (currentNote) {
            setNote(currentNote); 
        } else {
            setNote({ title: '', description: '', category: 'Others' }); 
        }
    }, [currentNote]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({
            ...note,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(note);
        setNote({ title: '', description: '', category: 'Others' }); 
    };

    return (
        
        <form className="note-form" onSubmit={handleSubmit}>
            <h2>Add Note</h2>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter note title"
                value={note.title}
                onChange={handleChange}
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                id="description"
                placeholder="Enter note description"
                value={note.description}
                onChange={handleChange}
                required
            />

            <label htmlFor="category">Category</label>
            <select
                name="category"
                id="category"
                value={note.category}
                onChange={handleChange}
            >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Others">Others</option>
            </select>

            <button type="submit" className="dynamic-button">
                {currentNote ? 'Update Note' : 'Add Note'}
            </button>
        </form>
    );
};

export default NoteForm;
