import { createSlice } from '@reduxjs/toolkit';
import { clearDashboardData } from './dashboardSlice';

const initialState = {
  memberId: null,
  email: null,
  firstName: null,
  lastName: null,
  memberType: null,
  organizationId: null,
  organizationName: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.memberId = action.payload.member_id;
      state.email = action.payload.email;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.memberType = action.payload.member_type;
      state.organizationId = action.payload.organization_id;
      state.organizationName = action.payload.organization_name;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.memberId = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.memberType = null;
      state.organizationId = null;
      state.organizationName = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;

export const logout = () => (dispatch) => {
  dispatch(clearUser());
  dispatch(clearDashboardData());
};

export default userSlice.reducer; 