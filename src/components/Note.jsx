import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

const NoteCard = styled(Card)(({ theme, bgcolor }) => ({
    background: `linear-gradient(180deg, ${bgcolor} 0%, ${bgcolor} 70%, rgba(0,0,0,0) 100%)`,
    cursor: 'pointer',
    transition: 'none',
}));

const Note = ({ note }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/note/${note.id}`);
    };

    return (
        <NoteCard onClick={handleClick} bgcolor={note.color} sx={{ height: Math.random() > 0.5 ? '250px' : '180px' }}>
            <CardContent>
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
        </NoteCard>
    );
};

export default Note;
