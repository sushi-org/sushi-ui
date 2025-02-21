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
      
      try {
        const userData = await checkAuthStatus();
        console.log('Auth check successful, user is authenticated');
        
        // Set user data including organization info
        dispatch(setUser({
          member_id: userData.member_id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          member_type: userData.member_type,
          organization_id: userData.organization_id,
          organization_name: userData.organization_name
        }));

        const dashboardData = await getDashboardData();
        dispatch(setDashboardData(dashboardData));
        navigate('/dashboard');
        return;
      } catch (error) {
        // If not authenticated, handle Google login
        if (error.message === 'Not authenticated') {
          console.log('User not authenticated, showing Google login');
          const googleLoginData = await login();
          
          // After successful Google login, set the user data
          dispatch(setUser({
            member_id: googleLoginData.member_id,
            email: googleLoginData.email,
            first_name: googleLoginData.first_name,
            last_name: googleLoginData.last_name,
            member_type: googleLoginData.member_type,
            organization_id: googleLoginData.organization_id,
            organization_name: googleLoginData.organization_name
          }));

          const dashboardData = await getDashboardData();
          dispatch(setDashboardData(dashboardData));
          navigate('/dashboard');
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