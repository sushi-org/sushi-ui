import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { checkAuthStatus, getDashboardData } from './services/api';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUser } from './store/slices/userSlice';
import { setDashboardData } from './store/slices/dashboardSlice';
import { CircularProgress, Box } from '@mui/material';

const LoadingScreen = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}
  >
    <CircularProgress />
  </Box>
);

const AppContent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const dashboardData = useAppSelector(state => state.dashboard);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      try {
        // Skip initialization if we already have both auth and dashboard data
        if (user.isAuthenticated && dashboardData?.organization) {
          setIsInitializing(false);
          return;
        }

        // Check authentication if needed
        if (!user.isAuthenticated) {
          const userData = await checkAuthStatus();
          if (!mounted) return;
          
          if (userData) {
            dispatch(setUser(userData));
          } else {
            setIsInitializing(false);
            return;
          }
        }

        // Fetch dashboard data only if authenticated and don't have it yet
        if (!dashboardData?.organization) {
          const data = await getDashboardData();
          if (!mounted) return;
          
          if (data) {
            dispatch(setDashboardData(data));
          }
        }
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array since we handle all checks inside

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard/*" element={
        user.isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
      } />
    </Routes>
  );
};

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
    <Provider store={store}>
      <Router>
        <GoogleOAuthProvider clientId={clientId}>
          <AppContent />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  );
}

export default App;