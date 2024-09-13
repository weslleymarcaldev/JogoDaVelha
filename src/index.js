import { StrictMode } from 'react';
//import React from 'react';
import { createRoot } from 'react-dom/client';
//import ReactDOM from 'react-dom/client'; // Atualização necessária para React 18
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);