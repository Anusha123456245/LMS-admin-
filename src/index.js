// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'; // 📌 Important for grid system


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CssBaseline />
    <App />
  </>
);
