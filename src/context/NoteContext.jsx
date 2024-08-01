// src/context/NoteContext.js
import React, { createContext, useReducer } from 'react';
import moment from 'moment';

const NoteContext = createContext();

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return [...state, { ...action.payload, createdAt: moment().toISOString(), updatedAt: moment().toISOString() }];
        case 'UPDATE_NOTE':
            return state.map(note =>
                note.id === action.payload.id
                    ? { ...note, ...action.payload, updatedAt: moment().toISOString() }
                    : note
            );
        default:
            return state;
    }
};

const NoteProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(noteReducer, []);

    const createNote = (noteData) => {
        dispatch({ type: 'CREATE_NOTE', payload: { ...noteData, id: generateUniqueId() } });
    };

    const updateNote = (noteId, updatedData) => {
        dispatch({ type: 'UPDATE_NOTE', payload: { id: noteId, ...updatedData } });
    };

    return (
        <NoteContext.Provider value={{ notes, createNote, updateNote }}>
            {children}
        </NoteContext.Provider>
    );
};

export { NoteContext, NoteProvider };
