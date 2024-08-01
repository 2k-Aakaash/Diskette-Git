import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { auth, db } from './firebaseConfig'; // Adjust the path as needed
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState('light');

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchTheme = async () => {
                try {
                    const themeDoc = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(themeDoc);

                    // Set theme from Firestore or default to 'light'
                    if (docSnap.exists()) {
                        setMode(docSnap.data().theme || 'light');
                    } else {
                        setMode('light');
                    }
                } catch (error) {
                    console.error("Error fetching theme: ", error);
                }
            };

            fetchTheme();
        }
    }, [user]);

    const toggleTheme = async () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);

        if (user) {
            try {
                // Update the theme in Firestore
                await setDoc(doc(db, 'users', user.uid), { theme: newMode }, { merge: true });
            } catch (error) {
                console.error("Error updating theme: ", error);
            }
        }
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
