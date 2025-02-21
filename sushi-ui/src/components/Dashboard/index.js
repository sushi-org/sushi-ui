import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

import Campaign from './pages/Campaign';
import Content from './pages/Content';
import Audience from './pages/Audience';
import Integrations from './pages/Integrations';
import CreateDestinationModal from './pages/Integrations/CreateDestinationModal';

const Dashboard = () => {
  const dashboardData = useAppSelector(state => state.dashboard);
  const drawerWidth = 280;
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [initialPlatform, setInitialPlatform] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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