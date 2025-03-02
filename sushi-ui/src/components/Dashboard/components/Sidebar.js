import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';

const Sidebar = ({ drawerWidth = 280 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const { organizationName } = useSelector((state) => state.user);

  const dashboardState = useSelector((state) => {
    console.log('Sidebar: Full Redux State:', state);
    console.log('Sidebar: Dashboard State:', state.dashboard);
    return state.dashboard || {};
  });

  useEffect(() => {
    console.log('Sidebar: Dashboard state updated:', dashboardState);
    console.log('Sidebar: Organization:', dashboardState?.organization);
  }, [dashboardState]);

  const navItems = [
    { path: '/dashboard', icon: CampaignIcon, label: 'Campaign' },
    { path: '/dashboard/content', icon: ContentIcon, label: 'Content' },
    { path: '/dashboard/audience', icon: AudienceIcon, label: 'Audience' },
    { path: '/dashboard/integrations', icon: IntegrationsIcon, label: 'Integrations' },
  ];

  const handleNavigation = (path) => {
    if (path !== currentPath) {
      navigate(path);
    }
  };

  const isSelected = (path) => {
    if (path === '/dashboard') {
      return currentPath === path || currentPath === '/dashboard/';
    }
    return currentPath === path;
  };

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
      <Box 
        sx={{ 
          p: 3, 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
        onClick={() => handleNavigation('/dashboard')}
      >
        <Box
          component="img"
          src="/fig.png"
          alt="FigSprout Logo"
          sx={{
            width: 42,
            height: 42,
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            lineHeight: 1.1,
            paddingTop: '13px',
          }}
        >
          FigSprout
        </Typography>
      </Box>

      {/* Organization Name */}
      {organizationName ? (
        <Box sx={{ 
          px: 3,
          py: 2,
          mx: 2,
          mb: 2,
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '4px'
            }}
          >
            Organization
          </Typography>
          <Typography
            sx={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: '1.5'
            }}
          >
            {organizationName}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ px: 2, mb: 3 }}>
          <WorkspaceSelector />
        </Box>
      )}

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Navigation Items */}
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const selected = isSelected(item.path);
          
          return (
            <ListItem 
              button 
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: '8px',
                backgroundColor: selected ? 'rgba(148, 100, 232, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: selected 
                    ? 'rgba(148, 100, 232, 0.12)' 
                    : 'rgba(148, 100, 232, 0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon>
                <Icon sx={{ 
                  color: selected ? '#9464e8' : 'rgba(255, 255, 255, 0.7)',
                  transition: 'color 0.2s ease',
                }} />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                sx={{
                  '& .MuiListItemText-primary': {
                    color: selected ? '#9464e8' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: selected ? 600 : 400,
                    transition: 'all 0.2s ease',
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