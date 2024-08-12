import React from 'react';
import NoteCard from './Note';
import './ArchiveSection.css';

const ArchiveSection = ({ archivedNotes, onUnarchive, customColors }) => {
    return (
        <div className="archive-section">
            <h2 className="archive-title" style={{ color: customColors.noteText }}>Archived Diskettes</h2>
            <div className="archive-notes-container">
                {archivedNotes.map(note => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onUnarchive={onUnarchive}
                        isArchived
                        customColors={customColors}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArchiveSection;
