// src/components/Navbar.jsx
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../ThemeContext';
import ProfileModal from './ProfileModal';
import logo from '../assets/logo.svg'; // Import the SVG logo

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch', // Smaller width for smaller screens
        },
        [theme.breakpoints.up('md')]: {
            width: '80ch', // Default width when not focused
        },
        '&:focus': {
            [theme.breakpoints.up('md')]: {
                width: '110ch', // Width when focused
            },
        },
    },
}));

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [profileOpen, setProfileOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileOpen(true);
    };

    const handleProfileClose = () => {
        setProfileOpen(false);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={logo} alt="Diskette Logo" style={{ height: '30px', marginRight: '10px' }} />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleProfileClick}
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
            <ProfileModal open={profileOpen} onClose={handleProfileClose} />
        </AppBar>
    );
};

export default Navbar;
