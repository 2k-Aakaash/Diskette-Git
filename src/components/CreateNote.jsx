// src/components/CreateNote.jsx
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const CreateNote = ({ open, onClose, onSave }) => {
    const [title, setTitle] = useState('Note Title');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#ffffff');

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
                <FormControl fullWidth variant="standard" margin="dense">
                    <InputLabel>Color</InputLabel>
                    <Select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <MenuItem value="#ffffff">White</MenuItem>
                        <MenuItem value="#ffcccb">Red</MenuItem>
                        <MenuItem value="#ccffcc">Green</MenuItem>
                        <MenuItem value="#ccccff">Blue</MenuItem>
                        {/* Add more colors as needed */}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNote;
