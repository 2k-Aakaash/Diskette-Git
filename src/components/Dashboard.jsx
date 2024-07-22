// src/components/Dashboard.jsx
import React from 'react';
import { Button, Grid } from '@mui/material';
import Note from './Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = ({ notes, onCreateNote, onDragEnd, onEditNote, onDeleteNote, onArchiveNote, onPinNote, onExportNote, onChangeColor }) => {
    return (
        <div style={{ padding: '20px' }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="notes">
                    {(provided) => (
                        <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                            {notes.map((note, index) => (
                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                    {(provided) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
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
                                        </Grid>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                variant="contained"
                color="primary"
                onClick={onCreateNote}
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            >
                Create Note
            </Button>
        </div>
    );
};

export default Dashboard;