import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

// Import page components
import Campaign from './pages/Campaign';
import Content from './pages/Content';
import Audience from './pages/Audience';
import Integrations from './pages/Integrations';

const Dashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    workspaces: []
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerWidth={drawerWidth} />
      
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
    </Box>
  );
};

export default Dashboard; 