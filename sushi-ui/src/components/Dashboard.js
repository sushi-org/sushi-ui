import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Select,
  Toolbar,
  AppBar,
  Divider
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Article as ContentIcon,
  People as AudienceIcon,
  Extension as IntegrationsIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  ContactSupport as SupportIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  WorkspacesOutlined as WorkspaceIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [workspace, setWorkspace] = useState('');
  const primaryColor = '#6A1B9B';

  // Mock user data - replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    workspaces: []
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('googleToken');
    navigate('/');
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Left Sidebar */}
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
          <Select
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '.MuiSvgIcon-root': {
                color: 'white',
              }
            }}
          >
            <MenuItem value="">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon />
                <Typography>Add Workspace</Typography>
              </Box>
            </MenuItem>
            {user.workspaces.map((ws) => (
              <MenuItem key={ws.id} value={ws.id}>
                {ws.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Navigation Items */}
        <List>
          <ListItem button>
            <ListItemIcon>
              <CampaignIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Campaign" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContentIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Content" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AudienceIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Audience" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IntegrationsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Top Bar */}
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <IconButton onClick={handleProfileClick}>
              <Avatar 
                sx={{ 
                  bgcolor: primaryColor,
                  width: 40,
                  height: 40,
                  fontSize: '1.1rem',
                  fontWeight: 500
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  width: 200,
                  marginTop: '8px',
                }
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ProfileIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <SupportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Contact Support</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ color: primaryColor, mb: 3 }}>
            Dashboard
          </Typography>
          {/* Add your dashboard content here */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;