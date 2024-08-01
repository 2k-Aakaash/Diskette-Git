// src/components/SearchBar.jsx
import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ query, setQuery }) => {
    return (
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
};

export default SearchBar;
