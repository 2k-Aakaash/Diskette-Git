import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ open, onClose }) => (
    <Drawer anchor="left" open={open} onClose={onClose}>
        <List>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <NoteAddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Diskette" />
            </ListItem>
        </List>
    </Drawer>
);

export default Sidebar;
