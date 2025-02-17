import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Radio,
  Stack
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay'; // for TikTok
import RedditIcon from '@mui/icons-material/Reddit';
import { CheckCircle } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const steps = ['Select destination', 'Connect destination', 'Finalize destination'];

const destinations = [
  { id: 'google', name: 'Google Ads', icon: GoogleIcon },
  { id: 'linkedin', name: 'LinkedIn Ads', icon: LinkedInIcon },
  { id: 'facebook', name: 'Facebook Ads', icon: FacebookIcon },
  { id: 'instagram', name: 'Instagram Ads', icon: InstagramIcon },
  { id: 'twitter', name: 'X (Twitter) Ads', icon: XIcon },
  { id: 'tiktok', name: 'TikTok Ads', icon: SmartDisplayIcon },
  { id: 'reddit', name: 'Reddit Ads', icon: RedditIcon },
];

const CreateDestinationModal = ({ open, onClose, initialPlatform, initialStep = 0 }) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [selectedDestination, setSelectedDestination] = useState(initialPlatform);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(initialPlatform ? true : false);

  // Add this useEffect to update states when props change
  useEffect(() => {
    if (initialPlatform) {
      setSelectedDestination(initialPlatform);
      setActiveStep(initialStep);
      setIsAuthenticated(true);
    }
  }, [initialPlatform, initialStep]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDestinationSelect = (destinationId) => {
    setSelectedDestination(destinationId);
  };

  // Define connect handlers for each platform
  const handleFacebookConnect = () => {
    window.location.href = 'YOUR_FACEBOOK_OAUTH_URL';
  };

  const handleInstagramConnect = () => {
    window.location.href = 'YOUR_INSTAGRAM_OAUTH_URL';
  };

  const handleLinkedInConnect = () => {
    window.location.href = 'YOUR_LINKEDIN_OAUTH_URL';
  };

  const handleGoogleConnect = () => {
    window.location.href = 'YOUR_GOOGLE_OAUTH_URL';
  };

  const handleTwitterConnect = () => {
    window.location.href = 'YOUR_TWITTER_OAUTH_URL';
  };

  const handleTikTokConnect = () => {
    window.location.href = 'YOUR_TIKTOK_OAUTH_URL';
  };

  const handleRedditConnect = () => {
    window.location.href = 'YOUR_REDDIT_OAUTH_URL';
  };

  // Platform configuration object
  const platformConfig = {
    facebook: {
      handler: handleFacebookConnect,
      buttonColor: '#1877F2',
      hoverColor: '#0C63D4',
      icon: FacebookIcon,
      buttonText: 'Log in with Facebook'
    },
    instagram: {
      handler: handleInstagramConnect,
      buttonColor: '#E4405F',
      hoverColor: '#D32D4A',
      icon: InstagramIcon,
      buttonText: 'Log in with Instagram'
    },
    linkedin: {
      handler: handleLinkedInConnect,
      buttonColor: '#0A66C2',
      hoverColor: '#004182',
      icon: LinkedInIcon,
      buttonText: 'Log in with LinkedIn'
    },
    google: {
      handler: handleGoogleConnect,
      buttonColor: '#DB4437',
      hoverColor: '#C22E21',
      icon: GoogleIcon,
      buttonText: 'Log in with Google'
    },
    twitter: {
      handler: handleTwitterConnect,
      buttonColor: '#1DA1F2',
      hoverColor: '#0C85D0',
      icon: XIcon,
      buttonText: 'Log in with X (Twitter)'
    },
    tiktok: {
      handler: handleTikTokConnect,
      buttonColor: '#000000',
      hoverColor: '#1A1A1A',
      icon: SmartDisplayIcon,
      buttonText: 'Log in with TikTok'
    },
    reddit: {
      handler: handleRedditConnect,
      buttonColor: '#FF4500',
      hoverColor: '#E03D00',
      icon: RedditIcon,
      buttonText: 'Log in with Reddit'
    }
  };

  const handleFacebookAuth = () => {
    setIsAuthenticating(true);
    // Add callback URL to return to our app
    const callbackUrl = `${window.location.origin}/dashboard/integrations?platform=facebook&status=success`;
    const encodedCallback = encodeURIComponent(callbackUrl);
    window.location.href = `http://localhost:8000/api/v1/destination/oauth/fb?callback_url=${encodedCallback}`;
  };

  const SelectDestinationStep = () => (
    <Box sx={{ height: '400px', overflow: 'auto', px: 2 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Select an advertising platform to connect with FigSprout
      </Typography>
      <Stack spacing={2}>
        {destinations.map((destination) => {
          const Icon = destination.icon;
          return (
            <Paper
              key={destination.id}
              elevation={0}
              sx={{
                p: 2.5,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: selectedDestination === destination.id ? '#9464e8' : '#E0E0E0',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#9464e8',
                  backgroundColor: 'rgba(148, 100, 232, 0.04)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }
              }}
              onClick={() => handleDestinationSelect(destination.id)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Radio
                  checked={selectedDestination === destination.id}
                  sx={{
                    color: '#9464e8',
                    '&.Mui-checked': {
                      color: '#9464e8',
                    },
                  }}
                />
                <Icon sx={{ 
                  mx: 2, 
                  color: selectedDestination === destination.id ? '#9464e8' : '#1A1A1A',
                  transition: 'color 0.2s ease'
                }} />
                <Box>
                  <Typography 
                    sx={{ 
                      fontWeight: selectedDestination === destination.id ? 600 : 400,
                      color: selectedDestination === destination.id ? '#9464e8' : '#1A1A1A'
                    }}
                  >
                    {destination.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connect your {destination.name} account
                  </Typography>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );

  const ConnectDestinationStep = () => {
    const selectedPlatform = destinations.find(d => d.id === selectedDestination);
    const platformSettings = platformConfig[selectedDestination];

    if (!platformSettings) return null;

    const PlatformIcon = platformSettings.icon;

    const renderStepTwo = () => {
      if (selectedPlatform.id === 'facebook') {
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CheckCircle 
                  sx={{ 
                    fontSize: 60, 
                    color: 'success.main',
                    animation: 'fadeIn 0.5s ease-in'
                  }} 
                />
                <Typography>
                  FigSprout has successfully integrated with Facebook Account
                </Typography>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={handleFacebookAuth}
                disabled={isAuthenticating}
                startIcon={isAuthenticating ? <CircularProgress size={20} /> : <FacebookIcon />}
                sx={{
                  backgroundColor: '#1877F2',
                  '&:hover': {
                    backgroundColor: '#0C63D4',
                  }
                }}
              >
                {isAuthenticating ? 'Redirecting...' : 'Connect with Facebook'}
              </Button>
            )}
          </Box>
        );
      }
      return (
        <Box sx={{ 
          height: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{ maxWidth: '480px', textAlign: 'center' }}>
            <PlatformIcon sx={{ fontSize: 48, color: platformSettings.buttonColor, mb: 3 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#1A1A1A', fontWeight: 600 }}>
              Connect to {selectedPlatform?.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              FigSprout requires limited access to your account.
              Your credentials will be encrypted, and authorization can be revoked at any time.
            </Typography>
            <Button
              variant="contained"
              onClick={platformSettings.handler}
              startIcon={<PlatformIcon />}
              sx={{
                backgroundColor: platformSettings.buttonColor,
                '&:hover': {
                  backgroundColor: platformSettings.hoverColor,
                },
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
            >
              {platformSettings.buttonText}
            </Button>
          </Box>
        </Box>
      );
    };

    return renderStepTwo();
  };

  const FinalizeDestinationStep = () => (
    <Box sx={{ 
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{ maxWidth: '480px', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#1A1A1A' }}>
          Finalize your destination settings
        </Typography>
        {/* Add finalization settings here */}
      </Box>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectDestinationStep />;
      case 1:
        return <ConnectDestinationStep />;
      case 2:
        return <FinalizeDestinationStep />;
      default:
        return 'Unknown step';
    }
  };

  const style = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="create-destination-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            borderRadius: '16px',
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            height: '650px',
          }}
        >
          {/* Header */}
          <Box sx={{ 
            p: 4, 
            borderBottom: '1px solid #E0E0E0',
            backgroundColor: '#FAFAFA',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px'
          }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1A1A1A' }}>
              Create New Destination
            </Typography>
            <Stepper 
              activeStep={activeStep} 
              sx={{ 
                '& .MuiStepIcon-root.Mui-active': {
                  color: '#9464e8',
                },
                '& .MuiStepIcon-root.Mui-completed': {
                  color: '#9464e8',
                },
                '& .MuiStepLabel-label': {
                  fontSize: '0.875rem'
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: '#9464e8',
                  fontWeight: 600
                }
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Content */}
          <Box sx={{ 
            p: 4, 
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {getStepContent(activeStep)}
          </Box>

          {/* Footer */}
          <Box sx={{ 
            p: 4, 
            borderTop: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px'
          }}>
            <Button 
              onClick={onClose}
              sx={{ 
                color: '#1A1A1A',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Cancel
            </Button>
            <Box>
              {activeStep !== 0 && (
                <Button 
                  onClick={handleBack} 
                  sx={{ 
                    mr: 2,
                    color: '#1A1A1A',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedDestination && activeStep === 0}
                sx={{
                  backgroundColor: '#9464e8',
                  '&:hover': {
                    backgroundColor: '#7747e1',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#E0E0E0',
                  },
                  px: 4,
                  py: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateDestinationModal; 