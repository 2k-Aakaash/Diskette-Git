import React from 'react';
import { Button, Grid } from '@mui/material';
import Note from './Note';

const Dashboard = ({ notes, onCreateNote }) => {
    return (
        <div style={{ padding: '20px' }}>
            <Grid container spacing={3}>
                {notes.map((note, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Note note={note} />
                    </Grid>
                ))}
            </Grid>
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
