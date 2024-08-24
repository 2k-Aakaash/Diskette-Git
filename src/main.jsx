// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeContextProvider from './ThemeContext';
import App from './App';
import './index.css';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeContextProvider>
    <BrowserRouter> {/* Remove basename */}
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeContextProvider>
);
