// src/components/LoginButton.js
import React from 'react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import useGoogleAuth from '../hooks/useGoogleAuth';

const LoginButton = () => {
  const login = useGoogleAuth();

  const handleLogin = () => {
    try {
      login();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
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
  );
};

export default LoginButton;