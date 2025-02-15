import React from 'react';
import { 
  Box, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Article as ContentIcon,
  People as AudienceIcon,
  Extension as IntegrationsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import WorkspaceSelector from './WorkspaceSelector';

const Sidebar = ({ drawerWidth = 280 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/dashboard', icon: CampaignIcon, label: 'Campaign' },
    { path: '/dashboard/content', icon: ContentIcon, label: 'Content' },
    { path: '/dashboard/audience', icon: AudienceIcon, label: 'Audience' },
    { path: '/dashboard/integrations', icon: IntegrationsIcon, label: 'Integrations' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1C2536',
          color: 'white',
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}
        >
          AdSensei
        </Typography>
      </Box>

      {/* Workspace Selector */}
      <Box sx={{ px: 2, mb: 3 }}>
        <WorkspaceSelector />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Navigation Items */}
      <List>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = currentPath === item.path;
          
          return (
            <ListItem 
              button 
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
              }}
            >
              <ListItemIcon>
                <Icon sx={{ 
                  color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{
                  '& .MuiListItemText-primary': {
                    color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: isSelected ? 600 : 400,
                  }
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar; 