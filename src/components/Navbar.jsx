import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useTheme } from '../ThemeContext';
import ProfileModal from './ProfileModal';
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import searchIconLight from '../assets/search-icon-light.svg';
import searchIconDark from '../assets/search-icon-dark.svg';
import profileIconLight from '../assets/profile-icon-light.svg';
import profileIconDark from '../assets/profile-icon-dark.svg';
import darkModeIconLight from '../assets/dark-mode-icon-light.svg';
import darkModeIconDark from '../assets/light-mode-icon-dark.svg';

// Define custom colors
const navbarBgColorLight = '#F7E6FF';
const navbarBgColorDark = '#440054';
const textColorLight = 'rgb(0, 0, 0)';
const textColorDark = 'rgb(255, 255, 255)';
const searchBgColorLight = '#e8a4ff';
const searchBgColorDark = '#e8a4ff';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '12px',
    backgroundColor: theme.palette.mode === 'dark' ? searchBgColorDark : searchBgColorLight,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    width: '30ch', // Shorten the width
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.mode === 'dark' ? textColorDark : textColorLight,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? textColorDark : textColorLight,
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: '15ch',
    },
    '&:focus': {
        [theme.breakpoints.up('md')]: {
            width: '30ch', // Focus width
        },
    },
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? navbarBgColorDark : navbarBgColorLight,
    borderRadius: '12px',
    margin: '10px',
    width: 'auto',
    boxShadow: 'none',
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
        <CustomAppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src={theme === 'dark' ? logoDark : logoLight} alt="Diskette Logo" style={{ height: '30px', marginRight: '10px' }} />
                <Search>
                    <SearchIconWrapper>
                        <img src={theme === 'dark' ? searchIconDark : searchIconLight} alt="Search Icon" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Diskettes…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        <img src={theme === 'dark' ? darkModeIconDark : darkModeIconLight} alt="Theme Toggle Icon" style={{ width: '24px', height: '24px' }} />
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        onClick={handleProfileClick}
                    >
                        <img src={theme === 'dark' ? profileIconDark : profileIconLight} alt="Profile Icon" style={{ width: '20px', height: '20px' }} />
                    </IconButton>
                </div>
            </Toolbar>
            <ProfileModal open={profileOpen} onClose={handleProfileClose} />
        </CustomAppBar>
    );
};

export default Navbar;
