import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

// Define custom colors
const customColors = {
    modalBackground: 'rgb(68, 49, 102)', // Modal background color
    modalText: 'rgb(255, 255, 255)', // Modal text color
    buttonCancel: 'rgb(45, 36, 76)', // Cancel button color
    buttonDelete: 'rgb(130, 54, 189)', // Delete button color
    buttonText: 'rgb(255, 255, 255)' // Button text color
};

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{ bgcolor: customColors.modalBackground, color: customColors.modalText, p: 2 }}>
                <DialogTitle sx={{ color: customColors.modalText }}>Delete Note</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: customColors.modalText }}>
                        Are you sure you want to delete this note? It will be moved to the bin.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} sx={{ color: customColors.buttonText, bgcolor: customColors.buttonCancel }}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} sx={{ color: customColors.buttonText, bgcolor: customColors.buttonDelete }}>
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
