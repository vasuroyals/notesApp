import React from 'react';
import './styles/NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
    return (
        <div className="note-list">
            {notes.length === 0 ? (
                <p>No notes available</p>
            ) : (
                notes.map((note) => (
                    <div key={note.id} className="note">
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        <p><strong>Category:</strong> {note.category}</p>
                        <button onClick={() => onEdit(note)}>Edit</button>
                        <button onClick={() => onDelete(note.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default NoteList;
