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
        console.log("Google login success, token response:", tokenResponse);
        const response = await loginWithGoogle(tokenResponse.access_token);
        
        if (response) {
          dispatch(setUser(response));
          // Wait a brief moment to ensure cookie is set
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Then fetch dashboard data
          try {
            const dashboardData = await getDashboardData();
            if (dashboardData?.organization) {
              dispatch(setDashboardData(dashboardData));
            }
            setTimeout(() => navigate('/dashboard'), 0);
          } catch (error) {
            console.error('Failed to fetch dashboard data after login:', error);
            // Still navigate to dashboard even if data fetch fails
            setTimeout(() => navigate('/dashboard'), 0);
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
        return login();
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    error,
    clearError
  };
};

export default useGoogleAuth; 