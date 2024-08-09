import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './Sidebar';
import hamburgerIcon from '../assets/menu-icon.png';

const Dashboard = ({ notes, onCreateNote, onDragEnd, onEditNote, onDeleteNote, onArchiveNote, onPinNote, onExportNote, onChangeColor }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
    }, []);

    const priorityNotes = notes.filter(note => note.isPriority);
    const regularNotes = notes.filter(note => !note.isPriority);

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar open={sidebarOpen} />
            <div className="main-content">
                <button className="hamburger-button" onClick={toggleSidebar}>
                    <img src={hamburgerIcon} alt="Menu" />
                </button>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <h1 className="section-title priority-diskette">Priority Diskettes</h1>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="priorityNotes">
                                {(provided) => (
                                    <div className="notes-grid" ref={provided.innerRef} {...provided.droppableProps}>
                                        {priorityNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card">
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
                                                                onPin={onPinNote}
                                                                onExport={onExportNote}
                                                                onChangeColor={onChangeColor}
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

                        <h2 className="section-title">Diskettes</h2>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="regularNotes">
                                {(provided) => (
                                    <div className="notes-grid" ref={provided.innerRef} {...provided.droppableProps}>
                                        {regularNotes.length === 0 ? (
                                            <div className="empty-notes-container">
                                                <div className="empty-notes-card">
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
                                                                note={note}
                                                                onEdit={onEditNote}
                                                                onDelete={onDeleteNote}
                                                                onArchive={onArchiveNote}
                                                                onPin={onPinNote}
                                                                onExport={onExportNote}
                                                                onChangeColor={onChangeColor}
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
                +
            </button>
        </div>
    );
};

export default Dashboard;
