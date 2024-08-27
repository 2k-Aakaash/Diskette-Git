import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NoteDetails from './components/NoteDetails';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import ArchiveSection from './components/ArchivedDiskettes';
import ExportNote from './components/ExportNote';
import { auth, provider, signInWithPopup, signOut, db } from './firebaseConfig';
import { onSnapshot, query, collection, where, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useTheme } from './ThemeContext'; // Import theme context

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
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function

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
      const fetchNotes = async () => {
        const q = query(collection(db, 'notes'), where('userId', '==', user.uid));
        const archivedQuery = query(collection(db, 'notes'), where('userId', '==', user.uid), where('archived', '==', true));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setNotes(notesData);
        });

        const archivedUnsubscribe = onSnapshot(archivedQuery, (snapshot) => {
          const archivedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setArchivedNotes(archivedData);
        });


        return () => {
          unsubscribe();
          archivedUnsubscribe();
        };
      };

      fetchNotes();
    } else {
      setNotes([]);
      setArchivedNotes([]);
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
    if (note) {
      setNoteToEdit(note); // Set the note to be edited
      setIsEditNoteOpen(true); // Open the edit modal or component
    }
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
      setLoading(true); // Set loading state to true
      const noteRef = doc(db, 'notes', noteToDelete);

      try {
        await deleteDoc(noteRef);
        setIsDeleteModalOpen(false);
        setNoteToDelete(null);
      } catch (error) {
        console.error('Error deleting note:', error);
      } finally {
        setLoading(false); // Set loading state back to false
      }
    }
  };


  const handleArchiveNote = async (noteId) => {
    if (user) {
      const note = notes.find((n) => n.id === noteId);
      if (!note) return; // Early return if note is not found

      const noteRef = doc(db, 'notes', noteId);

      try {
        // Update the note in Firestore to mark it as archived
        await updateDoc(noteRef, { archived: true });

        // Remove the note from the notes array
        setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId));

        // Add the note to the archivedNotes array
        setArchivedNotes((prevArchivedNotes) => {
          if (!prevArchivedNotes.some(n => n.id === noteId)) {
            return [...prevArchivedNotes, note];
          }
          return prevArchivedNotes;
        });

      } catch (error) {
        console.error('Error archiving note:', error);
      }
    }
  };

  const handleUnarchiveNote = async (noteId) => {
    if (user) {
      const note = archivedNotes.find((n) => n.id === noteId);
      if (!note) return;

      const noteRef = doc(db, 'notes', noteId);

      try {
        // Update the note in Firestore to mark it as unarchived
        await updateDoc(noteRef, { archived: false });

        // Remove the note from the archivedNotes array
        setArchivedNotes((prevArchivedNotes) => prevArchivedNotes.filter((n) => n.id !== noteId));

        // Add the note back to the notes array
        setNotes((prevNotes) => [...prevNotes, note]);

      } catch (error) {
        console.error('Error unarchiving note:', error);
      }
    }
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

  const updateNote = async (noteId, updatedData) => {
    if (user) {
      const noteRef = doc(db, 'notes', noteId);
      try {
        await updateDoc(noteRef, updatedData);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reorderedNotes = Array.from(notes);
    const [removed] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, removed);

    // Update notes in Firestore
    for (let i = 0; i < reorderedNotes.length; i++) {
      const note = reorderedNotes[i];
      await updateNote(note.id, { order: i });
    }

    setNotes(reorderedNotes);
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    if (user) {
      const noteRef = doc(db, 'notes', noteId);
      try {
        await updateDoc(noteRef, updatedData);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleUpdateTitle = (noteId, newTitle) => {
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, title: newTitle } : note);
    setNotes(updatedNotes);
    handleUpdateNote(noteId, { title: newTitle });
  };

  const handleUpdateContent = (noteId, newContent) => {
    const updatedNotes = notes.map(note => note.id === noteId ? { ...note, content: newContent } : note);
    setNotes(updatedNotes);
    handleUpdateNote(noteId, { content: newContent });
  };

  const handleArchiveOrRestore = () => {
    if (onRestore) {
      onRestore(note.id);
    } else if (onArchive) {
      onArchive(note.id); // Ensure this line is correct
    }
  };


  return (
    <div className={`app ${theme}`}>
      <Navbar
        onSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        onCreateNote={handleCreateNote}
        user={user}
        customColors={customColors}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route path="/" element={
          <Dashboard
            notes={notes}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onArchiveNote={handleArchiveNote}
            onPinNote={handlePinNote}
            onExportNote={handleExportNote}
            onChangeColor={handleChangeColor}
            onUpdateNote={handleUpdateNote}
            onCreateNote={handleCreateNote}
            customColors={customColors}
            handleDragEnd={handleDragEnd}
          />
        } />
        <Route path="/note/:id" element={<NoteDetails notes={notes} customColors={customColors} />} />
        <Route path="/Archived" element={
          <ArchiveSection
            archivedNotes={archivedNotes}
            onUnarchive={handleUnarchiveNote}
            onDeleteNote={handleDeleteNote} // Ensure this function is defined in App
            onUpdateNote={handleUpdateNote}  // Pass handleUpdateNote as a prop
            customColors={customColors}
            theme={theme}
          />
        } />
      </Routes>
      {isCreateNoteOpen && (
        <CreateNote
          open={isCreateNoteOpen}
          onSave={handleSaveNote}
          onClose={handleCloseCreateNote}
          customColors={customColors}
        />
      )}

      {isEditNoteOpen && noteToEdit && (
        <EditNote
          open={isEditNoteOpen}
          onClose={() => setIsEditNoteOpen(false)}
          onSave={handleSaveEditedNote}
          note={noteToEdit}
        />
      )}

      {isDeleteModalOpen && noteToDelete && (
        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteNote}
          customColors={customColors}
        />
      )}

      {isExportNoteOpen && noteToExport && (
        <ExportNote
          open={isExportNoteOpen}  // Pass the `isExportNoteOpen` state as the `open` prop
          note={noteToExport}
          onClose={handleCloseExportNote}
          customColors={customColors}
        />
      )}

    </div>
  );
};

export default App;
