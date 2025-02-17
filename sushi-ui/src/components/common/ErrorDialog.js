import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorDialog = ({ open, onClose, errorMessage }) => {
  const handleContactSupport = () => {
    // You can replace this with your support email or link
    window.location.href = 'mailto:support@figsprout.com';
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '16px',
          minWidth: '320px',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        color: '#d32f2f'
      }}>
        <ErrorOutlineIcon />
        Error
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary">
          {errorMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 1, padding: 2 }}>
        <Button 
          onClick={handleContactSupport}
          variant="contained" 
          fullWidth
          sx={{
            backgroundColor: '#9464e8',
            '&:hover': {
              backgroundColor: '#7747d1',
            },
          }}
        >
          Contact Support
        </Button>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          fullWidth
          sx={{
            borderColor: '#9464e8',
            color: '#9464e8',
            '&:hover': {
              borderColor: '#7747d1',
              color: '#7747d1',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog; 