import React from 'react';
import { List, ListItem, Divider, IconButton } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import './Sidebar.css';

const Sidebar = ({ open }) => (
    <div className={`sidebar-container ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
            <span className="brand-logo">Diskette</span>
        </div>
        <Divider />
        <List className="sidebar-content">
            <ListItem button>
                <NoteAddIcon className="icon" />
                <span className="text">Diskettes</span>
            </ListItem>
            <ListItem button>
                <ArchiveIcon className="icon" />
                <span className="text">Reminder (Coming Soon)</span>
            </ListItem>
        </List>
        <Divider />
        <div className="sidebar-footer">
            <IconButton className="settings-icon">
                <SettingsIcon />
                <span className="text">Settings</span>
            </IconButton>
        </div>
    </div>
);

export default Sidebar;
