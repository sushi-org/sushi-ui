import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import CreateDestinationModal from './CreateDestinationModal';

// Sample data - you can replace this with actual data from your backend
const destinations = [
  {
    id: 1,
    adPlatform: 'Facebook Ads',
    adAccount: 'Business Account 1',
    lastSync: '2024-03-20 14:30:00'
  },
  {
    id: 2,
    adPlatform: 'Google Ads',
    adAccount: 'Marketing Account',
    lastSync: '2024-03-20 13:15:00'
  }
];

const Integrations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSync = (id) => {
    // Add sync logic here
    console.log('Syncing destination:', id);
  };

  const handleCreateDestination = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Destinations Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#9464e8' }}>
            Destinations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateDestination}
            sx={{
              backgroundColor: '#9464e8',
              '&:hover': {
                backgroundColor: '#7747e1',
              },
              borderRadius: '8px',
              textTransform: 'none',
              px: 3
            }}
          >
            Create Destination
          </Button>
        </Box>

        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 'none',
            border: '1px solid #E0E0E0',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    backgroundColor: '#F8F9FA',
                    fontWeight: 600,
                    color: '#9464e8',
                    borderBottom: '2px solid #E0E0E0',
                    py: 2
                  }}
                >
                  Ad Platform
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: '#F8F9FA',
                    fontWeight: 600,
                    color: '#9464e8',
                    borderBottom: '2px solid #E0E0E0',
                    py: 2
                  }}
                >
                  Ad Account
                </TableCell>
                <TableCell 
                  sx={{ 
                    backgroundColor: '#F8F9FA',
                    fontWeight: 600,
                    color: '#9464e8',
                    borderBottom: '2px solid #E0E0E0',
                    py: 2
                  }}
                >
                  Last Sync
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{ 
                    backgroundColor: '#F8F9FA',
                    fontWeight: 600,
                    color: '#9464e8',
                    borderBottom: '2px solid #E0E0E0',
                    py: 2
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinations.map((row) => (
                <TableRow 
                  key={row.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#F8F9FA',
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.adPlatform}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2, color: '#616161' }}>{row.adAccount}</TableCell>
                  <TableCell sx={{ py: 2, color: '#616161' }}>{row.lastSync}</TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    <IconButton 
                      onClick={() => handleSync(row.id)}
                      sx={{
                        color: '#9464e8',
                        '&:hover': {
                          backgroundColor: 'rgba(148, 100, 232, 0.04)',
                        }
                      }}
                      size="small"
                    >
                      <RefreshIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Sources Section */}
      <Box>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: '#9464e8' }}>
          Sources
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Coming Soon
        </Typography>
      </Box>

      <CreateDestinationModal 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </Box>
  );
};

export default Integrations; 