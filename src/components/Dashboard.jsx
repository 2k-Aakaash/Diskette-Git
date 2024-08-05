import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = ({ notes, onCreateNote, onDragEnd, onEditNote, onDeleteNote, onArchiveNote, onPinNote, onExportNote, onChangeColor }) => {
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="dashboard-container">
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="notes">
                        {(provided) => (
                            <div className="notes-grid" ref={provided.innerRef} {...provided.droppableProps}>
                                {notes.length === 0 ? (
                                    <div className="empty-notes-container">
                                        <div className="empty-notes-card">
                                            <h5>No Diskettes Found</h5>
                                            <p>It looks like you don't have any Diskettes yet. Start by creating your first Diskette.</p>
                                            <button className="create-note-button" onClick={onCreateNote}>Create Your First Diskette</button>
                                        </div>
                                    </div>
                                ) : (
                                    notes.map((note, index) => (
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
            )}
            <button className="create-note-button" onClick={onCreateNote}>
                Create Diskette
            </button>
        </div>
    );
};

export default Dashboard;
