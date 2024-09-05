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
    modalBackground: '#390045',
    buttonColor: '#fcf3ff',
    textColor: 'rgb(184, 184, 184)',
    bigTextColor: '#fff',
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
    const [title, setTitle] = useState('Title');
    const [content, setContent] = useState('');
    const [color, setColor] = useState(colors[0]);

    const handleSave = () => {
        onSave({ title, content, color });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="90%" fullWidth sx={{ '& .MuiDialog-paper': { backgroundColor: customColors.modalBackground, width: '100%', borderRadius: '20px', padding: '10px 4px 10px 4px' } }}>
            <DialogTitle sx={{
                color: customColors.bigTextColor, fontSize: '1.5rem', fontWeight: '700', padding: '10px 10px 10px 20px'
            }}>Create Diskette</DialogTitle>
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
                <Box sx={{ flexGrow: 1, overflow: 'hidden', mt: 2 }}>
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        highlightEnable={false}
                    />
                </Box>
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
                                border: color === c ? `3px solid black` : '2px solid transparent',
                                mr: 1
                            }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '16px' }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: customColors.textColor,
                        backgroundColor: customColors.noteBackground,
                        padding: '8px 16px',
                        borderRadius: '12px',
                        '&:hover': { backgroundColor: customColors.noteBackground, opacity: 0.8 },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    sx={{
                        color: customColors.buttonColor,
                        backgroundColor: customColors.actionButton,
                        padding: '8px 20px',
                        borderRadius: '12px',
                        ml: 2,
                        '&:hover': { backgroundColor: customColors.actionButton, opacity: 0.8 },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNote;
