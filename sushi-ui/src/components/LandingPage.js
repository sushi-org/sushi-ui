// src/components/LandingPage.js
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Container, 
  Button, 
  Box, 
  Grid,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
} from '@mui/material';
import { 
  Analytics, 
  AutoAwesome, 
  ConnectWithoutContact, 
  Campaign,
  Menu as MenuIcon
} from '@mui/icons-material';
import LoginButton from './LoginButton';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ErrorDialog from './common/ErrorDialog';
import { useAppDispatch } from '../store/hooks';
import { useSelector } from 'react-redux';
import { checkAuthStatus, getDashboardData } from '../services/api';
import { setUser } from '../store/slices/userSlice';
import { setDashboardData } from '../store/slices/dashboardSlice';

// Define theme colors
const theme = {
  primaryColor: '#9464e8',    // Updated primary color
  secondaryColor: '#FFFFFF',   // White
  backgroundColor: '#F5F5F5',  // Light gray
};

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { login, error, clearError } = useGoogleAuth();
  const user = useSelector((state) => state.user.user);

  // Remove the useEffect that checks auth on load
  
  // Only check auth if user is already in Redux state
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Only declare state variables that are used
  const [productAnchor, setProductAnchor] = useState(null);
  const [resourcesAnchor, setResourcesAnchor] = useState(null);

  // Add new state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Menu items
  const productItems = [
    'Campaign Intelligence',
    'Integrations',
    'Creative Generator',
    'Performance Tracking'
  ];

  const resourceItems = [
    'Why FigSprout?',
    'About Us',
    'Blogs'
  ];

  const handleGetStarted = async () => {
    try {
      console.log('Starting get started process...');
      
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
      console.error('Get started failed:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.backgroundColor,
        color: theme.primaryColor,
      }}
    >
      {/* Navigation Header */}
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            pl: { xs: 1, md: 4 },
            pr: { xs: 1, md: 4 },
          }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,  // Reduced gap from 2 to 1
              }}
            >
              <Box
                component="img"
                src="/fig.png"
                alt="FigSprout Logo"
                sx={{
                  width: 42,  // Slightly increased from 40
                  height: 42,  // Slightly increased from 40
                  objectFit: 'contain',
                  display: 'block',  // Ensures proper rendering
                }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.primaryColor,
                  fontWeight: 'bold',
                  fontSize: '1.4rem',  // Slightly increased font size
                  lineHeight: 1,  // Tightened line height for better alignment
                  paddingTop: '2px',  // Fine-tuned vertical alignment
                }}
              >
                FigSprout
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              gap: 4,
              alignItems: 'center',
              height: '64px',
              mr: 6,
            }}>
              {/* Product Dropdown */}
              <Box
                onMouseEnter={(e) => setProductAnchor(e.currentTarget)}
                onMouseLeave={() => setProductAnchor(null)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  sx={{ 
                    color: 'text.primary',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': { color: theme.primaryColor },
                    '&::after': {
                      content: '""',
                      width: '0',
                      height: '0',
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: '4px solid currentColor',
                      marginLeft: '6px',
                      transition: 'transform 0.2s',
                      transform: Boolean(productAnchor) ? 'rotate(180deg)' : 'rotate(0)',
                    }
                  }}
                >
                  Product
                </Typography>
                <Menu
                  anchorEl={productAnchor}
                  open={Boolean(productAnchor)}
                  onClose={() => setProductAnchor(null)}
                  sx={{ 
                    '& .MuiPaper-root': {
                      marginTop: '0',
                      minWidth: 220,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      mt: 2,
                    },
                    '& .MuiList-root': {
                      padding: '8px 0',
                    }
                  }}
                  MenuListProps={{
                    onMouseEnter: () => setProductAnchor(productAnchor),
                    onMouseLeave: () => setProductAnchor(null),
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {productItems.map((item) => (
                    <MenuItem 
                      key={item}
                      onClick={() => setProductAnchor(null)}
                      sx={{ 
                        padding: '12px 24px',
                        fontSize: '0.95rem',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          color: theme.primaryColor,
                          backgroundColor: 'rgba(106, 27, 155, 0.04)',
                        }
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Resources Dropdown */}
              <Box
                onMouseEnter={(e) => setResourcesAnchor(e.currentTarget)}
                onMouseLeave={() => setResourcesAnchor(null)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  sx={{ 
                    color: 'text.primary',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    '&:hover': { color: theme.primaryColor }
                  }}
                >
                  Resources
                </Typography>
                <Menu
                  anchorEl={resourcesAnchor}
                  open={Boolean(resourcesAnchor)}
                  onClose={() => setResourcesAnchor(null)}
                  sx={{ 
                    '& .MuiPaper-root': {
                      marginTop: '8px',
                      minWidth: 200,
                    },
                  }}
                  MenuListProps={{
                    onMouseLeave: () => setResourcesAnchor(null),
                    sx: {
                      paddingY: 1,
                    }
                  }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {resourceItems.map((item) => (
                    <MenuItem 
                      key={item}
                      onClick={() => setResourcesAnchor(null)}
                      sx={{ 
                        padding: '8px 24px',
                        '&:hover': { color: theme.primaryColor }
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* Pricing */}
              <Box
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ 
                    color: 'text.primary',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    '&:hover': { color: theme.primaryColor }
                  }}
                >
                  Pricing
                </Typography>
              </Box>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ 
                display: { xs: 'flex', md: 'none' },
                mr: 2,
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Navigation Drawer */}
            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '280px',
                  background: 'white',
                  boxSizing: 'border-box',
                  p: 2,
                },
              }}
            >
              <Box sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6" sx={{ color: theme.primaryColor, fontWeight: 'bold' }}>
                  Menu
                </Typography>
              </Box>

              {/* Product Items */}
              <Box sx={{ p: 2 }}>
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                >
                  Product
                </Typography>
                {productItems.map((item) => (
                  <MenuItem 
                    key={item}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ 
                      py: 1,
                      px: 2,
                      '&:hover': { color: theme.primaryColor }
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Box>

              {/* Resources Items */}
              <Box sx={{ p: 2 }}>
                <Typography
                  sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                >
                  Resources
                </Typography>
                {resourceItems.map((item) => (
                  <MenuItem 
                    key={item}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ 
                      py: 1,
                      px: 2,
                      '&:hover': { color: theme.primaryColor }
                    }}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Box>

              {/* Pricing */}
              <MenuItem 
                onClick={() => setMobileMenuOpen(false)}
                sx={{ 
                  p: 2,
                  '&:hover': { color: theme.primaryColor }
                }}
              >
                Pricing
              </MenuItem>

              {/* Login Button in Mobile Menu */}
              <Box sx={{ p: 2 }}>
                <LoginButton fullWidth />
              </Box>
            </Drawer>

            {/* Desktop Login Button */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <LoginButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Add toolbar spacing to prevent content from hiding under fixed AppBar */}
      <Toolbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #9464e8 0%, #9C27B0 100%)',
          position: 'relative',
          height: '40vh',  // Increased from 30vh to 40vh
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
              maxWidth: '800px',
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,  // Increased gap from 2 to 3 for more spacing between elements
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '3rem' },  // Slightly increased font sizes
                lineHeight: 1.1,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              FigSprout
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.3,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
              }}
            >
              Sprout your marketing reach with a click
             
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.3,
                fontSize: { xs: '1rem', md: '1.2rem' },
                maxWidth: '800px',
              }}
            >
              AI-Powered Marketing Agent for SMB's to Improve Ad Spend ROI
            </Typography>
            <Button
              variant="contained"
              size="medium"
              onClick={handleGetStarted}
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
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      <ErrorDialog
        open={error.show}
        onClose={clearError}
        errorMessage={error.message}
      />

      {/* Key Features Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #FFF 0%, #F8F5FB 100%)',
          py: { xs: 2, md: 2.5 },  // Reduced padding
          position: 'relative',
          minHeight: '55vh',  // Adjusted to complement hero section
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              fontWeight: 800,
              mb: { xs: 2, md: 3 },  // Reduced margin
              fontSize: { xs: '1.8rem', md: '2.2rem' },  // Reduced font size
              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, #9C27B0 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Key Features
          </Typography>

          <Grid 
            container 
            spacing={3}  // Reduced spacing
            sx={{ 
              mt: 0,
              px: { md: 2 },
              justifyContent: 'center',
            }}
          >
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  p: 2.5,  // Reduced padding
                  height: '100%',
                  maxHeight: '240px',  // Adjusted height
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 10px 40px rgba(106, 27, 155, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(106, 27, 155, 0.12)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',  // Thicker top border
                    background: `linear-gradient(90deg, ${theme.primaryColor}, #9C27B0)`,
                    borderRadius: '16px 16px 0 0',
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    background: 'rgba(106, 27, 155, 0.08)',
                    borderRadius: '14px',
                    p: 1.5,  // Reduced padding
                    mb: 2,  // Reduced margin
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AutoAwesome 
                    sx={{ 
                      fontSize: '32px',  // Reduced icon size
                      color: theme.primaryColor,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.1rem',  // Reduced font size
                    mb: 1.5,  // Reduced margin
                    color: 'text.primary',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Marketing AI Agent
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '0.9rem',  // Reduced font size
                    color: 'text.secondary',
                    px: 1,
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Optimize budget allocation and audience targeting with our AI-powered tools.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 2: Connect and Manage Ads */}
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  p: 2.5,  // Reduced padding
                  height: '100%',
                  maxHeight: '240px',  // Adjusted height
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 10px 40px rgba(106, 27, 155, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(106, 27, 155, 0.12)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',  // Thicker top border
                    background: `linear-gradient(90deg, ${theme.primaryColor}, #9C27B0)`,
                    borderRadius: '16px 16px 0 0',
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    background: 'rgba(106, 27, 155, 0.08)',
                    borderRadius: '14px',
                    p: 1.5,  // Reduced padding
                    mb: 2,  // Reduced margin
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ConnectWithoutContact 
                    sx={{ 
                      fontSize: '32px', 
                      color: theme.primaryColor,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.1rem',  // Reduced font size
                    mb: 1.5,  // Reduced margin
                    color: 'text.primary',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Connect and Manage Ads
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '0.9rem',  // Reduced font size
                    color: 'text.secondary',
                    px: 1,
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Seamlessly connect and manage ad accounts across Facebook, Google, Instagram, LinkedIn, and X (Twitter).
                </Typography>
              </Box>
            </Grid>

            {/* Feature 3: Creative Generator */}
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  p: 2.5,  // Reduced padding
                  height: '100%',
                  maxHeight: '240px',  // Adjusted height
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 10px 40px rgba(106, 27, 155, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(106, 27, 155, 0.12)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',  // Thicker top border
                    background: `linear-gradient(90deg, ${theme.primaryColor}, #9C27B0)`,
                    borderRadius: '16px 16px 0 0',
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    background: 'rgba(106, 27, 155, 0.08)',
                    borderRadius: '14px',
                    p: 1.5,  // Reduced padding
                    mb: 2,  // Reduced margin
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Campaign 
                    sx={{ 
                      fontSize: '32px', 
                      color: theme.primaryColor,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.1rem',  // Reduced font size
                    mb: 1.5,  // Reduced margin
                    color: 'text.primary',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Creative Generator
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '0.9rem',  // Reduced font size
                    color: 'text.secondary',
                    px: 1,
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Generate high-performing ad creatives with AI-powered tools.
                </Typography>
              </Box>
            </Grid>

            {/* Feature 4: Analytics */}
            <Grid item xs={12} sm={6} lg={3}>
              <Box
                sx={{
                  p: 2.5,  // Reduced padding
                  height: '100%',
                  maxHeight: '240px',  // Adjusted height
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 10px 40px rgba(106, 27, 155, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(106, 27, 155, 0.12)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                    },
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',  // Thicker top border
                    background: `linear-gradient(90deg, ${theme.primaryColor}, #9C27B0)`,
                    borderRadius: '16px 16px 0 0',
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    background: 'rgba(106, 27, 155, 0.08)',
                    borderRadius: '14px',
                    p: 1.5,  // Reduced padding
                    mb: 2,  // Reduced margin
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Analytics 
                    sx={{ 
                      fontSize: '32px', 
                      color: theme.primaryColor,
                    }} 
                  />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '1.1rem',  // Reduced font size
                    mb: 1.5,  // Reduced margin
                    color: 'text.primary',
                    letterSpacing: '-0.3px',
                  }}
                >
                  Analytics
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontSize: '0.9rem',  // Reduced font size
                    color: 'text.secondary',
                    px: 1,
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Gain deep insights into your ad campaign performance.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How it Works Section */}
      <Box
        sx={{
          background: '#FFF',
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(106, 27, 155, 0.1) 50%, transparent 100%)',
          },
        }}
      >
        <Container>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              marginBottom: '40px',
              color: theme.primaryColor,
            }}
          >
            How Does FigSprout Work?
          </Typography>
          
          <Box
            component="img"
            src="/diagram.png"
            alt="FigSprout Workflow Diagram"
            sx={{
              width: '100%',
              maxWidth: '1200px',
              height: 'auto',
              margin: '0 auto',
              display: 'block',
              mb: 6,  // Add margin bottom for spacing
            }}
          />

          {/* Workflow Steps */}
          <Grid 
            container 
            spacing={4}  // Reduced from 6 to 4
            sx={{ 
              mt: 2,
              rowGap: { xs: 3, md: 6 },  // Reduced from xs: 4, md: 8
            }}
          >
            {[
              {
                number: '1',
                title: 'Campaign Setup',
                description: 'Input your overall campaigns objective (increase engagement, clicks, spend, etc), content repository, and global budget.'
              },
              {
                number: '2',
                title: 'AI-Powered Optimization',
                description: "FigSprout's Marketing AI will initially automate variations of Content, Audience, and Ad Spend. Then it will create and manage the Ad Campaigns in different Ad Platforms."
              },
              {
                number: '3',
                title: 'Performance Tracking',
                description: 'FigSprout will automate aggregate campaign metrics and results for easy viewing.'
              },
              {
                number: '4',
                title: 'Continuous Improvement',
                description: 'Finally, the metrics will be fed back into the Marketing AI to further optimize the campaign to help reach your defined objective.'
              }
            ].map((step, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                key={index}
                sx={{
                  mb: { xs: 2, md: 3 }  // Reduced from xs: 3, md: 4
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3,
                    backgroundColor: 'rgba(106, 27, 155, 0.03)',
                    borderRadius: 2,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: theme.primaryColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {step.number}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 'bold',
                        color: theme.primaryColor,
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Who Is FigSprout For? Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #FFF 0%, #F8F5FB 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(106, 27, 155, 0.1) 50%, transparent 100%)',
          },
        }}
      >
        <Container>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              marginBottom: '40px',
              color: theme.primaryColor,
            }}
          >
            Who Is FigSprout For?
          </Typography>
          
          <Box
            component="img"
            src="/who_is_it_for.png"
            alt="FigSprout Target Audiences"
            sx={{
              width: '100%',
              maxWidth: '1200px',
              height: 'auto',
              margin: '0 auto',
              display: 'block',
              mb: 6,  // Add margin bottom for spacing
            }}
          />

          {/* Target Audience Grid */}
          <Grid 
            container 
            spacing={4}
            sx={{ 
              mt: 2,
              justifyContent: 'center',
            }}
          >
            {[
              {
                title: 'E-Commerce Sellers',
                description: 'Increase Sales with Shopify Integration',
                icon: '🛍️',
              },
              {
                title: 'Product Pages',
                description: 'Increase Sign Ups or Lead Generation',
                icon: '📱',
              },
              {
                title: 'Hospitality',
                description: 'Increase hotel or travel bookings',
                icon: '🏨',
              },
              {
                title: 'Restaurant',
                description: 'Increase Reservations or Food Orders',
                icon: '🍽️',
              },
            ].map((audience, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(106, 27, 155, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(106, 27, 155, 0.1)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      mb: 2,
                      fontSize: '3rem',
                    }}
                  >
                    {audience.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: theme.primaryColor,
                    }}
                  >
                    {audience.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {audience.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How FigSprout Helps Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #F8F5FB 0%, #FFF 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            align="center" 
            sx={{ 
              fontWeight: 800,
              mb: { xs: 6, md: 10 },
              fontSize: { xs: '2rem', md: '2.5rem' },
              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, #9C27B0 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How Does FigSprout Help?
          </Typography>

          <Grid 
            container 
            spacing={4}
            sx={{ 
              px: { md: 4 },
              rowGap: 8,
            }}
          >
            {[
              {
                title: 'Precise Targeting',
                subtitle: 'No more broad audience targeting',
                description: 'Deliver the most relevant campaigns to each individual customer through AI-powered audience segmentation and optimization.',
                icon: '🎯',
              },
              {
                title: 'Automated AI Testing',
                subtitle: 'No more manual variation setup',
                description: 'Easily experiment with different campaign variations while our AI automatically identifies and scales the best performing combinations.',
                icon: '🤖',
              },
              {
                title: 'Tailored Messaging',
                subtitle: 'No more generic content',
                description: 'Let our AI generate creative content that aligns with your brand voice and resonates with your target audience.',
                icon: '✨',
              },
              {
                title: 'Seamless Ad Management',
                subtitle: 'No more platform juggling',
                description: 'Manage all your ad campaigns and track performance across platforms in one unified, intuitive dashboard.',
                icon: '📊',
              },
            ].map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 3,
                    p: 4,  // Reduced padding from 5 to 4
                    height: '100%',
                    maxWidth: '500px',  // Added max-width to make boxes smaller
                    margin: '0 auto',  // Center the box
                    boxShadow: '0 4px 20px rgba(106, 27, 155, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(106, 27, 155, 0.1)',
                    },
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      mb: 3,  // Reduced margin from 4 to 3
                      fontSize: '2.2rem',  // Reduced icon size from 2.5rem
                    }}
                  >
                    {benefit.icon}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: theme.primaryColor,
                      fontSize: '1.3rem',  // Slightly smaller title
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '1rem',  // Slightly smaller subtitle
                    }}
                  >
                    {benefit.subtitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',  // Slightly smaller description
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.primaryColor,
          color: theme.secondaryColor,
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          © 2025 FigSprout. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;