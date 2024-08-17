import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Import the useTheme hook
import './Sidebar.css';

// Import the icons
import disketteIcon from '../assets/edit-icon.svg';
import reminderIcon from '../assets/Notification-icon.svg';
import settingsIcon from '../assets/Settings-icon.svg';
import archiveIcon from '../assets/archive-icon.svg'; // Import archive icon
import trashIcon from '../assets/trash-icon.svg'; // Import trash icon

const Sidebar = ({ open }) => {
    const location = useLocation();
    const { mode } = useTheme(); // Get the current theme mode

    // Define styles based on the theme mode
    const sidebarStyles = {
        backgroundColor: mode === 'dark' ? 'var(--color-950)' : '#F7E6FF',
    };

    // const itemStyles = {
    //     backgroundColor: mode === 'dark' ? 'var(--color-900)' : '#F0CCFF',
    //     color: mode === 'dark' ? '#FFFFFF' : '#440054',
    // };

    return (
        <div className={`sidebar-container ${open ? 'open' : ''}`} style={sidebarStyles}>
            <div className="sidebar-content">
                <div className={`sidebar-item ${location.pathname === '/Diskette' ? 'active' : ''}`}>
                    <img src={disketteIcon} alt="Diskette Icon" className="icon" />
                    <span className="text">Diskettes</span>
                </div>
                <div className="sidebar-item">
                    <img src={archiveIcon} alt="Archive Icon" className="icon" />
                    <span className="text">Archived</span>
                </div>
                <div className="sidebar-item">
                    <img src={trashIcon} alt="Trash Icon" className="icon" />
                    <span className="text">Bin</span>
                </div>
                <div className="sidebar-item">
                    <img src={reminderIcon} alt="Reminder Icon" className="icon" />
                    <span className="text">Reminder (Coming Soon)</span>
                </div>
            </div>
            <div className="settings-button">
                <img src={settingsIcon} alt="Settings Icon" className="icon" />
                <span className="text">Settings</span>
            </div>
        </div>
    );
};

export default Sidebar;
