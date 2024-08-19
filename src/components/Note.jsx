import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';
import Markdown from 'markdown-to-jsx';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import PushPinIcon from '@mui/icons-material/PushPin';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './Note.css';

const Note = ({ note, onEdit, onDelete, onArchive, onPin, onExport, onPriorityToggle }) => {
    const navigate = useNavigate();
    const [overlayVisible, setOverlayVisible] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
        id: note.id,
        activationConstraint: {
            distance: { x: 15, y: 15 },
        },
    });

    const handleCardClick = () => {
        if (window.innerWidth > 600) {
            navigate(`/note/${note.id}`);
        }
    };

    const toggleOverlayVisibility = (event) => {
        event.stopPropagation();
        setOverlayVisible(!overlayVisible);
    };

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        backgroundColor: note.color,
    };

    return (
        <div
            className="note-card"
            style={style}
            onClick={handleCardClick}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onMouseEnter={() => window.innerWidth >= 480 && setOverlayVisible(true)}
            onMouseLeave={() => window.innerWidth >= 480 && setOverlayVisible(false)}
        >
            <div className="card-content">
                <h1 className="note-title">{note.title}</h1>
                <div className="note-text">
                    <Markdown>{note.content}</Markdown>
                </div>
            </div>
            <div className="timestamp">
                <span>Updated: {moment(note.updatedAt).isValid() ? moment(note.updatedAt).format('MMM DD, YYYY hh:mm A') : 'Invalid Date'}</span>
            </div>
            {window.innerWidth >= 480 ? (
                <div className={`overlay ${overlayVisible ? 'visible' : ''}`} onClick={(event) => event.stopPropagation()}>
                    <button onClick={() => onEdit(note.id)}><EditIcon /></button>
                    <button onClick={() => onDelete(note.id)}><DeleteIcon /></button>
                    <button onClick={() => onArchive(note.id)}><ArchiveIcon /></button>
                    {onPin && <button onClick={() => onPin(note.id)}><PushPinIcon /></button>}
                    {onExport && <button onClick={() => onExport(note.id)}><FileDownloadIcon /></button>}
                    {onPriorityToggle && <button onClick={() => onPriorityToggle(note.id)}><StarIcon /></button>}
                </div>
            ) : (
                <>
                    <button className="more-options" onClick={toggleOverlayVisibility}>
                        <MoreVertIcon />
                    </button>
                    {overlayVisible && (
                        <div className="overlay" onClick={(event) => event.stopPropagation()}>
                            <button onClick={() => onEdit(note.id)}><EditIcon /></button>
                            <button onClick={() => onDelete(note.id)}><DeleteIcon /></button>
                            <button onClick={() => onArchive(note.id)}><ArchiveIcon /></button>
                            {onPin && <button onClick={() => onPin(note.id)}><PushPinIcon /></button>}
                            {onExport && <button onClick={() => onExport(note.id)}><FileDownloadIcon /></button>}
                            {onPriorityToggle && <button onClick={() => onPriorityToggle(note.id)}><StarIcon /></button>}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Note;
