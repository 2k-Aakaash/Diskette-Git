import React from 'react';
import './Sidebar.css';

const Sidebar = ({ open }) => (
    <div className={`sidebar-container ${open ? 'open' : ''}`}>
        <div className="sidebar-content">
            <div className="sidebar-item">
                <img src="src/assets/edit-icon.svg" alt="Diskette Icon" className="icon" />
                <span className="text">Diskettes</span>
            </div>
            <div className="sidebar-item">
                <img src="src/assets/Notification-icon.svg" alt="Reminder Icon" className="icon" />
                <span className="text">Reminder (Coming Soon)</span>
            </div>
        </div>
        <div className="settings-button">
            <img src="src/assets/Settings-icon.svg" alt="Settings Icon" className="icon" />
            <span className="text">Settings</span>
        </div>
    </div>
);

export default Sidebar;
