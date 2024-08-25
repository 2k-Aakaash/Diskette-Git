import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import './Sidebar.css';
import disketteIcon from '../assets/edit-icon.svg';
import archiveIcon from '../assets/archive-icon.svg';
import trashIcon from '../assets/trash-icon.svg';
import reminderIcon from '../assets/Notification-icon.svg';
import settingsIcon from '../assets/Settings-icon.svg';

const Sidebar = ({ open }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mode } = useTheme();

    const sidebarStyles = {
        backgroundColor: mode === 'dark' ? 'var(--color-950)' : '#F7E6FF',
    };

    return (
        <div className={`sidebar-container ${open ? 'open' : ''}`} style={sidebarStyles}>
            <div className="sidebar-content">
                <div className={`sidebar-item ${location.pathname === '/Diskette' ? 'active' : ''}`} onClick={() => navigate('/')}>
                    <img src={disketteIcon} alt="Diskette Icon" className="icon" />
                    <span className="text">Diskettes</span>
                </div>
                <div className={`sidebar-item ${location.pathname === '/Archived' ? 'active' : ''}`} onClick={() => navigate('/Archived')}>
                    <img src={archiveIcon} alt="Archive Icon" className="icon" />
                    <span className="text">Archived</span>
                </div>
                <div className={`sidebar-item ${location.pathname === '/Bin' ? 'active' : ''}`} onClick={() => navigate('/Bin')}>
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
