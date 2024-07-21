// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NoteDetails from './components/NoteDetails';
import CreateNote from './components/CreateNote';
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Sample Note 1', content: '# This is a H1 Tag\nThis is a P tag normal tag', color: '#ccffcc' },
    { id: '2', title: 'Sample Note 2', content: '# This is a H1 Tag\nThis is a P tag normal tag', color: '#ccffff' },
    // Add more notes as needed
  ]);

  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);

  const handleCreateNote = () => {
    setIsCreateNoteOpen(true);
  };

  const handleCloseCreateNote = () => {
    setIsCreateNoteOpen(false);
  };

  const handleSaveNote = (note) => {
    setNotes([...notes, note]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard notes={notes} onCreateNote={handleCreateNote} />} />
        <Route path="/note/:id" element={<NoteDetails notes={notes} />} />
      </Routes>
      <CreateNote open={isCreateNoteOpen} onClose={handleCloseCreateNote} onSave={handleSaveNote} />
    </>
  );
};

export default App;
