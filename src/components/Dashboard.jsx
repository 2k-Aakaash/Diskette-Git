import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../index.css';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './Sidebar';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';
import disketteIcon from '../assets/edit-icon2.svg';
import { useTheme } from '../ThemeContext';

const Dashboard = ({ notes, onCreateNote, onEditNote, onDeleteNote, onArchiveNote, onExportNote, onChangeColor, onUpdateNote }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { mode } = useTheme();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();

        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const activeNotes = notes.filter(note => !note.archived);
    const priorityNotes = activeNotes.filter(note => note.isPriority);
    const regularNotes = activeNotes.filter(note => !note.isPriority);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedNotes = Array.from(activeNotes);
        const [removed] = reorderedNotes.splice(result.source.index, 1);
        reorderedNotes.splice(result.destination.index, 0, removed);

        try {
            for (const note of reorderedNotes) {
                await onUpdateNote(note.id, note);
            }
        } catch (error) {
            console.error('Error updating notes:', error);
        }
    };

    const handlePriorityToggle = async (noteId) => {
        const updatedNote = activeNotes.find(note => note.id === noteId);
        if (!updatedNote) return;

        updatedNote.isPriority = !updatedNote.isPriority;

        try {
            await onUpdateNote(noteId, updatedNote);
        } catch (error) {
            console.error('Error updating note priority:', error);
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

                            <h1 className="section-title priority-diskette">Priority Diskettes</h1>
                        </div>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="priorityNotes" direction="horizontal">
                                {(provided) => (
                                    <div
                                        className="notes-grid horizontal-scroll"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {priorityNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card centered-empty-message">
                                                    <h5>No Priority Diskettes Found</h5>
                                                </div>
                                            </div>
                                        ) : (
                                            priorityNotes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Note
                                                                note={note}
                                                                onEdit={onEditNote}
                                                                onDelete={onDeleteNote}
                                                                onArchive={onArchiveNote}
                                                                onExport={onExportNote}
                                                                onChangeColor={onChangeColor}
                                                                onPriorityToggle={handlePriorityToggle}
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

                            <h1 className="section-title">Diskettes</h1>
                            <Droppable droppableId="regularNotes">
                                {(provided) => (
                                    <div className="notes-grid" ref={provided.innerRef} {...provided.droppableProps}>
                                        {regularNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card centered-empty-message">
                                                    <h5>No Diskettes Found</h5>
                                                    <p>It looks like you don't have any Diskettes yet. Start by creating your first Diskette.</p>
                                                    <button className="create-note-button" onClick={onCreateNote}>Create Your First Diskette</button>
                                                </div>
                                            </div>
                                        ) : (
                                            regularNotes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Note
                                                                className={note.isPriority ? 'priority-note' : ''}
                                                                note={note}
                                                                onEdit={onEditNote}
                                                                onDelete={onDeleteNote}
                                                                onArchive={onArchiveNote}
                                                                onExport={onExportNote}
                                                                onChangeColor={onChangeColor}
                                                                onPriorityToggle={handlePriorityToggle}
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
            <button className="create-note-button-floating" onClick={onCreateNote}>
                <img src={disketteIcon} alt="Create Diskette" style={{ width: '24px', height: '24px' }} />
                <span>Create Diskette</span>
            </button>
        </div>
    );
};

export default Dashboard;
