import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  
  if (!clientId) {
    console.error('Missing Google OAuth Client ID');
    return (
      <div style={{ padding: '20px', color: '#6A1B9B' }}>
        <h1>Configuration Error</h1>
        <p>Missing Google OAuth Client ID. Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;