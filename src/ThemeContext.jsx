import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState('light'); // Default theme

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchTheme = async () => {
                try {
                    const themeDoc = doc(db, 'userPreferences', user.uid);
                    const docSnap = await getDoc(themeDoc);

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

    useEffect(() => {
        // Add or remove the theme class from body when mode changes
        document.body.classList.toggle('dark-mode', mode === 'dark');
        document.body.classList.toggle('light-mode', mode === 'light');
    }, [mode]);

    const toggleTheme = async () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);

        if (user) {
            try {
                const userPreferencesRef = doc(db, 'userPreferences', user.uid);
                await setDoc(userPreferencesRef, { theme: newMode }, { merge: true });
            } catch (error) {
                console.error("Error updating theme: ", error);
            }
        } else {
            console.log("User is not authenticated");
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
