import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import Markdown from 'markdown-to-jsx';

const NoteDetails = ({ notes }) => {
    const { id } = useParams();
    const note = notes.find(note => note.id === id);

    if (!note) return <div>Note not found</div>;

    return (
        <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Box bgcolor={note.color} p={3} borderRadius={2}>
                <Typography variant="h3" component="div" fontWeight="bold">
                    {note.title}
                </Typography>
                <Markdown>{note.content}</Markdown>
            </Box>
        </Container>
    );
};

export default NoteDetails;
