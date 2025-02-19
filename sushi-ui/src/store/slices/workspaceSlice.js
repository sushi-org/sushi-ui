import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setWorkspaces, setCurrentWorkspace, setLoading, setError } = workspaceSlice.actions;
export default workspaceSlice.reducer; 