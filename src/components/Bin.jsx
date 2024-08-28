import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import '../index.css';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './Sidebar';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';
import { useTheme } from '../ThemeContext';
import { auth, db } from '../firebaseConfig'; // Import your Firebase configuration
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

const Bin = ({ binNotes, onRestoreNote, onDeleteNotePermanently, onUpdateNote }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { mode } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bin notes: ", error);
                setLoading(false);
            }
        };

        fetchData();

        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedNotes = Array.from(binNotes);
        const [removed] = reorderedNotes.splice(result.source.index, 1);
        reorderedNotes.splice(result.destination.index, 0, removed);

        try {
            for (const note of reorderedNotes) {
                await onUpdateNote(note.id, note);
            }
        } catch (error) {
            console.error('Error updating bin notes:', error);
        }
    };

    const handleRestoreNote = async (noteId) => {
        if (!auth.currentUser) {
            console.error("No user is currently authenticated.");
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            const noteRef = doc(db, 'bin', noteId);
            const noteDoc = await getDoc(noteRef);

            if (noteDoc.exists() && noteDoc.data().userId === userId) {
                const noteData = noteDoc.data();
                await setDoc(doc(db, 'notes', noteId), noteData);
                await deleteDoc(noteRef);
                console.log(`Note with ID ${noteId} restored successfully.`);
            } else {
                console.error(`Permission denied or note does not exist.`);
            }
        } catch (error) {
            console.error(`Error restoring note with ID ${noteId}:`, error);
        }
    };

    const handleDeletePermanently = async (noteId) => {
        if (!auth.currentUser) {
            console.error("No user is currently authenticated.");
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            const noteRef = doc(db, 'bin', noteId);
            const noteDoc = await getDoc(noteRef);

            if (noteDoc.exists() && noteDoc.data().userId === userId) {
                await deleteDoc(noteRef);
                console.log(`Note with ID ${noteId} deleted permanently.`);
            } else {
                console.error(`Permission denied or note does not exist.`);
            }
        } catch (error) {
            console.error(`Error permanently deleting note with ID ${noteId}:`, error);
        }
    };


    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar open={sidebarOpen} />
            <div className="main-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className='priority-diskette-container'>
                            <button className="menu-button" onClick={toggleSidebar}>
                                <img src={mode === 'dark' ? menuDark : menuLight} alt="Menu" />
                            </button>

                            <h1 className="section-title">Bin</h1>
                        </div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="binNotes">
                                {(provided) => (
                                    <div
                                        className="notes-grid"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {binNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card centered-empty-message">
                                                    <h5>No Notes in Bin</h5>
                                                </div>
                                            </div>
                                        ) : (
                                            binNotes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Note
                                                                note={note}
                                                                onDelete={handleDeletePermanently}
                                                                onRestore={handleRestoreNote}
                                                                isInBin={true} // Pass the prop
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </>
                )}
            </div>
        </div>
    );
};

export default Bin;
