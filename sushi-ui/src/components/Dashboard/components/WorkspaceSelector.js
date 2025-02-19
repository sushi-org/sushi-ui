import React from 'react';
import { 
  Select, 
  MenuItem, 
  Typography, 
  Box 
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setCurrentWorkspace } from '../../../store/slices/workspaceSlice';

const WorkspaceSelector = () => {
  const dispatch = useAppDispatch();
  const { currentWorkspace, workspaces } = useAppSelector(state => state.workspace);
  
  const handleWorkspaceChange = (event) => {
    dispatch(setCurrentWorkspace(event.target.value));
  };

  return (
    <Select
      value={currentWorkspace || ''}
      onChange={handleWorkspaceChange}
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
          <Typography>Add Organization</Typography>
        </Box>
      </MenuItem>
      {workspaces.map((ws) => (
        <MenuItem key={ws.id} value={ws.id}>
          {ws.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default WorkspaceSelector; 