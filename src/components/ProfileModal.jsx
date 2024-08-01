import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { auth, provider, signInWithPopup, signOut } from '../firebaseConfig'; // Import from firebaseConfig

// Define custom colors
const customColors = {
    modalBackground: 'rgb(68, 49, 102)', // Modal background color
    textColor: 'rgb(255, 255, 255)', // Text color
    actionButton: 'rgb(130, 54, 189)', // Button color
    iconColor: 'rgb(255, 255, 255)', // Icon color
};

const ProfileModal = ({ open, onClose }) => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('Guest');
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setName(user.displayName || 'Guest');
                setPhotoURL(user.photoURL || '');
            } else {
                setUser(null);
                setName('Guest');
                setPhotoURL('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setName(user.displayName || 'Guest');
            setPhotoURL(user.photoURL || '');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setName('Guest');
            setPhotoURL('');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: customColors.modalBackground,
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                color: customColors.textColor
            }}>
                <Typography variant="h6" color={customColors.textColor}>Profile</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    {photoURL && <img src={photoURL} alt="Profile" style={{ borderRadius: '50%', width: 50, height: 50, marginRight: 10 }} />}
                    {isEditing ? (
                        <TextField
                            value={name}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{ style: { color: customColors.textColor } }}
                        />
                    ) : (
                        <Typography variant="body1" color={customColors.textColor}>{name}</Typography>
                    )}
                    <IconButton onClick={isEditing ? handleSaveClick : handleEditClick} style={{ color: customColors.iconColor }}>
                        <EditIcon />
                    </IconButton>
                </Box>
                {user ? (
                    <Button
                        onClick={handleSignOut}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ backgroundColor: customColors.actionButton }}
                    >
                        Sign Out
                    </Button>
                ) : (
                    <Button
                        onClick={handleSignIn}
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ backgroundColor: customColors.actionButton }}
                    >
                        Sign In with Google
                    </Button>
                )}
            </Box>
        </Modal>
    );
};

export default ProfileModal;
