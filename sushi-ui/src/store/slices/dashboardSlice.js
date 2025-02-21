import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData as apiGetDashboardData } from '../../services/api';

const initialState = {
  loading: false,
  error: null,
  campaigns: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      console.log('Setting dashboard data:', action.payload);
      state.campaigns = action.payload.campaigns || [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.campaigns = action.payload.campaigns || [];
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

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer; 