import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// Mock data for the table
const campaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    objective: 'Conversions',
    platforms: ['facebook', 'instagram', 'linkedin'],
    createdBy: 'John Doe',
    createdAt: '2024-02-20',
    updatedAt: '2024-02-21',
    status: 'Active',
  },
  // Add more campaign data as needed
];

// Platform icon mapping
const platformIcons = {
  facebook: <FacebookIcon sx={{ color: '#1877F2' }} />,
  instagram: <InstagramIcon sx={{ color: '#E4405F' }} />,
  twitter: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
  linkedin: <LinkedInIcon sx={{ color: '#0A66C2' }} />,
  tiktok: (
    <Box
      component="img"
      src="/tiktok-icon.png" // You'll need to add this icon to your public folder
      alt="TikTok"
      sx={{ width: 24, height: 24 }}
    />
  ),
};

const Campaign = () => {
  const handleCreateCampaign = () => {
    // Add campaign creation logic
    console.log('Create campaign clicked');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Create Button */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ color: '#6A1B9B' }}>
          Campaign Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCampaign}
          sx={{
            backgroundColor: '#6A1B9B',
            '&:hover': {
              backgroundColor: '#5A1690',
            },
            borderRadius: '8px',
            textTransform: 'none',
            px: 3,
          }}
        >
          Create Campaign
        </Button>
      </Box>
      
      {/* Active Campaigns Table */}
      <Paper 
        elevation={0}
        sx={{ 
          borderRadius: 2,
          border: '1px solid rgba(106, 27, 155, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Updated Title Section */}
        <Box 
          sx={{ 
            p: 3, 
            borderBottom: '1px solid rgba(106, 27, 155, 0.1)',
            backgroundColor: 'rgba(106, 27, 155, 0.02)',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#6A1B9B',
              fontSize: '1.1rem',
            }}
          >
            Active Campaigns
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(106, 27, 155, 0.02)' }}>
                <TableCell>Campaign</TableCell>
                <TableCell>Objective</TableCell>
                <TableCell align="center">Ad Platforms</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow 
                  key={campaign.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: 'rgba(106, 27, 155, 0.02)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {campaign.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{campaign.objective}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <AvatarGroup 
                        max={4}
                        sx={{
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            fontSize: '0.875rem',
                            backgroundColor: 'white',
                            border: '1px solid rgba(106, 27, 155, 0.1)',
                          },
                          justifyContent: 'center',
                        }}
                      >
                        {campaign.platforms.map((platform) => (
                          <Avatar 
                            key={platform}
                            sx={{
                              '& .MuiSvgIcon-root': {
                                width: 20,
                                height: 20,
                              }
                            }}
                          >
                            {platformIcons[platform]}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </Box>
                  </TableCell>
                  <TableCell>{campaign.createdBy}</TableCell>
                  <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(campaign.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={campaign.status}
                      size="small"
                      sx={{
                        backgroundColor: campaign.status === 'Active' 
                          ? 'rgba(46, 204, 113, 0.1)' 
                          : 'rgba(255, 159, 67, 0.1)',
                        color: campaign.status === 'Active' 
                          ? '#2ecc71' 
                          : '#ff9f43',
                        fontWeight: 600,
                        borderRadius: '6px',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Campaign; 