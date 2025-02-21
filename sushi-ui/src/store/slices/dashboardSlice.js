import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData as apiGetDashboardData } from '../../services/api';

const initialState = {
  loading: false,
  error: null,
  campaigns: [],
  organization: null,
  lastFetched: null, // Add timestamp to track when data was last fetched
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      console.log('Setting dashboard data:', action.payload);
      state.campaigns = action.payload.campaigns || [];
      state.organization = action.payload.organization || null;
      state.lastFetched = Date.now();
      state.loading = false;
      state.error = null;
    },
    clearDashboardData: (state) => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.campaigns = action.payload.campaigns || [];
        state.organization = action.payload.organization || null;
        state.lastFetched = Date.now();
        state.loading = false;
        state.error = null;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const getDashboardData = createAsyncThunk(
  'dashboard/getDashboardData',
  async () => {
    const response = await apiGetDashboardData();
    return response;
  }
);

export const { setDashboardData, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer; 