// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NoteDetails from './components/NoteDetails';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ArchiveSection from './components/ArchiveSection';
import ExportNote from './components/ExportNote';
import './index.css';
import moment from 'moment';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [noteToExport, setNoteToExport] = useState(null);
  const [isExportNoteOpen, setIsExportNoteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleCreateNote = () => {
    setIsCreateNoteOpen(true);
  };

  const handleCloseCreateNote = () => {
    setIsCreateNoteOpen(false);
  };

  const handleSaveNote = (note) => {
    setNotes([...notes, { ...note, id: (notes.length + 1).toString(), createdAt: moment().toISOString(), updatedAt: moment().toISOString() }]);
    setIsCreateNoteOpen(false);
  };

  const handleEditNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    setNoteToEdit(note);
    setIsEditNoteOpen(true);
  };

  const handleSaveEditedNote = (editedNote) => {
    const updatedNotes = notes.map(note =>
      note.id === editedNote.id ? { ...editedNote, updatedAt: moment().toISOString() } : note
    );
    setNotes(updatedNotes);
    setIsEditNoteOpen(false);
  };

  const handleDeleteNote = (noteId) => {
    setNoteToDelete(noteId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteNote = () => {
    const updatedNotes = notes.filter(note => note.id !== noteToDelete);
    setNotes(updatedNotes);
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleArchiveNote = (noteId) => {
    const noteToArchive = notes.find(note => note.id === noteId);
    setArchivedNotes([...archivedNotes, noteToArchive]);
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const handleUnarchiveNote = (noteId) => {
    const noteToUnarchive = archivedNotes.find(note => note.id === noteId);
    setNotes([...notes, noteToUnarchive]);
    const updatedArchivedNotes = archivedNotes.filter(note => note.id !== noteId);
    setArchivedNotes(updatedArchivedNotes);
  };

  const handlePinNote = (noteId) => {
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, pinned: !note.pinned } : note);
    setNotes(updatedNotes);
  };

  const handleExportNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    setNoteToExport(note);
    setIsExportNoteOpen(true);
  };

  const handleCloseExportNote = () => {
    setIsExportNoteOpen(false);
    setNoteToExport(null);
  };

  const handleChangeColor = (noteId, newColor) => {
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, color: newColor } : note);
    setNotes(updatedNotes);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedNotes = Array.from(notes);
    const [removed] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, removed);
    setNotes(reorderedNotes);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Dashboard
            notes={notes}
            onCreateNote={handleCreateNote}
            onDragEnd={handleDragEnd}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onArchiveNote={handleArchiveNote}
            onPinNote={handlePinNote}
            onExportNote={handleExportNote}
            onChangeColor={handleChangeColor}
          />
        } />
        <Route path="/note/:id" element={<NoteDetails notes={notes} />} />
        <Route path="/profile/archive" element={<ArchiveSection archivedNotes={archivedNotes} onUnarchive={handleUnarchiveNote} />} />
      </Routes>
      <CreateNote open={isCreateNoteOpen} onClose={handleCloseCreateNote} onSave={handleSaveNote} />
      {noteToEdit && <EditNote open={isEditNoteOpen} onClose={() => setIsEditNoteOpen(false)} onSave={handleSaveEditedNote} note={noteToEdit} />}
      <DeleteConfirmationModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeleteNote} />
      {noteToExport && <ExportNote open={isExportNoteOpen} onClose={handleCloseExportNote} note={noteToExport} />}
    </>
  );
};

export default App;
