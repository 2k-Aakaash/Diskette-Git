import React from 'react';
import { Drawer, List, ListItem, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArchiveIcon from '@mui/icons-material/Archive';
import MenuIcon from '@mui/icons-material/Menu';
import './Sidebar.css';

const Sidebar = ({ open, onClose }) => (
    <Drawer anchor="left" open={open} onClose={onClose}>
        <div className="sidebar-container">
            <div className="sidebar-header">
                <IconButton onClick={onClose} className="menu-icon">
                    <MenuIcon />
                </IconButton>
                <span className="brand-logo">Diskette</span>
            </div>
            <Divider />
            <List className="sidebar-content">
                <ListItem button>
                    <HomeIcon className="icon" />
                    <span className="text">Home</span>
                </ListItem>
                <ListItem button>
                    <NoteAddIcon className="icon" />
                    <span className="text">Create Diskette</span>
                </ListItem>
                <ListItem button>
                    <ArchiveIcon className="icon" />
                    <span className="text">Archive</span>
                </ListItem>
            </List>
            <Divider />
            <div className="sidebar-footer">
                <span>&copy; 2024 Diskette</span>
            </div>
        </div>
    </Drawer>
);

export default Sidebar;
