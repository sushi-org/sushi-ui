import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDashboardData as apiGetDashboardData } from '../../services/api';

const initialState = {
  campaigns: [],
  organization: { name: '', organization_id: null }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      console.log('Setting dashboard data:', action.payload);
      state.campaigns = action.payload.campaigns || [];
      state.organization = action.payload.organization || { name: '', organization_id: null };
    }
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