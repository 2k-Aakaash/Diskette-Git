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
import logo from '../assets/logo.svg';

// Define custom colors
const navbarBgColor = 'rgb(130, 54, 189)';
const textColor = 'rgb(255, 255, 255)';
const searchBgColor = alpha('rgb(255, 255, 255)', 0.15);
const searchHoverColor = alpha('rgb(255, 255, 255)', 0.25);
const hoverColor = 'rgb(68, 49, 102)';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: searchBgColor,
    '&:hover': {
        backgroundColor: searchHoverColor,
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
    color: textColor,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: textColor,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
        [theme.breakpoints.up('md')]: {
            width: '80ch',
        },
        '&:focus': {
            [theme.breakpoints.up('md')]: {
                width: '110ch',
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
        <AppBar position="static" sx={{ backgroundColor: navbarBgColor }}>
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
                        {theme === 'dark' ? <Brightness7Icon sx={{ color: textColor }} /> : <Brightness4Icon sx={{ color: textColor }} />}
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleProfileClick}
                    >
                        <AccountCircle sx={{ color: textColor }} />
                    </IconButton>
                </div>
            </Toolbar>
            <ProfileModal open={profileOpen} onClose={handleProfileClose} />
        </AppBar>
    );
};

export default Navbar;
