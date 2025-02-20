// src/components/LoginButton.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import useGoogleAuth from '../hooks/useGoogleAuth';
import ErrorDialog from './common/ErrorDialog';
import { loginWithGoogle, getDashboardData, checkAuthStatus } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDashboardData } from '../store/slices/dashboardSlice';
import { setUser } from '../store/slices/userSlice';

const LoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useGoogleAuth();
  const [error, setError] = useState({ show: false, message: '' });

  const handleLogin = async () => {
    try {
      console.log('Starting login process...');
      
      // 1. Check auth status first
      try {
        const userData = await checkAuthStatus();
        console.log('Auth check successful, user is authenticated');
        
        // 2. If authenticated, set user and fetch dashboard data
        dispatch(setUser(userData));
        const dashboardData = await getDashboardData();
        if (dashboardData?.organization) {
          dispatch(setDashboardData(dashboardData));
        }
        navigate('/dashboard');
        return;
      } catch (error) {
        // 3. If not authenticated (401), show Google login
        if (error.message === 'Not authenticated') {
          console.log('User not authenticated, showing Google login');
          await login();
        } else {
          throw error;
        }
      }
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
          backgroundColor: '#9464e8',
          color: 'white',
          px: 4,
          py: 1,
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '50px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: '#7747d1',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
          },
          transition: 'all 0.3s ease',
          textTransform: 'none',
          letterSpacing: '0.3px',
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