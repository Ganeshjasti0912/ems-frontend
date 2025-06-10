import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AuthProvider from './context/authContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Router wraps everything */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
