import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import workspaceReducer from './slices/workspaceSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    workspace: workspaceReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Add this for debugging
store.subscribe(() => {
  console.log('Store updated:', store.getState());
}); 