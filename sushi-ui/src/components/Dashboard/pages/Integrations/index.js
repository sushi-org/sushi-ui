import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Integrations = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ color: '#6A1B9B', mb: 3 }}>
        Integrations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(106, 27, 155, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Connected Platforms</Typography>
            {/* Add integration management features */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Integrations; 