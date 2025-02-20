import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { getDashboardData, checkAuthStatus } from '../../services/api';
import { setDashboardData } from '../../store/slices/dashboardSlice';
import { clearUser, setUser } from '../../store/slices/userSlice';
import { setUser as storeSetUser } from '../../store/slices/userSlice';

// Import page components - make sure these are default exports
import Campaign from './pages/Campaign/index.js';  // Update the path if needed
import Content from './pages/Content/index.js';    // Update the path if needed
import Audience from './pages/Audience/index.js';  // Update the path if needed
import Integrations from './pages/Integrations/index.js';  // Update the path if needed
import CreateDestinationModal from './pages/Integrations/CreateDestinationModal';

const Dashboard = () => {
  const user = useAppSelector(state => state.user.user);
  const dashboardData = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();
  const drawerWidth = 280;
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [initialPlatform, setInitialPlatform] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        // Only check auth if we don't have a user
        if (!user) {
          const userData = await checkAuthStatus();
          if (userData) {
            dispatch(storeSetUser(userData));
          } else {
            navigate('/');
            return;
          }
        }

        // Only fetch dashboard data if we don't have it
        if (!dashboardData?.organization) {
          const data = await getDashboardData();
          if (data && data.organization) {
            dispatch(setDashboardData(data));
          }
        }
      } catch (error) {
        console.error('Dashboard initialization failed:', error);
        navigate('/');
      }
    };

    initDashboard();
  }, [dispatch, navigate, user, dashboardData]);

  useEffect(() => {
    // Check URL parameters for OAuth callback
    const params = new URLSearchParams(location.search);
    const platform = params.get('platform');
    const status = params.get('status');

    if (platform && status === 'success') {
      setInitialPlatform(platform);
      setShowDestinationModal(true);
      // Clean up URL
      navigate('/dashboard/integrations', { replace: true });
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        organizationName={dashboardData?.organization?.name || ''} 
        drawerWidth={drawerWidth} 
      />
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <TopBar user={user} />
        
        {/* Route-specific content */}
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