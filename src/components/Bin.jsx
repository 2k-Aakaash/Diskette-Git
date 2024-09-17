import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import '../index.css';
import Note from './Note';
import Sidebar from './Sidebar';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';
import { useTheme } from '../ThemeContext';
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc, runTransaction, collection, addDoc, getDoc } from 'firebase/firestore';

const Bin = ({ binNotes, setBinNotes, onUpdateNote }) => {
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
                console.error("Error fetching bin notes: ", error);
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
        const user = auth.currentUser;

        if (!user) {
            console.error("User is not authenticated.");
            return;
        }

        const noteRef = doc(db, 'bin', noteId);

        try {
            await runTransaction(db, async (transaction) => {
                const noteDoc = await transaction.get(noteRef);

                if (!noteDoc.exists()) {
                    throw "Note does not exist in bin.";
                }

                const noteData = noteDoc.data();
                const targetCollection = collection(db, 'notes');

                await addDoc(targetCollection, noteData);
                transaction.delete(noteRef);

                setBinNotes((prevBinNotes) => prevBinNotes.filter(note => note.id !== noteId));
            });

            console.log(`Note with ID ${noteId} restored.`);
        } catch (error) {
            console.error('Error restoring note:', error);
        }
    };

    const handleDeletePermanently = async (noteId) => {
        const noteRef = doc(db, 'bin', noteId);

        try {
            const noteDoc = await getDoc(noteRef);

            if (!noteDoc.exists()) {
                console.error(`Note with ID ${noteId} does not exist in bin.`);
                setBinNotes((prevBinNotes) => prevBinNotes.filter(note => note.id !== noteId));
                return;
            }

            await deleteDoc(noteRef);
            setBinNotes((prevBinNotes) => prevBinNotes.filter(note => note.id !== noteId));
            console.log(`Note with ID ${noteId} deleted permanently.`);
        } catch (error) {
            console.error(`Error permanently deleting note with ID ${noteId}:`, error);
        }
    };

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar open={sidebarOpen} />
            {sidebarOpen && <div className="overlay-background" onClick={toggleSidebar}></div>}
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

                            <h1 className="section-title">Bin</h1>
                        </div>
                        <div className="notes-grid">
                            {binNotes.length === 0 ? (
                                <div className="empty-notes-container">
                                    <div className="empty-notes-card centered-empty-message">
                                        <h5>No Notes in Bin</h5>
                                    </div>
                                </div>
                            ) : (
                                binNotes.map((note) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        onDelete={handleDeletePermanently}
                                        onRestore={handleRestoreNote}
                                        isInBin={true}
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

export default Bin;
