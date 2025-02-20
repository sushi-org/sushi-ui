import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Person as ProfileIcon,
  Settings as SettingsIcon,
  ContactSupport as SupportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { clearUser } from '../../../store/slices/userSlice';

const TopBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const primaryColor = '#6A1B9B';
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('googleToken');
    dispatch(clearUser());
    navigate('/');
  };

  return (
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
            {user?.first_name ? user.first_name[0].toUpperCase() : '?'}
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
  );
};

export default TopBar; 