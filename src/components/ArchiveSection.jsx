// src/components/ArchiveSection.jsx
import React from 'react';
import { Grid } from '@mui/material';
import Note from './Note';

const ArchiveSection = ({ archivedNotes, onUnarchive }) => {
    return (
        <div style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                {archivedNotes.map(note => (
                    <Grid item xs={12} sm={6} md={4} key={note.id}>
                        <Note note={note} onUnarchive={onUnarchive} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ArchiveSection;
