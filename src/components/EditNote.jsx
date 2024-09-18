// src/components/EditNote.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

const customColors = {
    noteBackground: 'rgb(68, 49, 102)',
    noteText: 'rgb(255, 255, 255)',
    noteOverlay: 'rgba(0, 0, 0, 0.5)',
    noteTimestampBg: 'rgba(255, 255, 255, 0.8)',
    actionButton: 'rgb(130, 54, 189)',
    iconColor: 'rgb(255, 255, 255)',
    modalBackground: '#390045',
    buttonColor: '#fcf3ff',
    textColor: 'rgb(184, 184, 184)',
    bigTextColor: '#fff',
};


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
        <Dialog open={open} onClose={onClose} maxWidth="90%" fullWidth sx={{ '& .MuiDialog-paper': { backgroundColor: customColors.modalBackground, width: '100%', borderRadius: '20px', padding: '10px 4px 10px 4px' } }}>
            <DialogTitle sx={{
                color: customColors.bigTextColor, fontSize: '1.5rem', fontWeight: '700', padding: '10px 10px 10px 20px'
            }}>Edit Diskette</DialogTitle>
            <DialogContent sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    InputLabelProps={{ style: { color: customColors.textColor } }}
                />
                <MDEditor value={content} onChange={setContent} highlightEnable={false} />
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
                                border: col === color ? '3px solid black' : 'none',
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