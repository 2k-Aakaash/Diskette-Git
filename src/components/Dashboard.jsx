import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../index.css';
import Note from './Note';
import Sidebar from './Sidebar';
import menuDark from '../assets/menu-dark.svg';
import menuLight from '../assets/menu-light.svg';
import disketteIcon from '../assets/edit-icon2.svg';
import { useTheme } from '../ThemeContext';
import { auth, db, provider, signInWithPopup } from '../firebaseConfig';
import { onSnapshot, collection, where, query } from 'firebase/firestore';

const Dashboard = ({ onCreateNote, onEditNote, onDeleteNote, onArchiveNote, onExportNote, onChangeColor, onUpdateNote }) => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { mode } = useTheme();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser);
                    fetchNotes(currentUser.uid); // Fetch notes after user is authenticated
                } else {
                    setUser(null);
                    setLoading(false); // Stop loading if there's no user
                }
            });

            return () => unsubscribe();
        };

        const fetchNotes = async (userId) => {
            setLoading(true); // Start loading only when fetching notes
            try {
                const q = query(collection(db, 'notes'), where('userId', '==', userId));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const fetchedNotes = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setNotes(fetchedNotes);
                    setLoading(false); // Stop loading when notes are fetched
                });

                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching notes: ', error);
                setLoading(false); // Stop loading if there's an error
            }
        };

        fetchUser();
    }, []); // Removed sidebarOpen from dependencies

    // Update screen width state on window resize
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeNotes = notes.filter(note => !note.archived);
    const priorityNotes = activeNotes.filter(note => note.isPriority);
    const regularNotes = activeNotes.filter(note => !note.isPriority);

    const handlePriorityToggle = async (noteId) => {
        const updatedNote = activeNotes.find(note => note.id === noteId);
        if (!updatedNote) return;

        updatedNote.isPriority = !updatedNote.isPriority;

        try {
            await onUpdateNote(noteId, updatedNote);
        } catch (error) {
            console.error('Error updating note priority:', error);
        }
    };

    // Function for handling sign-in with Google (from ProfileModal)
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    if (!user) {
        return (
            <div className="empty-notes-container">
                <div className="empty-notes-card centered-empty-message">
                    <h5>Welcome to Diskette!</h5>
                    <p>Log in to save your notes securely and access them from any device.</p>
                    <button className="create-note-button" onClick={handleSignIn}>Log In</button> {/* Use handleSignIn */}
                </div>
            </div>
        );
    }

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} />

            {/* Overlay when sidebar is open */}
            {sidebarOpen && screenWidth < 480 && <div className="overlay-background" onClick={closeSidebar}></div>}

            {/* Main Content */}
            <div className="main-content">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        {activeNotes.length === 0 ? (
                            <div className="empty-notes-container">
                                <div className="empty-notes-card centered-empty-message">
                                    <h5>No Diskettes Found</h5>
                                    <p>It looks like you don't have any Diskettes yet. Start by creating your first Diskette.</p>
                                    <button className="create-note-button" onClick={onCreateNote}>Create Your First Diskette</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='priority-diskette-container'>
                                    <button className="menu-button" onClick={toggleSidebar}>
                                        <img src={mode === 'dark' ? menuDark : menuLight} alt="Menu" />
                                    </button>
                                    <h1 className="section-title priority-diskette">Priority Diskettes</h1>
                                </div>
                                <div className="notes-grid horizontal-scroll">
                                    {priorityNotes.map((note) => (
                                        <Note
                                            key={note.id}
                                            note={note}
                                            onEdit={onEditNote}
                                            onDelete={onDeleteNote}
                                            onArchive={onArchiveNote}
                                            onExport={onExportNote}
                                            onChangeColor={onChangeColor}
                                            onPriorityToggle={handlePriorityToggle}
                                        />
                                    ))}
                                </div>

                                <h1 className="section-title">Diskettes</h1>
                                <div className="notes-grid">
                                    {regularNotes.map((note) => (
                                        <Note
                                            key={note.id}
                                            className={note.isPriority ? 'priority-note' : ''}
                                            note={note}
                                            onEdit={onEditNote}
                                            onDelete={onDeleteNote}
                                            onArchive={onArchiveNote}
                                            onExport={onExportNote}
                                            onChangeColor={onChangeColor}
                                            onPriorityToggle={handlePriorityToggle}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* Floating button for creating notes */}
            <button className="create-note-button-floating" onClick={onCreateNote}>
                <img src={disketteIcon} alt="Create Diskette" style={{ width: '24px', height: '24px' }} />
                <span>Create Diskette</span>
            </button>
        </div>
    );
};

export default Dashboard;
