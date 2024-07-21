// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeContextProvider from './ThemeContext';
import App from './App';
import './index.css';
import './styles/global.css';

ReactDOM.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeContextProvider>,
  document.getElementById('root')
);
