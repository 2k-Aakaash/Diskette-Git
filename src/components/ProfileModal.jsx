// src/components/ProfileModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfileModal = ({ open, onClose }) => {
    const [name, setName] = useState(() => {
        const savedName = localStorage.getItem('username');
        return savedName || 'Guest';
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('username', name);
    }, [name]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
                <Typography variant="h6">Profile</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    {isEditing ? (
                        <TextField value={name} onChange={handleChange} fullWidth />
                    ) : (
                        <Typography variant="body1">{name}</Typography>
                    )}
                    <IconButton onClick={isEditing ? handleSaveClick : handleEditClick}>
                        <EditIcon />
                    </IconButton>
                </Box>
                {/* Add more user data display here */}
            </Box>
        </Modal>
    );
};

export default ProfileModal;
