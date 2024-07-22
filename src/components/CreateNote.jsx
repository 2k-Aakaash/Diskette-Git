// src/components/CreateNote.jsx
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const colors = [
    '#FFCDD2', '#FFE082', '#FFF176', '#A5D6A7', '#90CAF9',
    '#CE93D8', '#F48FB1', '#FFAB91', '#80DEEA', '#C5E1A5'
];

const CreateNote = ({ open, onClose, onSave }) => {
    const [title, setTitle] = useState('Note Title');
    const [content, setContent] = useState('');
    const [color, setColor] = useState(colors[0]);

    const handleSave = () => {
        onSave({ title, content, color });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Note</DialogTitle>
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
                    {colors.map((c) => (
                        <Box
                            key={c}
                            sx={{
                                width: 24,
                                height: 24,
                                backgroundColor: c,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                border: color === c ? '2px solid black' : '2px solid transparent',
                                mr: 1
                            }}
                            onClick={() => setColor(c)}
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

export default CreateNote;
