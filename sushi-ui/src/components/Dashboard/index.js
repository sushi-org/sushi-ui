import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/userSlice';
import { setDashboardData } from '../../store/slices/dashboardSlice';
import { checkAuthStatus, getDashboardData } from '../../services/api';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import Campaign from './pages/Campaign';
import Content from './pages/Content';
import Audience from './pages/Audience';
import Integrations from './pages/Integrations';
import CreateDestinationModal from './pages/Integrations/CreateDestinationModal';

// Define theme colors
const theme = {
  primaryColor: '#9464e8',    // Primary color
  secondaryColor: '#FFFFFF',   // White
  backgroundColor: '#F5F5F5',  // Light gray
};

const Dashboard = () => {
  const dashboardData = useAppSelector(state => state.dashboard);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const drawerWidth = 280;
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [initialPlatform, setInitialPlatform] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the shop query parameter
  const params = new URLSearchParams(location.search);
  const shop = params.get('shop'); // Get the shop parameter

  useEffect(() => {
    // Check URL parameters for OAuth callback
    const platform = params.get('platform');
    const status = params.get('status');

    if (platform && status === 'success') {
      setInitialPlatform(platform);
      setShowDestinationModal(true);
      // Clean up URL
      navigate('/dashboard/integrations', { replace: true });
    }
  }, [location, navigate]);

  // Add a new useEffect to handle shop parameter and authentication
  useEffect(() => {
    // Only proceed if shop parameter exists
    if (shop) {
      const verifyAuth = async () => {
        try {
          // Call checkAuthStatus with the shop parameter
          const userData = await checkAuthStatus(shop);
          
          if (userData) {
            // Update user state with the returned data
            dispatch(setUser(userData));
            
            // After successful authentication, fetch dashboard data
            try {
              const dashboardData = await getDashboardData();
              if (dashboardData) {
                dispatch(setDashboardData(dashboardData));
              }
            } catch (error) {
              console.error('Failed to fetch dashboard data:', error);
            }
          }
        } catch (error) {
          console.error('Authentication verification failed:', error);
        }
      };
      
      verifyAuth();
    }
  }, [shop, dispatch]); // Dependencies: shop parameter and dispatch function

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        organizationName={dashboardData?.organization?.name || 'Loading...'} 
        drawerWidth={drawerWidth} 
      />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <TopBar />
        
        <Routes>
          <Route path="/" element={<Campaign />} />
          <Route path="/content" element={<Content />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>

      <CreateDestinationModal 
        open={showDestinationModal} 
        onClose={() => {
          setShowDestinationModal(false);
          setInitialPlatform(null);
        }}
        initialPlatform={initialPlatform}
        initialStep={initialPlatform ? 1 : 0}
      />
    </Box>
  );
};

export default Dashboard; 