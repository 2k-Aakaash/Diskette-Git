// src/components/Note.jsx
import React from 'react';
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

const NoteCard = styled(Card)(({ theme, bgcolor }) => ({
    background: `linear-gradient(180deg, ${bgcolor} 0%, ${bgcolor} 70%, rgba(0,0,0,0) 100%)`,
    cursor: 'pointer',
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&:hover .overlay': {
        opacity: 1,
    },
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'space-around',
    opacity: 0,
    transition: 'opacity 0.3s',
}));

const Note = ({ note, onEdit, onDelete, onArchive, onPin, onExport, onChangeColor }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/note/${note.id}`);
    };

    return (
        <NoteCard bgcolor={note.color}>
            <CardContent onClick={handleClick}>
                <Typography variant="h5" component="div" fontWeight="bold" sx={{ color: '#000' }}>
                    {note.title}
                </Typography>
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4
                    }}
                >
                    <Markdown>{note.content}</Markdown>
                </Box>
            </CardContent>
            <Overlay className="overlay">
                <IconButton onClick={() => onEdit(note.id)}><EditIcon /></IconButton>
                <IconButton onClick={() => onDelete(note.id)}><DeleteIcon /></IconButton>
                <IconButton onClick={() => onArchive(note.id)}><ArchiveIcon /></IconButton>
                <IconButton onClick={() => onPin(note.id)}><PushPinIcon /></IconButton>
                <IconButton onClick={() => onExport(note.id)}><FileDownloadIcon /></IconButton>
                <IconButton onClick={() => onChangeColor(note.id)}><PaletteIcon /></IconButton>
                <IconButton><MoreVertIcon /></IconButton>
            </Overlay>
        </NoteCard>
    );
};

export default Note;
