// src/components/Note.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import PushPinIcon from '@mui/icons-material/PushPin';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PaletteIcon from '@mui/icons-material/Palette';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

// Define custom colors using CSS variables
const customColors = {
    noteText: '#FFFFFF',
    noteBackground: '#372C56'
};

const NoteCard = styled(Card)(({ theme, bgcolor }) => ({
    background: `linear-gradient(180deg, ${bgcolor} 0%, ${bgcolor} 70%, ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0)' : 'rgba(0,0,0,0)'} 100%)`,
    cursor: 'pointer',
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
    position: 'relative',
    transition: 'background 0.3s ease-in-out',
    height: '150px', // Set a fixed height for all notes
    '&:hover .overlay': {
        opacity: 1,
    },
    [theme.breakpoints.down('sm')]: {
        '&:hover .overlay': {
            opacity: 0,
        },
    }
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'space-around',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    '&.visible': {
        opacity: 1,
    },
}));

const Timestamp = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    padding: '2px 5px',
    borderRadius: '4px',
    color: theme.palette.text.primary,
}));

const MoreOptionsIcon = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
        display: 'none',
    },
}));

const Note = ({ note, onEdit, onDelete, onArchive, onPin, onExport, onChangeColor }) => {
    const navigate = useNavigate();
    const [overlayVisible, setOverlayVisible] = useState(false);

    const handleCardClick = () => {
        if (window.innerWidth > 600) {
            navigate(`/note/${note.id}`);
        }
    };

    const toggleOverlayVisibility = (event) => {
        event.stopPropagation(); // Prevent triggering handleCardClick
        setOverlayVisible(!overlayVisible);
    };

    return (
        <NoteCard bgcolor={note.color || customColors.noteBackground} onClick={handleCardClick}>
            <CardContent>
                <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: customColors.noteText }}>
                    {note.title}
                </Typography>
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 6, // Adjust the line clamp to fit the fixed height
                        color: customColors.noteText,
                        height: '180px' // Adjust the height of the content box to fit the fixed card height
                    }}
                >
                    <Markdown>{note.content}</Markdown>
                </Box>
            </CardContent>
            <Timestamp>
                <Typography variant="caption" color="textSecondary">
                    Updated: {moment(note.updatedAt).isValid() ? moment(note.updatedAt).format('MMM DD, YYYY hh:mm A') : 'Invalid Date'}
                </Typography>
            </Timestamp>
            <Overlay className={`overlay ${overlayVisible ? 'visible' : ''}`} onClick={(event) => event.stopPropagation()}>
                <IconButton onClick={() => onEdit(note.id)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(note.id)}><DeleteIcon /></IconButton>
                <IconButton onClick={() => onArchive(note.id)}><ArchiveIcon /></IconButton>
                <IconButton onClick={() => onPin(note.id)}><PushPinIcon /></IconButton>
                <IconButton onClick={() => onExport(note.id)}><FileDownloadIcon /></IconButton>
                <IconButton onClick={() => onChangeColor(note.id)}><PaletteIcon /></IconButton>
            </Overlay>
            <MoreOptionsIcon onClick={toggleOverlayVisibility}>
                <MoreVertIcon />
            </MoreOptionsIcon>
        </NoteCard>
    );
};

export default Note;
