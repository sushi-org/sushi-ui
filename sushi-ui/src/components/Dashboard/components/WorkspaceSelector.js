import React, { useState } from 'react';
import { 
  Select, 
  MenuItem, 
  Typography, 
  Box 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const WorkspaceSelector = () => {
  const [workspace, setWorkspace] = useState('');
  
  // Mock user data - replace with actual user data
  const user = {
    workspaces: []
  };

  return (
    <Select
      value={workspace}
      onChange={(e) => setWorkspace(e.target.value)}
      displayEmpty
      fullWidth
      sx={{
        color: 'white',
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '.MuiSvgIcon-root': {
          color: 'white',
        }
      }}
    >
      <MenuItem value="">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddIcon />
          <Typography>Add Workspace</Typography>
        </Box>
      </MenuItem>
      {user.workspaces.map((ws) => (
        <MenuItem key={ws.id} value={ws.id}>
          {ws.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default WorkspaceSelector; 