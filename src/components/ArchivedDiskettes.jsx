import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import '../index.css';
import Note from './Note';
import Sidebar from './Sidebar';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';
import { useTheme } from '../ThemeContext';

const ArchivedDiskettes = ({ archivedNotes, onRestoreNote, onDeleteNote, onUpdateNote }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { mode } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching archived notes: ", error);
                setLoading(false);
            }
        };

        fetchData();

        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleRestoreNote = async (noteId) => {
        try {
            const noteToRestore = archivedNotes.find(note => note.id === noteId);
            if (!noteToRestore) {
                console.error(`Note with ID ${noteId} not found in archived notes.`);
                return;
            }

            await onUpdateNote(noteId, { ...noteToRestore, archived: false });
        } catch (error) {
            console.error(`Error restoring note with ID ${noteId}:`, error);
        }
    };

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar open={sidebarOpen} />
            <div className="main-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className='priority-diskette-container'>
                            <button className="menu-button" onClick={toggleSidebar}>
                                <img src={mode === 'dark' ? menuDark : menuLight} alt="Menu" />
                            </button>

                            <h1 className="section-title">Archived Diskettes</h1>
                        </div>
                        <div className="notes-grid">
                            {archivedNotes.length === 0 ? (
                                <div className="empty-notes-container">
                                    <div className="empty-notes-card centered-empty-message">
                                        <h5>No Archived Diskettes Found</h5>
                                    </div>
                                </div>
                            ) : (
                                archivedNotes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        onDelete={onDeleteNote}
                                        onRestore={handleRestoreNote}
                                    />
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArchivedDiskettes;
