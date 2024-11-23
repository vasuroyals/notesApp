import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('All');  // Default to show all notes
    const [searchQuery, setSearchQuery] = useState('');
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {   
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleSaveNote = async (note) => {
        try {
            if (note.id) {
                // Updating existing note
                await axios.put(`http://localhost:5000/api/notes/${note.id}`, note);
            } else {
                // Adding new note
                await axios.post('http://localhost:5000/api/notes', note);
            }
            fetchNotes(); // Refetch notes after save
            setCurrentNote(null); // Reset form
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };
    

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            fetchNotes(); // Refetch notes after delete
            setCurrentNote(null); // Reset form
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    // Filter notes by category and search query
    const filteredNotes = notes.filter((note) => {
        const isCategoryMatch = categoryFilter === 'All' || note.category === categoryFilter;
        const isSearchMatch =
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.category.toLowerCase().includes(searchQuery.toLowerCase());

        return isCategoryMatch && isSearchMatch;
    });

    return (
        <div className="App">
            <h1>Personal Notes</h1>
            <SearchBar
                setCategoryFilter={setCategoryFilter}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
            />
            <NoteForm onSave={handleSaveNote} currentNote={currentNote} />
            <NoteList notes={filteredNotes} onEdit={setCurrentNote} onDelete={handleDeleteNote} />
        </div>
    );
};

export default App;