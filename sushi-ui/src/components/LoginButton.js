// src/components/LoginButton.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import useGoogleAuth from '../hooks/useGoogleAuth';
import ErrorDialog from './common/ErrorDialog';
import { loginWithGoogle, getDashboardData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDashboardData } from '../store/slices/dashboardSlice';
import { useSelector } from 'react-redux';
import { store } from '../store/store';

const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useGoogleAuth();
  const [error, setError] = useState({ show: false, message: '' });

  const handleLogin = async () => {
    try {
      console.log('Starting login process...');
      const { accessToken } = await login();
      
      console.log('Got access token, calling loginWithGoogle...');
      const loginResponse = await loginWithGoogle(accessToken);
      console.log('Login response:', loginResponse);
      
      console.log('Fetching dashboard data...');
      const dashboardData = await getDashboardData();
      console.log('Dashboard data received:', dashboardData);
      
      if (dashboardData && dashboardData.organization) {
        console.log('Dispatching to Redux:', dashboardData);
        await dispatch(setDashboardData(dashboardData));
      }

      // Add a small delay to ensure state is updated
      setTimeout(() => {
        navigate('/dashboard');
      }, 100);
    } catch (error) {
      console.error('Login failed:', error);
      setError({
        show: true,
        message: error.message || 'Failed to login. Please try again.'
      });
    }
  };

  const clearError = () => {
    setError({ show: false, message: '' });
  };

  return (
    <>
      <Button 
        variant="contained" 
        onClick={handleLogin}
        startIcon={<LoginIcon />}
        sx={{
          backgroundColor: 'white',
          color: '#6A1B9B',
          minWidth: '120px',
          height: '42px',
          borderRadius: '50px',
          boxShadow: '0 4px 12px rgba(106, 27, 155, 0.15)',
          '&:hover': {
            backgroundColor: 'white',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(106, 27, 155, 0.25)',
          },
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          letterSpacing: '0.3px',
          padding: '8px 24px',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(106, 27, 155, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          '& .MuiButton-startIcon': {
            margin: 0,
          },
        }}
      >
        Login
      </Button>

      <ErrorDialog
        open={error.show}
        onClose={clearError}
        errorMessage={error.message}
      />
    </>
  );
};

export default LoginButton;