import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, getDashboardData } from '../services/api';
import useApiError from './useApiError';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/userSlice';
import { setDashboardData } from '../store/slices/dashboardSlice';

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { error, handleError, clearError } = useApiError();
  const dispatch = useAppDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google login success, received token");
        
        if (!tokenResponse || !tokenResponse.access_token) {
          throw new Error('No access token received from Google');
        }
        
        const response = await loginWithGoogle(tokenResponse.access_token);
        
        if (response) {
          console.log("Successfully logged in, setting user data");
          dispatch(setUser(response));
          
          // Wait a brief moment to ensure cookie is set
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Then fetch dashboard data
          try {
            console.log("Fetching dashboard data after login");
            const dashboardData = await getDashboardData();
            if (dashboardData?.organization) {
              dispatch(setDashboardData(dashboardData));
              console.log("Dashboard data set, navigating to dashboard");
            } else {
              console.warn("Dashboard data missing organization info");
            }
            navigate('/dashboard');
          } catch (error) {
            console.error('Failed to fetch dashboard data after login:', error);
            // Still navigate to dashboard even if data fetch fails
            console.log("Navigating to dashboard despite data fetch error");
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.log("Handling error in useGoogleAuth:", error);
        handleError(error);
      }
    },
    onError: (error) => {
      console.log("Google OAuth error:", error);
      handleError(error);
    },
    flow: 'implicit',
    scope: 'email profile',
  });

  return { 
    login: () => {
      try {
        console.log("Initiating Google login flow");
        return login();
      } catch (error) {
        console.error("Error starting Google login:", error);
        handleError(error);
        throw error;
      }
    },
    error,
    clearError
  };
};

export default useGoogleAuth; 