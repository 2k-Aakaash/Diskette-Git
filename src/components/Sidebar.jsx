import React from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.css';

// Import the icons
import disketteIcon from '../assets/edit-icon.svg';
import reminderIcon from '../assets/Notification-icon.svg';
import settingsIcon from '../assets/Settings-icon.svg';

const Sidebar = ({ open }) => {
    const location = useLocation();

    return (
        <div className={`sidebar-container ${open ? 'open' : ''}`}>
            <div className="sidebar-content">
                <div className={`sidebar-item ${location.pathname === '/Diskette' ? 'active' : ''}`}>
                    <img src={disketteIcon} alt="Diskette Icon" className="icon" />
                    <span className="text">Diskettes</span>
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
