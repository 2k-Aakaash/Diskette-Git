import React, { useState, useEffect } from 'react';
import { Button, Grid, CircularProgress, Box, Typography, Paper } from '@mui/material';
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
        <div style={{ padding: '20px', backgroundColor: 'rgb(29, 25, 53)' }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                    <CircularProgress />
                </Box>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="notes">
                        {(provided) => (
                            <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                                {notes.length === 0 ? (
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="80vh"
                                        width="100%"
                                    >
                                        <Paper
                                            elevation={3}
                                            style={{
                                                padding: '20px',
                                                textAlign: 'center',
                                                maxWidth: '600px',
                                                width: '100%',
                                                backgroundColor: 'rgb(55, 44, 86)',
                                                color: 'rgb(255, 255, 255)' // Primary text color
                                            }}
                                        >
                                            <Typography variant="h5" gutterBottom>
                                                No Diskettes Found
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                It looks like you don't have any Diskettes yet. Start by creating your first Diskette.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={onCreateNote}
                                                style={{ backgroundColor: 'rgb(130, 54, 189)' }}
                                            >
                                                Create Your First Diskette
                                            </Button>
                                        </Paper>
                                    </Box>
                                ) : (
                                    notes.map((note, index) => (
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
                                    ))
                                )}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            <Button
                variant="contained"
                onClick={onCreateNote}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'rgb(130, 54, 189)',
                    color: 'rgb(255, 255, 255)'
                }}
            >
                Create Diskette
            </Button>
        </div>
    );
};

export default Dashboard;
