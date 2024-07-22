// src/components/EditNote.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const colors = [
    '#FFCDD2', '#FFE082', '#FFF176', '#A5D6A7', '#90CAF9',
    '#CE93D8', '#F48FB1', '#FFAB91', '#80DEEA', '#C5E1A5'
];

const EditNote = ({ open, onClose, onSave, note }) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [color, setColor] = useState(note.color);

    useEffect(() => {
        setTitle(note.title);
        setContent(note.content);
        setColor(note.color);
    }, [note]);

    const handleSave = () => {
        onSave({ ...note, title, content, color });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <MDEditor value={content} onChange={setContent} />
                <Box sx={{ display: 'flex', mt: 2 }}>
                    {colors.map((col) => (
                        <Box
                            key={col}
                            sx={{
                                width: 24,
                                height: 24,
                                backgroundColor: col,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: col === color ? '2px solid black' : 'none',
                                mr: 1,
                            }}
                            onClick={() => setColor(col)}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditNote;