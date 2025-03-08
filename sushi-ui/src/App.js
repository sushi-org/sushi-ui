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
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.user);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking auth status...");
        const userData = await checkAuthStatus();
        console.log("Auth check successful:", userData);
        
        dispatch(setUser(userData));
        
        try {
          const dashboardData = await getDashboardData();
          console.log("Dashboard data fetched:", dashboardData);
          dispatch(setDashboardData(dashboardData));
        } catch (dashboardError) {
          console.error("Error fetching dashboard data:", dashboardError);
        }
      } catch (error) {
        console.log("Not authenticated:", error);
        // User is not authenticated, that's okay
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [dispatch]);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/" state={{ redirectedFrom: '/dashboard' }} replace />
          )
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AppContent />
        </GoogleOAuthProvider>
      </Provider>
    </Router>
  );
};

export default App;