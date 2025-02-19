import { createSlice } from '@reduxjs/toolkit';

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

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer; 