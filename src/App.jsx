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
import { auth, provider, signInWithPopup, signOut, db } from './firebaseConfig'; // Import updated methods
import { onSnapshot, query, collection, where, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Define custom colors
const customColors = {
  navbarBackground: 'rgb(68, 49, 102)', // Navbar background color
  navbarText: 'rgb(255, 255, 255)', // Navbar text color
  buttonCreate: 'rgb(130, 54, 189)', // Create note button color
  buttonSignIn: 'rgb(130, 54, 189)', // Sign in button color
  buttonSignOut: 'rgb(45, 36, 76)', // Sign out button color
  noteBackground: 'rgb(68, 49, 102)', // Note background color
  noteText: 'rgb(255, 255, 255)' // Note text color
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [noteToExport, setNoteToExport] = useState(null);
  const [isExportNoteOpen, setIsExportNoteOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'notes'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotes(notesData);
      });
      return () => unsubscribe();
    } else {
      setNotes([]);
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateNote = () => {
    setIsCreateNoteOpen(true);
  };

  const handleCloseCreateNote = () => {
    setIsCreateNoteOpen(false);
  };

  const handleSaveNote = async (note) => {
    if (user) {
      const newNote = {
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.uid,
      };

      try {
        await addDoc(collection(db, 'notes'), newNote);
        setIsCreateNoteOpen(false);
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleEditNote = (noteId) => {
    const note = notes.find(n => n.id === noteId);
    setNoteToEdit(note);
    setIsEditNoteOpen(true);
  };

  const handleSaveEditedNote = async (editedNote) => {
    if (user) {
      const noteRef = doc(db, 'notes', editedNote.id);
      const updatedNote = { ...editedNote, updatedAt: new Date().toISOString() };

      try {
        await updateDoc(noteRef, updatedNote);
        setIsEditNoteOpen(false);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDeleteNote = (noteId) => {
    setNoteToDelete(noteId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteNote = async () => {
    if (user) {
      const noteRef = doc(db, 'notes', noteToDelete);

      try {
        await deleteDoc(noteRef);
        setIsDeleteModalOpen(false);
        setNoteToDelete(null);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleArchiveNote = (noteId) => {
    // Logic for archiving a note
  };

  const handleUnarchiveNote = (noteId) => {
    // Logic for unarchiving a note
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
      <Navbar
        onSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        user={user}
        customColors={customColors}
      />
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
            onSignIn={handleGoogleSignIn}
            onSignOut={handleSignOut}
            customColors={customColors}
          />
        } />
        <Route path="/note/:id" element={<NoteDetails notes={notes} customColors={customColors} />} />
        <Route path="/profile/archive" element={<ArchiveSection archivedNotes={archivedNotes} onUnarchive={handleUnarchiveNote} customColors={customColors} />} />
      </Routes>
      <CreateNote open={isCreateNoteOpen} onClose={handleCloseCreateNote} onSave={handleSaveNote} />
      {noteToEdit && <EditNote open={isEditNoteOpen} onClose={() => setIsEditNoteOpen(false)} onSave={handleSaveEditedNote} note={noteToEdit} />}
      <DeleteConfirmationModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDeleteNote} />
      {noteToExport && <ExportNote open={isExportNoteOpen} onClose={handleCloseExportNote} note={noteToExport} />}
    </>
  );
};

export default App;
