import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTheme } from '../ThemeContext';
import './Dashboard.css';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';

const ArchivedDiskettes = ({ archivedNotes, onRestoreNote, onDeleteNote, onUpdateNote }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { mode } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating a fetch with a delay for demonstration
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching archived notes: ", error);
                setLoading(false);
            }
        };

        fetchData();

        // Disable scrolling while loading
        document.body.style.overflowY = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedNotes = Array.from(archivedNotes);
        const [removed] = reorderedNotes.splice(result.source.index, 1);
        reorderedNotes.splice(result.destination.index, 0, removed);

        try {
            for (const note of reorderedNotes) {
                await onUpdateNote(note.id, note);
            }
        } catch (error) {
            console.error('Error updating archived notes:', error);
        }
    };

    const handleRestoreNote = async (noteId) => {
        try {
            const noteToRestore = archivedNotes.find(note => note.id === noteId);
            if (!noteToRestore) {
                console.error(`Note with ID ${noteId} not found in archived notes.`);
                return;
            }

            await onUpdateNote(noteId, { ...noteToRestore, archived: false });

            // console.log(`Successfully restored note with ID ${noteId}`);
        } catch (error) {
            console.error(`Error restoring note with ID ${noteId}:`, error);
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
                        <div className="priority-diskette-container">
                            <button className="menu-button" onClick={toggleSidebar}>
                                <img src={mode === 'dark' ? menuDark : menuLight} alt="Menu" />
                            </button>
                            <h1 className="section-title">Archived Diskettes</h1>
                        </div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="archivedNotes">
                                {(provided) => (
                                    <div className="notes-grid" ref={provided.innerRef} {...provided.droppableProps}>
                                        {archivedNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card centered-empty-message">
                                                    <h5>No Archived Diskettes Found</h5>
                                                    <p>You have not archived any diskettes yet.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            archivedNotes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Note
                                                                note={note}
                                                                onEdit={handleRestoreNote}
                                                                onDelete={onDeleteNote}
                                                                onArchive={handleRestoreNote} // Restore note from archive
                                                                onPin={() => { }} // No pin action needed
                                                                onExport={() => { }} // No export action needed
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

export default ArchivedDiskettes;
