import React from 'react';
import { useSelector } from 'react-redux';
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
  Tooltip,
  IconButton,
} from '@mui/material';
import { 
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CampaignIcon from '@mui/icons-material/Campaign';

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

// Mock recommendations data
const recommendations = [
  {
    id: 1,
    campaign: 'Summer Sale 2024',
    platform: 'facebook',
    insight: 'Increase budget allocation by 20% to capture evening audience',
    impact: 'High',
    status: 'New',
    type: 'Budget Optimization',
  },
  {
    id: 2,
    campaign: 'Summer Sale 2024',
    platform: 'instagram',
    insight: 'Target audience engagement peaks during weekends',
    impact: 'Medium',
    status: 'In Progress',
    type: 'Timing Optimization',
  },
  {
    id: 3,
    campaign: 'Summer Sale 2024',
    platform: 'linkedin',
    insight: 'Creative fatigue detected, consider refreshing ad content',
    impact: 'High',
    status: 'New',
    type: 'Creative Optimization',
  },
];

const Campaign = () => {
  const { campaigns } = useSelector(state => state.dashboard);

  const handleCreateCampaign = () => {
    // Add campaign creation logic
    console.log('Create campaign clicked');
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          text: '#EF4444',
          icon: <TrendingUpIcon fontSize="small" />
        };
      case 'medium':
        return {
          bg: 'rgba(245, 158, 11, 0.1)',
          text: '#F59E0B',
          icon: <WarningIcon fontSize="small" />
        };
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          text: '#10B981',
          icon: <CheckCircleIcon fontSize="small" />
        };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header with Create Button */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ 
          color: '#9464e8',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          Campaign
        </Typography>
        <Button 
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCampaign}
          sx={{
            backgroundColor: '#9464e8',  // Update button background
            '&:hover': {
              backgroundColor: '#8254d0',  // Slightly darker shade for hover
            }
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
              {!campaigns || campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      No campaigns found. Create your first campaign to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                campaigns.map((campaign, index) => (
                  <TableRow 
                    key={campaign.id || index}
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
                          {campaign.platforms?.map((platform) => (
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
                    <TableCell>{campaign.created_by}</TableCell>
                    <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(campaign.updated_at).toLocaleDateString()}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recommendations Section */}
      <Box sx={{ mt: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            border: '1px solid rgba(106, 27, 155, 0.1)',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              p: 3, 
              borderBottom: '1px solid rgba(106, 27, 155, 0.1)',
              backgroundColor: 'rgba(106, 27, 155, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
              AI Recommendations
            </Typography>
            <Tooltip title="AI-powered recommendations to optimize your campaigns">
              <IconButton size="small">
                <InfoIcon sx={{ color: 'rgba(106, 27, 155, 0.6)' }} />
              </IconButton>
            </Tooltip>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'rgba(106, 27, 155, 0.02)' }}>
                  <TableCell>Campaign</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell width="40%">Recommendation</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendations.map((rec) => {
                  const impactStyle = getImpactColor(rec.impact);
                  return (
                    <TableRow 
                      key={rec.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(106, 27, 155, 0.02)',
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {rec.campaign}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: 'white',
                            border: '1px solid rgba(106, 27, 155, 0.1)',
                          }}
                        >
                          {platformIcons[rec.platform]}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {rec.insight}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={impactStyle.icon}
                          label={rec.impact}
                          size="small"
                          sx={{
                            backgroundColor: impactStyle.bg,
                            color: impactStyle.text,
                            fontWeight: 600,
                            '& .MuiChip-icon': {
                              color: impactStyle.text,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {rec.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={rec.status}
                          size="small"
                          sx={{
                            backgroundColor: rec.status === 'New' 
                              ? 'rgba(16, 185, 129, 0.1)' 
                              : 'rgba(245, 158, 11, 0.1)',
                            color: rec.status === 'New' 
                              ? '#10B981' 
                              : '#F59E0B',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: '#6A1B9B',
                            color: '#6A1B9B',
                            '&:hover': {
                              borderColor: '#5A1690',
                              backgroundColor: 'rgba(106, 27, 155, 0.04)',
                            },
                          }}
                        >
                          Apply
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Campaign; 