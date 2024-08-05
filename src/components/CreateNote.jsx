import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import './CreateNote.css';

const customColors = {
    noteBackground: 'rgb(68, 49, 102)',
    noteText: 'rgb(255, 255, 255)',
    noteOverlay: 'rgba(0, 0, 0, 0.5)',
    noteTimestampBg: 'rgba(255, 255, 255, 0.8)',
    actionButton: 'rgb(130, 54, 189)',
    iconColor: 'rgb(255, 255, 255)',
    modalBackground: 'rgb(29, 25, 53)',
    buttonColor: 'rgb(130, 54, 189)',
    textColor: 'rgb(255, 255, 255)',
};

const colors = [
    customColors.noteBackground,
    customColors.actionButton,
    '#FFCDD2', '#FFE082', '#FFF176',
    '#A5D6A7', '#90CAF9', '#CE93D8',
    '#F48FB1', '#FFAB91', '#80DEEA',
    '#C5E1A5'
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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ '& .MuiDialog-paper': { backgroundColor: customColors.modalBackground, width: '90%' } }}>
            <DialogTitle sx={{ color: customColors.textColor }}>Create Note</DialogTitle>
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
                    InputLabelProps={{ style: { color: customColors.textColor } }}
                    InputProps={{ style: { color: customColors.textColor } }}
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
                                border: color === c ? `2px solid ${customColors.textColor}` : '2px solid transparent',
                                mr: 1
                            }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: customColors.textColor }}>Cancel</Button>
                <Button onClick={handleSave} sx={{ color: customColors.buttonColor }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNote;
